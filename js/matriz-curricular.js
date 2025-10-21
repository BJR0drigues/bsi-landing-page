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
    
    // 4º Período
    { 
      codigo: 'BSI025', 
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
      codigo: 'BSI026', 
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
      codigo: 'BSI027', 
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
      codigo: 'BSI028', 
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
      codigo: 'BSI029', 
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
      codigo: 'BSI030', 
      nome: 'Probabilidade e Estatística', 
      periodo: 4, 
      cargaTeorica: 60, 
      cargaPratica: 0, 
      area: 'Matemática',
      professor: 'Janilson Pereira do Nascimento',
      descricao: 'Conceitos de probabilidade, estatística descritiva e inferencial.',
      preRequisitos: null 
    }
    // Os outros períodos seriam adicionados de forma semelhante
  ];
  
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