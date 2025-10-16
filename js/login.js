document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já está logado
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
        // Redirecionar para a página inicial
        window.location.href = '../index.html';
        return;
    }
    
    // Formulário de login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.querySelector('input[name="remember"]').checked;
        
        // Validação básica
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Enviar dados para o servidor
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, remember })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Login bem-sucedido
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                
                // Redirecionar
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect') || '../index.html';
                window.location.href = redirect;
            } else {
                // Erro no login
                alert(data.message || 'Erro ao fazer login. Verifique suas credenciais.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
        });
    });
    
    // Modal de registro
    const registerBtn = document.getElementById('register-btn');
    const registerModal = document.getElementById('register-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        registerModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    // Formulário de registro
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const passwordConfirm = document.getElementById('reg-password-confirm').value;
        
        // Validação básica
        if (!name || !email || !password || !passwordConfirm) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        if (password !== passwordConfirm) {
            alert('As senhas não coincidem.');
            return;
        }
        
        // Enviar dados para o servidor
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Conta criada com sucesso! Faça login para continuar.');
                registerModal.style.display = 'none';
                document.getElementById('email').value = email;
            } else {
                alert(data.message || 'Erro ao criar conta. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao tentar criar sua conta. Tente novamente mais tarde.');
        });
    });
});