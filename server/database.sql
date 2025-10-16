-- Criar tabelas
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir usuário de teste (senha: 123456)
INSERT INTO users (name, email, password) 
VALUES ('Usuário Teste', 'teste@exemplo.com', '$2y$10$rB.QhM2Dd6XaQR3ZJYUvQeBDJ/s2qO0I9JOUzvRrKO08Bh5BLTzp.');