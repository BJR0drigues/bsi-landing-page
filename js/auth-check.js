document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loginLink = document.querySelector('a[href="pages/login.html"]');
    const commentsLink = document.querySelector('a[href="pages/comments.html"]');
    
    if (user.id) {
        // Se estiver logado, alterar o texto do link de login para o nome do usuário
        if (loginLink) {
            loginLink.textContent = user.name;
            loginLink.href = '#';
        }
        
        // Adicionar link de logout
        const navList = loginLink?.parentNode?.parentNode;
        if (navList) {
            const logoutItem = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.textContent = 'Sair';
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.reload();
            });
            logoutItem.appendChild(logoutLink);
            navList.appendChild(logoutItem);
        }
    }
});