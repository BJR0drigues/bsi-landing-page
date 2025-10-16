document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    const newCommentSection = document.getElementById('new-comment-section');
    const loginMessage = document.getElementById('login-message');
    const loginLink = document.getElementById('login-link');
    
    // Mostrar ou esconder seção de comentários com base no login
    if (user.id && token) {
        // Usuário está logado
        newCommentSection.style.display = 'block';
        loginMessage.style.display = 'none';
        
        // Atualizar menu de navegação
        if (loginLink) {
            loginLink.textContent = user.name;
            
            // Adicionar link de logout
            const navList = loginLink.parentNode.parentNode;
            const logoutItem = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.textContent = 'Sair';
            logoutLink.id = 'logout-link';
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.reload();
            });
            logoutItem.appendChild(logoutLink);
            navList.appendChild(logoutItem);
        }
    } else {
        // Usuário não está logado
        newCommentSection.style.display = 'none';
        loginMessage.style.display = 'block';
    }
    
    // Carregar comentários (todos podem ver)
    loadComments();
    
    // Configurar o formulário de comentários
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', submitComment);
    }
});

function loadComments() {
    const commentsContainer = document.getElementById('comments-container');
    
    fetch('/api/comments')
        .then(response => response.json())
        .then(data => {
            commentsContainer.innerHTML = ''; // Limpar container
            
            if (data.success && data.comments && data.comments.length > 0) {
                // Ordenar comentários do mais recente para o mais antigo
                data.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                
                // Criar elementos para cada comentário
                data.comments.forEach(comment => {
                    commentsContainer.appendChild(createCommentElement(comment));
                });
            } else {
                commentsContainer.innerHTML = '<div class="no-comments">Ainda não há comentários. Seja o primeiro a comentar!</div>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar comentários:', error);
            commentsContainer.innerHTML = '<div class="comment-error">Erro ao carregar comentários. Por favor, tente novamente mais tarde.</div>';
        });
}

function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    
    const formattedDate = new Date(comment.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    commentDiv.innerHTML = `
        <div class="comment-header">
            <div class="comment-title">${escapeHTML(comment.title)}</div>
            <div class="comment-date">${formattedDate}</div>
        </div>
        <div class="comment-author">Por: ${escapeHTML(comment.author_name)}</div>
        <div class="comment-content">${escapeHTML(comment.content)}</div>
    `;
    
    return commentDiv;
}

function submitComment(e) {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    if (!user.id || !token) {
        alert('Você precisa estar logado para enviar um comentário.');
        return;
    }
    
    const title = document.getElementById('comment-title').value.trim();
    const content = document.getElementById('comment-text').value.trim();
    
    // Validação básica
    if (!title || !content) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Desabilitar botão durante o envio
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Limpar formulário
            document.getElementById('comment-title').value = '';
            document.getElementById('comment-text').value = '';
            
            // Recarregar comentários
            loadComments();
            
            alert('Comentário enviado com sucesso!');
        } else {
            alert(data.message || 'Erro ao enviar comentário. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar o comentário. Tente novamente mais tarde.');
    })
    .finally(() => {
        // Reabilitar botão
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Comentário';
    });
}

// Função para escapar HTML e evitar XSS
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}