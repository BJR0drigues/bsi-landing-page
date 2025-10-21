document.addEventListener('DOMContentLoaded', function() {
  const matrizContainer = document.getElementById('matriz-container');
  const filtroPeriodo = document.getElementById('filtro-periodo');
  const filtroArea = document.getElementById('filtro-area');
  const buscaDisciplina = document.getElementById('busca-disciplina');
  
  // Dados da matriz (mockup inicial - será substituído pelo Supabase)
  const disciplinas = [
  // 1º Período
  { 
    codigo: 'BSI001', 
    nome: 'Atividades Extensionistas I', 
    periodo: 1, 
    cargaTeorica: 100, 
    cargaPratica: 0, 
    area: 'Extensão',
    professor: 'A definir',
    descricao: 'Atividades práticas de extensão universitária.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI002', 
    nome: 'Cálculo Diferencial e Integral', 
    periodo: 1, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Matemática',
    professor: 'A definir',
    descricao: 'Limites, derivadas e integrais de funções de uma variável.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI003', 
    nome: 'Introdução a Lógica de Programação', 
    periodo: 1, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Programação',
    professor: 'A definir',
    descricao: 'Conceitos básicos de algoritmos e programação estruturada.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI004', 
    nome: 'Introdução e Organização de Computadores', 
    periodo: 1, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Hardware',
    professor: 'A definir',
    descricao: 'Conceitos básicos de organização e arquitetura de computadores.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI005', 
    nome: 'Lógica Matemática', 
    periodo: 1, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Matemática',
    professor: 'A definir',
    descricao: 'Lógica proposicional, tabelas-verdade e lógica de predicados.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI006', 
    nome: 'Português Instrumental', 
    periodo: 1, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Comunicação',
    professor: 'A definir',
    descricao: 'Produção e interpretação de textos técnicos e científicos.',
    preRequisitos: null 
  },
  
  // 2º Período
  { 
    codigo: 'BSI007', 
    nome: 'Arquitetura e Organização de Computadores', 
    periodo: 2, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Hardware',
    professor: 'A definir',
    descricao: 'Estudo da arquitetura e organização de computadores, incluindo processadores, memória e barramentos.',
    preRequisitos: 'Introdução e Organização de Computadores' 
  },
  { 
    codigo: 'BSI008', 
    nome: 'Atividades Extensionistas II', 
    periodo: 2, 
    cargaTeorica: 100, 
    cargaPratica: 0, 
    area: 'Extensão',
    professor: 'A definir',
    descricao: 'Atividades práticas de extensão universitária.',
    preRequisitos: 'Atividades Extensionistas I' 
  },
  { 
    codigo: 'BSI009', 
    nome: 'Empreendedorismo e Gestão da Inovação e Competitividade', 
    periodo: 2, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Gestão',
    professor: 'A definir',
    descricao: 'Conceitos e práticas de empreendedorismo, inovação e competitividade no mercado.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI010', 
    nome: 'Interface Homem Máquina', 
    periodo: 2, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Interação',
    professor: 'A definir',
    descricao: 'Princípios e práticas de design de interfaces e usabilidade.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI011', 
    nome: 'Linguagem de Programação', 
    periodo: 2, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Programação',
    professor: 'A definir',
    descricao: 'Estudo e prática de linguagens de programação específicas e seus paradigmas.',
    preRequisitos: 'Introdução a Lógica de Programação' 
  },
  { 
    codigo: 'BSI012', 
    nome: 'Metodologia Científica', 
    periodo: 2, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Metodologia',
    professor: 'A definir',
    descricao: 'Métodos e técnicas de pesquisa científica e elaboração de trabalhos acadêmicos.',
    preRequisitos: null 
  },
  
  // 3º Período
  { 
    codigo: 'BSI013', 
    nome: 'Álgebra Linear', 
    periodo: 3, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Matemática',
    professor: 'A definir',
    descricao: 'Estudo de matrizes, sistemas lineares, espaços e transformações vetoriais.',
    preRequisitos: 'Cálculo Diferencial e Integral' 
  },
  { 
    codigo: 'BSI014', 
    nome: 'Atividades Extensionistas III', 
    periodo: 3, 
    cargaTeorica: 100, 
    cargaPratica: 0, 
    area: 'Extensão',
    professor: 'A definir',
    descricao: 'Atividades práticas de extensão universitária.',
    preRequisitos: 'Atividades Extensionistas II' 
  },
  { 
    codigo: 'BSI015', 
    nome: 'Estrutura de Dados', 
    periodo: 3, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Programação',
    professor: 'A definir',
    descricao: 'Estudo e implementação de estruturas de dados fundamentais como listas, pilhas, filas e árvores.',
    preRequisitos: 'Linguagem de Programação' 
  },
  { 
    codigo: 'BSI016', 
    nome: 'Programação Orientada a Objetos', 
    periodo: 3, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Programação',
    professor: 'A definir',
    descricao: 'Paradigma de orientação a objetos, classes, herança, polimorfismo e encapsulamento.',
    preRequisitos: 'Linguagem de Programação' 
  },
  { 
    codigo: 'BSI017', 
    nome: 'Sistemas Operacionais', 
    periodo: 3, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Sistemas',
    professor: 'A definir',
    descricao: 'Conceitos e implementações de sistemas operacionais modernos.',
    preRequisitos: 'Arquitetura e Organização de Computadores' 
  },
  { 
    codigo: 'BSI018', 
    nome: 'Teoria Geral de Sistemas', 
    periodo: 3, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Sistemas',
    professor: 'A definir',
    descricao: 'Fundamentos da teoria de sistemas e sua aplicação na análise de problemas complexos.',
    preRequisitos: null 
  },
  
  // 4º Período
  { 
    codigo: 'BSI019', 
    nome: 'Atividades Extensionistas IV', 
    periodo: 4, 
    cargaTeorica: 100, 
    cargaPratica: 0, 
    area: 'Extensão',
    professor: 'Sandir Rodrigues Campos',
    descricao: 'Atividades práticas de extensão universitária.',
    preRequisitos: 'Atividades Extensionistas III' 
  },
  { 
    codigo: 'BSI020', 
    nome: 'Introdução a Banco de Dados', 
    periodo: 4, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Banco de Dados',
    professor: 'Sandir Rodrigues Campos',
    descricao: 'Conceitos básicos de bancos de dados e modelagem de dados.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI021', 
    nome: 'Introdução a Redes de Computadores', 
    periodo: 4, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Redes',
    professor: 'João Pedro Ferreira Gress',
    descricao: 'Fundamentos de redes de computadores e protocolos de comunicação.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI022', 
    nome: 'Linguagem Programação Avançada', 
    periodo: 4, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Programação',
    professor: 'Romes Heriberto Pires de Araújo',
    descricao: 'Conceitos avançados de programação e desenvolvimento de aplicações.',
    preRequisitos: 'Programação Orientada a Objetos' 
  },
  { 
    codigo: 'BSI023', 
    nome: 'Linguagens Formais e Autômatos', 
    periodo: 4, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Teoria da Computação',
    professor: 'Juliana Alves Vieira',
    descricao: 'Teoria de linguagens formais, autômatos e expressões regulares.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI024', 
    nome: 'Probabilidade e Estatística', 
    periodo: 4, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Matemática',
    professor: 'Janilson Pereira do Nascimento',
    descricao: 'Conceitos de probabilidade, estatística descritiva e inferencial.',
    preRequisitos: null 
  },
  
  // 5º Período
  { 
    codigo: 'BSI025', 
    nome: 'Análise e Projeto de Sistemas', 
    periodo: 5, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Engenharia de Software',
    professor: 'A definir',
    descricao: 'Metodologias e técnicas para análise e projeto de sistemas de informação.',
    preRequisitos: 'Teoria Geral de Sistemas' 
  },
  { 
    codigo: 'BSI026', 
    nome: 'Aplicações e Desenvolvimento WEB', 
    periodo: 5, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Programação',
    professor: 'A definir',
    descricao: 'Desenvolvimento de aplicações web utilizando tecnologias atuais.',
    preRequisitos: 'Linguagem Programação Avançada' 
  },
  { 
    codigo: 'BSI027', 
    nome: 'Banco de Dados Avançado', 
    periodo: 5, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Banco de Dados',
    professor: 'A definir',
    descricao: 'Tópicos avançados em banco de dados, incluindo otimização e administração.',
    preRequisitos: 'Introdução a Banco de Dados' 
  },
  { 
    codigo: 'BSI028', 
    nome: 'Pesquisa Operacional', 
    periodo: 5, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Matemática',
    professor: 'A definir',
    descricao: 'Métodos de modelagem e resolução de problemas de otimização.',
    preRequisitos: 'Probabilidade e Estatística' 
  },
  { 
    codigo: 'BSI029', 
    nome: 'Práticas Supervisionadas em TI', 
    periodo: 5, 
    cargaTeorica: 0, 
    cargaPratica: 100, 
    area: 'Prática Profissional',
    professor: 'A definir',
    descricao: 'Atividades práticas supervisionadas em ambiente de tecnologia da informação.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI030', 
    nome: 'Redes de Computadores', 
    periodo: 5, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Redes',
    professor: 'A definir',
    descricao: 'Aprofundamento em redes de computadores, protocolos e serviços de rede.',
    preRequisitos: 'Introdução a Redes de Computadores' 
  },
  
  // 6º Período
  { 
    codigo: 'BSI031', 
    nome: 'Atividades Complementares I', 
    periodo: 6, 
    cargaTeorica: 100, 
    cargaPratica: 0, 
    area: 'Complementar',
    professor: 'A definir',
    descricao: 'Atividades acadêmicas complementares para enriquecimento do currículo.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI032', 
    nome: 'Engenharia de Software', 
    periodo: 6, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Engenharia de Software',
    professor: 'A definir',
    descricao: 'Processos, métodos e ferramentas para o desenvolvimento de software.',
    preRequisitos: 'Análise e Projeto de Sistemas' 
  },
  { 
    codigo: 'BSI033', 
    nome: 'Modelagem de Dados', 
    periodo: 6, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Banco de Dados',
    professor: 'A definir',
    descricao: 'Técnicas avançadas de modelagem de dados e implementação de bancos de dados.',
    preRequisitos: 'Banco de Dados Avançado' 
  },
  { 
    codigo: 'BSI034', 
    nome: 'Optativa I', 
    periodo: 6, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Optativa',
    professor: 'A definir',
    descricao: 'Disciplina optativa de escolha do aluno conforme oferta do curso.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI035', 
    nome: 'Segurança em Informática', 
    periodo: 6, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Segurança',
    professor: 'A definir',
    descricao: 'Conceitos e práticas de segurança da informação e proteção de dados.',
    preRequisitos: 'Redes de Computadores' 
  },
  { 
    codigo: 'BSI036', 
    nome: 'Sistemas Distribuídos', 
    periodo: 6, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Sistemas',
    professor: 'A definir',
    descricao: 'Arquiteturas, princípios e tecnologias para sistemas distribuídos.',
    preRequisitos: 'Redes de Computadores' 
  },
  
  // 7º Período
  { 
    codigo: 'BSI037', 
    nome: 'Gerência de Projetos', 
    periodo: 7, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Gestão',
    professor: 'A definir',
    descricao: 'Metodologias e ferramentas para gerenciamento de projetos de TI.',
    preRequisitos: 'Engenharia de Software' 
  },
  { 
    codigo: 'BSI038', 
    nome: 'Inteligência Artificial', 
    periodo: 7, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Inteligência Artificial',
    professor: 'A definir',
    descricao: 'Fundamentos de inteligência artificial, aprendizado de máquina e sistemas especialistas.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI039', 
    nome: 'Optativa II', 
    periodo: 7, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Optativa',
    professor: 'A definir',
    descricao: 'Disciplina optativa de escolha do aluno conforme oferta do curso.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI040', 
    nome: 'Planejamento Estratégico de Sistema de Informação', 
    periodo: 7, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Gestão',
    professor: 'A definir',
    descricao: 'Alinhamento estratégico entre negócios e TI, planejamento e governança.',
    preRequisitos: 'Gerência de Projetos' 
  },
  { 
    codigo: 'BSI041', 
    nome: 'Práticas Orientadas de TCC', 
    periodo: 7, 
    cargaTeorica: 0, 
    cargaPratica: 160, 
    area: 'TCC',
    professor: 'A definir',
    descricao: 'Orientação para desenvolvimento do trabalho de conclusão de curso.',
    preRequisitos: 'Metodologia Científica' 
  },
  
  // 8º Período
  { 
    codigo: 'BSI042', 
    nome: 'Atividades Complementares II', 
    periodo: 8, 
    cargaTeorica: 100, 
    cargaPratica: 0, 
    area: 'Complementar',
    professor: 'A definir',
    descricao: 'Atividades acadêmicas complementares para enriquecimento do currículo.',
    preRequisitos: 'Atividades Complementares I' 
  },
  { 
    codigo: 'BSI043', 
    nome: 'Ética e Legislação em TI', 
    periodo: 8, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Humanidades',
    professor: 'A definir',
    descricao: 'Aspectos éticos e legais relacionados à tecnologia da informação.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI044', 
    nome: 'Tópicos Avançados em Sistemas de Informação', 
    periodo: 8, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Sistemas',
    professor: 'A definir',
    descricao: 'Temas emergentes e atuais em sistemas de informação.',
    preRequisitos: null 
  },
  { 
    codigo: 'BSI045', 
    nome: 'Tópicos Avançados em Telecomunicações', 
    periodo: 8, 
    cargaTeorica: 60, 
    cargaPratica: 0, 
    area: 'Redes',
    professor: 'A definir',
    descricao: 'Temas emergentes e atuais em telecomunicações e redes avançadas.',
    preRequisitos: 'Redes de Computadores' 
  },
  { 
    codigo: 'BSI046', 
    nome: 'Trabalho de Curso', 
    periodo: 8, 
    cargaTeorica: 120, 
    cargaPratica: 0, 
    area: 'TCC',
    professor: 'A definir',
    descricao: 'Desenvolvimento e apresentação do trabalho de conclusão de curso.',
    preRequisitos: 'Práticas Orientadas de TCC' 
  }
];
    // Os outros períodos seriam adicionados de forma semelhante
  
  // Extrair áreas únicas para o filtro
  const areas = [...new Set(disciplinas.map(d => d.area))].sort();
  
  // Preencher o dropdown de áreas
  areas.forEach(area => {
    const option = document.createElement('option');
    option.value = area;
    option.textContent = area;
    filtroArea.appendChild(option);
  });
  
  // Função para renderizar as disciplinas
  function renderizarDisciplinas(disciplinasFiltradas) {
    if (!disciplinasFiltradas || disciplinasFiltradas.length === 0) {
      matrizContainer.innerHTML = '<p class="sem-resultado">Nenhuma disciplina encontrada para os filtros selecionados.</p>';
      return;
    }
    
    // Agrupar por período
    const disciplinasPorPeriodo = {};
    disciplinasFiltradas.forEach(d => {
      if (!disciplinasPorPeriodo[d.periodo]) {
        disciplinasPorPeriodo[d.periodo] = [];
      }
      disciplinasPorPeriodo[d.periodo].push(d);
    });
    
    // Ordenar períodos
    const periodos = Object.keys(disciplinasPorPeriodo).sort((a, b) => a - b);
    
    // Limpar container
    matrizContainer.innerHTML = '';
    
    // Renderizar por período
    periodos.forEach(periodo => {
      const periodoSection = document.createElement('div');
      periodoSection.className = 'periodo-section';
      
      const totalHoras = disciplinasPorPeriodo[periodo].reduce((total, d) => total + d.cargaTeorica + d.cargaPratica, 0);
      
      periodoSection.innerHTML = `
        <div class="periodo-header">
          <h2>${periodo}º Período</h2>
          <span>${totalHoras}h</span>
        </div>
        <div class="disciplinas-grid">
          ${disciplinasPorPeriodo[periodo].map(d => `
            <div class="disciplina-card">
              <div class="disciplina-header">
                <h3>${d.nome}</h3>
                <span class="carga-horaria">${d.cargaTeorica + d.cargaPratica}h</span>
              </div>
              <div class="disciplina-body">
                <div class="disciplina-info">
                  <span>Código: ${d.codigo}</span>
                  <span>Área: ${d.area}</span>
                </div>
                <p class="disciplina-desc">${d.descricao || 'Descrição não disponível.'}</p>
                <div class="disciplina-professor">
                  <span class="professor-tag">Prof. ${d.professor}</span>
                </div>
                ${d.preRequisitos ? `
                <div class="disciplina-requisitos">
                  <p>Pré-requisitos: ${d.preRequisitos}</p>
                </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      matrizContainer.appendChild(periodoSection);
    });
  }
  
  // Função para aplicar filtros
  function aplicarFiltros() {
    const periodoSelecionado = parseInt(filtroPeriodo.value);
    const areaSelecionada = filtroArea.value;
    const termoBusca = buscaDisciplina.value.toLowerCase().trim();
    
    let disciplinasFiltradas = [...disciplinas];
    
    // Filtrar por período
    if (periodoSelecionado > 0) {
      disciplinasFiltradas = disciplinasFiltradas.filter(d => d.periodo === periodoSelecionado);
    }
    
    // Filtrar por área
    if (areaSelecionada !== '0') {
      disciplinasFiltradas = disciplinasFiltradas.filter(d => d.area === areaSelecionada);
    }
    
    // Filtrar por termo de busca
    if (termoBusca) {
      disciplinasFiltradas = disciplinasFiltradas.filter(d => 
        d.nome.toLowerCase().includes(termoBusca) || 
        d.codigo.toLowerCase().includes(termoBusca) ||
        (d.descricao && d.descricao.toLowerCase().includes(termoBusca))
      );
    }
    
    renderizarDisciplinas(disciplinasFiltradas);
  }
  
  // Eventos para os filtros
  filtroPeriodo.addEventListener('change', aplicarFiltros);
  filtroArea.addEventListener('change', aplicarFiltros);
  buscaDisciplina.addEventListener('input', aplicarFiltros);
  
  // Renderizar todas as disciplinas inicialmente
  renderizarDisciplinas(disciplinas);
});