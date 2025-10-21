document.addEventListener('DOMContentLoaded', function() {
  const areasContainer = document.getElementById('areas-container');
  
  // Dados de áreas e disciplinas (mockup inicial - será substituído pelo Supabase)
  const areas = [
    {
      nome: 'Programação',
      icone: '💻',
      cor: '#4285F4',
      descricao: 'A área de Programação engloba o desenvolvimento de software, algoritmos, estruturas de dados e paradigmas de programação. Os alunos aprendem a criar soluções computacionais eficientes e escaláveis.',
      disciplinas: [
        { nome: 'Introdução a Lógica de Programação', periodo: 1 },
        { nome: 'Línguagem de Programação', periodo: 2 },
        { nome: 'Estrutura de Dados', periodo: 3 },
        { nome: 'Programação Orientada a Objetos', periodo: 3 },
        { nome: 'Linguagem Programação Avançada', periodo: 4 },
        { nome: 'Aplicações e Desenvolvimento WEB', periodo: 5 }
      ]
    },
    {
      nome: 'Banco de Dados',
      icone: '🗃️',
      cor: '#DB4437',
      descricao: 'A área de Banco de Dados foca no armazenamento, organização, recuperação e manipulação eficiente de dados. Os estudantes aprendem modelagem de dados, SQL e gerenciamento de bancos de dados relacionais e não relacionais.',
      disciplinas: [
        { nome: 'Introdução a Banco de Dados', periodo: 4 },
        { nome: 'Banco de Dados Avançado', periodo: 5 },
        { nome: 'Modelagem de Dados', periodo: 6 }
      ]
    },
    {
      nome: 'Redes de Computadores',
      icone: '🌐',
      cor: '#F4B400',
      descricao: 'A área de Redes de Computadores aborda a infraestrutura e os protocolos de comunicação que permitem a troca de informações entre sistemas computacionais. Os alunos estudam desde os conceitos básicos até configurações avançadas de redes.',
      disciplinas: [
        { nome: 'Introdução a Redes de Computadores', periodo: 4 },
        { nome: 'Redes de Computadores', periodo: 5 },
        { nome: 'Sistemas Distribuídos', periodo: 6 },
        { nome: 'Tópicos Avançados em Telecomunicações', periodo: 8 }
      ]
    },
    {
      nome: 'Engenharia de Software',
      icone: '🔧',
      cor: '#0F9D58',
      descricao: 'A Engenharia de Software se concentra nos métodos, ferramentas e processos para desenvolvimento de sistemas de software de qualidade. Os estudantes aprendem a planejar, projetar, implementar e manter sistemas complexos.',
      disciplinas: [
        { nome: 'Análise e Projeto de Sistemas', periodo: 5 },
        { nome: 'Engenharia de Software', periodo: 6 },
        { nome: 'Gerência de Projetos', periodo: 7 }
      ]
    },
    {
      nome: 'Matemática',
      icone: '📊',
      cor: '#9C27B0',
      descricao: 'A área de Matemática fornece a base teórica e as ferramentas quantitativas necessárias para a computação. Os alunos estudam cálculo, álgebra, lógica e estatística aplicados à resolução de problemas computacionais.',
      disciplinas: [
        { nome: 'Cálculo Diferencial e Integral', periodo: 1 },
        { nome: 'Lógica Matemática', periodo: 1 },
        { nome: 'Álgebra Linear', periodo: 3 },
        { nome: 'Probabilidade e Estatística', periodo: 4 },
        { nome: 'Pesquisa Operacional', periodo: 5 }
      ]
    }
  ];
  
  // Renderizar áreas
  if (areasContainer) {
    areasContainer.innerHTML = '';
    
    areas.forEach(area => {
      const areaCard = document.createElement('div');
      areaCard.className = 'area-card';
      
      // Ordenar disciplinas por período
      const disciplinasOrdenadas = [...area.disciplinas].sort((a, b) => a.periodo - b.periodo);
      
      areaCard.innerHTML = `
        <div class="area-header" style="background-color: ${area.cor}">
          <div class="area-icon">${area.icone}</div>
          <h2>${area.nome}</h2>
        </div>
        <div class="area-body">
          <p class="area-desc">${area.descricao}</p>
          <div class="area-disciplinas">
            <h3>Disciplinas</h3>
            ${disciplinasOrdenadas.map(d => `
              <div class="disciplina-item">
                <span class="disciplina-nome">${d.nome}</span>
                <span class="disciplina-periodo">${d.periodo}º período</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
      areasContainer.appendChild(areaCard);
    });
  }
});