document.addEventListener('DOMContentLoaded', function() {
  // Carregar áreas de conhecimento na página inicial
  const areasContainer = document.getElementById('areas-container');
  
  if (areasContainer) {
    // Áreas de exemplo (serão substituídas pelos dados do Supabase)
    const areas = [
      { nome: 'Programação', icone: '💻', descricao: 'Desenvolvimento de software, algoritmos e estruturas de dados' },
      { nome: 'Banco de Dados', icone: '🗃️', descricao: 'Modelagem, manipulação e gerenciamento de dados' },
      { nome: 'Redes', icone: '🌐', descricao: 'Infraestrutura e protocolos de comunicação' },
      { nome: 'Engenharia de Software', icone: '🔧', descricao: 'Processos, métodos e ferramentas para desenvolvimento' }
    ];
    
    // Limpar o contêiner
    areasContainer.innerHTML = '';
    
    // Renderizar áreas
    areas.forEach(area => {
      const areaCard = document.createElement('div');
      areaCard.className = 'area-card';
      areaCard.innerHTML = `
        <div class="area-icon">${area.icone}</div>
        <h3>${area.nome}</h3>
        <p>${area.descricao}</p>
      `;
      areasContainer.appendChild(areaCard);
    });
  }
});