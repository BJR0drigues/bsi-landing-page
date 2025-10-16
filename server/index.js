// Importação dos módulos necessários
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Pool } = require('pg');
const config = require('./config');

// Inicialização do Express
const app = express();
const PORT = config.server.port || 3000;

// Middleware
app.use(cors());  // Permite requisições de origens diferentes
app.use(express.json());  // Parse de JSON no corpo da requisição
app.use(express.urlencoded({ extended: true }));  // Parse de dados de formulário

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../')));

// Configuração da conexão com PostgreSQL
const pool = new Pool(config.database);

// Função para executar queries no banco
const db = {
    query: async (text, params) => {
        console.log('Executando query:', { text, params });
        try {
            const start = Date.now();
            const result = await pool.query(text, params);
            const duration = Date.now() - start;
            console.log('Query executada em', duration, 'ms');
            return result.rows;
        } catch (error) {
            console.error('Erro ao executar query:', error);
            throw error;
        }
    }
};

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ 
        success: false, 
        message: 'Acesso negado. Token não fornecido.' 
    });
    
    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ 
            success: false, 
            message: 'Token inválido ou expirado.' 
        });
        req.user = user;
        next();
    });
};

// Rota de login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validação básica
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'E-mail e senha são obrigatórios.' 
            });
        }
        
        // Buscar usuário pelo email
        const users = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = users[0];
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'E-mail ou senha incorretos.' 
            });
        }
        
        // Verificar senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ 
                success: false, 
                message: 'E-mail ou senha incorretos.' 
            });
        }
        
        // Gerar token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );
        
        // Retornar dados do usuário e token
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro no servidor. Tente novamente mais tarde.' 
        });
    }
});

// Rota para registro de usuário
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validação básica
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Todos os campos são obrigatórios.' 
            });
        }
        
        // Verificar se o e-mail já está em uso
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Este e-mail já está cadastrado.' 
            });
        }
        
        // Hashear a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Inserir usuário no banco
        await db.query(
            'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW())',
            [name, email, hashedPassword]
        );
        
        res.json({ 
            success: true, 
            message: 'Usuário cadastrado com sucesso.' 
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro no servidor. Tente novamente mais tarde.' 
        });
    }
});

// Rota para obter comentários
app.get('/api/comments', async (req, res) => {
    try {
        const comments = await db.query(`
            SELECT c.*, u.name AS author_name 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            ORDER BY c.created_at DESC
            LIMIT 50
        `);
        res.json({ success: true, comments });
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao buscar comentários. Tente novamente.' 
        });
    }
});

// Rota para adicionar comentário
app.post('/api/comments', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.user.id;
        
        // Validação básica
        if (!title || !content) {
            return res.status(400).json({ 
                success: false, 
                message: 'Título e conteúdo são obrigatórios.' 
            });
        }
        
        // Inserir comentário
        await db.query(
            'INSERT INTO comments (user_id, title, content, created_at) VALUES ($1, $2, $3, NOW())',
            [user_id, title, content]
        );
        
        res.json({ 
            success: true, 
            message: 'Comentário adicionado com sucesso.' 
        });
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao adicionar comentário. Tente novamente.' 
        });
    }
});

// Rota para servir páginas HTML
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});

app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/comments.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});