document.addEventListener('DOMContentLoaded', function () {
  const matrizContainer = document.getElementById('matriz-container');
  const filtroArea = document.getElementById('filtro-area');
  const buscaDisciplina = document.getElementById('busca-disciplina');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentPeriod = 'all';

  // Dados completos da matriz curricular
  const disciplinas = [
    // 1º Período
    { codigo: 'BSI001', nome: 'Atividades Extensionistas I', periodo: 1, carga: 100, area: 'Extensão', professor: 'A definir', descricao: 'Atividades práticas de extensão universitária.' },
    { codigo: 'BSI002', nome: 'Cálculo Diferencial e Integral', periodo: 1, carga: 60, area: 'Matemática', professor: 'A definir', descricao: 'Limites, derivadas e integrais de funções de uma variável.' },
    { codigo: 'BSI003', nome: 'Introdução a Lógica de Programação', periodo: 1, carga: 60, area: 'Programação', professor: 'A definir', descricao: 'Conceitos básicos de algoritmos e programação estruturada.' },
    { codigo: 'BSI004', nome: 'Introdução e Organização de Computadores', periodo: 1, carga: 60, area: 'Hardware', professor: 'A definir', descricao: 'Conceitos básicos de organização e arquitetura de computadores.' },
    { codigo: 'BSI005', nome: 'Lógica Matemática', periodo: 1, carga: 60, area: 'Matemática', professor: 'A definir', descricao: 'Lógica proposicional, tabelas-verdade e lógica de predicados.' },
    { codigo: 'BSI006', nome: 'Português Instrumental', periodo: 1, carga: 60, area: 'Comunicação', professor: 'A definir', descricao: 'Produção e interpretação de textos técnicos e científicos.' },

    // 2º Período
    { codigo: 'BSI007', nome: 'Arquitetura e Organização de Computadores', periodo: 2, carga: 60, area: 'Hardware', professor: 'A definir', descricao: 'Estudo da arquitetura e organização de computadores.', preRequisitos: 'Introdução e Organização de Computadores' },
    { codigo: 'BSI008', nome: 'Atividades Extensionistas II', periodo: 2, carga: 100, area: 'Extensão', professor: 'A definir', descricao: 'Atividades práticas de extensão universitária.', preRequisitos: 'Atividades Extensionistas I' },
    { codigo: 'BSI009', nome: 'Empreendedorismo e Gestão da Inovação', periodo: 2, carga: 60, area: 'Gestão', professor: 'A definir', descricao: 'Conceitos e práticas de empreendedorismo e inovação.' },
    { codigo: 'BSI010', nome: 'Interface Homem Máquina', periodo: 2, carga: 60, area: 'Interação', professor: 'A definir', descricao: 'Princípios e práticas de design de interfaces e usabilidade.' },
    { codigo: 'BSI011', nome: 'Linguagem de Programação', periodo: 2, carga: 60, area: 'Programação', professor: 'A definir', descricao: 'Estudo e prática de linguagens de programação.', preRequisitos: 'Introdução a Lógica de Programação' },
    { codigo: 'BSI012', nome: 'Metodologia Científica', periodo: 2, carga: 60, area: 'Metodologia', professor: 'A definir', descricao: 'Métodos e técnicas de pesquisa científica.' },

    // 3º Período
    { codigo: 'BSI013', nome: 'Álgebra Linear', periodo: 3, carga: 60, area: 'Matemática', professor: 'A definir', descricao: 'Estudo de matrizes, sistemas lineares e vetores.', preRequisitos: 'Cálculo Diferencial e Integral' },
    { codigo: 'BSI014', nome: 'Atividades Extensionistas III', periodo: 3, carga: 100, area: 'Extensão', professor: 'A definir', descricao: 'Atividades práticas de extensão universitária.', preRequisitos: 'Atividades Extensionistas II' },
    { codigo: 'BSI015', nome: 'Estrutura de Dados', periodo: 3, carga: 60, area: 'Programação', professor: 'A definir', descricao: 'Listas, pilhas, filas e árvores.', preRequisitos: 'Linguagem de Programação' },
    { codigo: 'BSI016', nome: 'Programação Orientada a Objetos', periodo: 3, carga: 60, area: 'Programação', professor: 'A definir', descricao: 'Classes, herança, polimorfismo e encapsulamento.', preRequisitos: 'Linguagem de Programação' },
    { codigo: 'BSI017', nome: 'Sistemas Operacionais', periodo: 3, carga: 60, area: 'Sistemas', professor: 'A definir', descricao: 'Conceitos de sistemas operacionais modernos.', preRequisitos: 'Arquitetura e Organização de Computadores' },
    { codigo: 'BSI018', nome: 'Teoria Geral de Sistemas', periodo: 3, carga: 60, area: 'Sistemas', professor: 'A definir', descricao: 'Fundamentos da teoria de sistemas.', preRequisitos: null },

    // 4º Período
    { codigo: 'BSI019', nome: 'Atividades Extensionistas IV', periodo: 4, carga: 100, area: 'Extensão', professor: 'Sandir Rodrigues Campos', descricao: 'Atividades práticas de extensão universitária.', preRequisitos: 'Atividades Extensionistas III' },
    { codigo: 'BSI020', nome: 'Introdução a Banco de Dados', periodo: 4, carga: 60, area: 'Banco de Dados', professor: 'Sandir Rodrigues Campos', descricao: 'Conceitos básicos de bancos de dados.', preRequisitos: null },
    { codigo: 'BSI021', nome: 'Introdução a Redes de Computadores', periodo: 4, carga: 60, area: 'Redes', professor: 'João Pedro Ferreira Gress', descricao: 'Fundamentos de redes e protocolos.', preRequisitos: null },
    { codigo: 'BSI022', nome: 'Linguagem Programação Avançada', periodo: 4, carga: 60, area: 'Programação', professor: 'Romes Heriberto Pires de Araújo', descricao: 'Conceitos avançados de desenvolvimento.', preRequisitos: 'Programação Orientada a Objetos' },
    { codigo: 'BSI023', nome: 'Linguagens Formais e Autômatos', periodo: 4, carga: 60, area: 'Teoria da Computação', professor: 'Juliana Alves Vieira', descricao: 'Teoria de linguagens formais e autômatos.', preRequisitos: null },
    { codigo: 'BSI024', nome: 'Probabilidade e Estatística', periodo: 4, carga: 60, area: 'Matemática', professor: 'Janilson Pereira do Nascimento', descricao: 'Probabilidade e estatística descritiva.', preRequisitos: null },

    // 5º Período
    { codigo: 'BSI025', nome: 'Análise e Projeto de Sistemas', periodo: 5, carga: 60, area: 'Engenharia de Software', professor: 'A definir', descricao: 'Metodologias para análise e projeto.', preRequisitos: 'Teoria Geral de Sistemas' },
    { codigo: 'BSI026', nome: 'Aplicações e Desenvolvimento WEB', periodo: 5, carga: 60, area: 'Programação', professor: 'A definir', descricao: 'Desenvolvimento web moderno.', preRequisitos: 'Linguagem Programação Avançada' },
    { codigo: 'BSI027', nome: 'Banco de Dados Avançado', periodo: 5, carga: 60, area: 'Banco de Dados', professor: 'A definir', descricao: 'Otimização e administração de BD.', preRequisitos: 'Introdução a Banco de Dados' },
    { codigo: 'BSI028', nome: 'Pesquisa Operacional', periodo: 5, carga: 60, area: 'Matemática', professor: 'A definir', descricao: 'Modelagem e otimização.', preRequisitos: 'Probabilidade e Estatística' },
    { codigo: 'BSI029', nome: 'Práticas Supervisionadas em TI', periodo: 5, carga: 100, area: 'Prática Profissional', professor: 'A definir', descricao: 'Atividades práticas supervisionadas.', preRequisitos: null },
    { codigo: 'BSI030', nome: 'Redes de Computadores', periodo: 5, carga: 60, area: 'Redes', professor: 'A definir', descricao: 'Aprofundamento em redes.', preRequisitos: 'Introdução a Redes de Computadores' },

    // 6º Período
    { codigo: 'BSI031', nome: 'Atividades Complementares I', periodo: 6, carga: 100, area: 'Complementar', professor: 'A definir', descricao: 'Atividades acadêmicas complementares.', preRequisitos: null },
    { codigo: 'BSI032', nome: 'Engenharia de Software', periodo: 6, carga: 60, area: 'Engenharia de Software', professor: 'A definir', descricao: 'Processos e métodos de desenvolvimento.', preRequisitos: 'Análise e Projeto de Sistemas' },
    { codigo: 'BSI033', nome: 'Modelagem de Dados', periodo: 6, carga: 60, area: 'Banco de Dados', professor: 'A definir', descricao: 'Modelagem avançada de dados.', preRequisitos: 'Banco de Dados Avançado' },
    { codigo: 'BSI034', nome: 'Optativa I', periodo: 6, carga: 60, area: 'Optativa', professor: 'A definir', descricao: 'Disciplina optativa.', preRequisitos: null },
    { codigo: 'BSI035', nome: 'Segurança em Informática', periodo: 6, carga: 60, area: 'Segurança', professor: 'A definir', descricao: 'Segurança da informação e proteção de dados.', preRequisitos: 'Redes de Computadores' },
    { codigo: 'BSI036', nome: 'Sistemas Distribuídos', periodo: 6, carga: 60, area: 'Sistemas', professor: 'A definir', descricao: 'Arquiteturas para sistemas distribuídos.', preRequisitos: 'Redes de Computadores' },

    // 7º Período
    { codigo: 'BSI037', nome: 'Gerência de Projetos', periodo: 7, carga: 60, area: 'Gestão', professor: 'A definir', descricao: 'Gerenciamento de projetos de TI.', preRequisitos: 'Engenharia de Software' },
    { codigo: 'BSI038', nome: 'Inteligência Artificial', periodo: 7, carga: 60, area: 'Inteligência Artificial', professor: 'A definir', descricao: 'IA, aprendizado de máquina e sistemas especialistas.', preRequisitos: null },
    { codigo: 'BSI039', nome: 'Optativa II', periodo: 7, carga: 60, area: 'Optativa', professor: 'A definir', descricao: 'Disciplina optativa.', preRequisitos: null },
    { codigo: 'BSI040', nome: 'Planejamento Estratégico de SI', periodo: 7, carga: 60, area: 'Gestão', professor: 'A definir', descricao: 'Alinhamento estratégico e governança.', preRequisitos: 'Gerência de Projetos' },
    { codigo: 'BSI041', nome: 'Práticas Orientadas de TCC', periodo: 7, carga: 160, area: 'TCC', professor: 'A definir', descricao: 'Orientação para TCC.', preRequisitos: 'Metodologia Científica' },

    // 8º Período
    { codigo: 'BSI042', nome: 'Atividades Complementares II', periodo: 8, carga: 100, area: 'Complementar', professor: 'A definir', descricao: 'Atividades acadêmicas complementares.', preRequisitos: 'Atividades Complementares I' },
    { codigo: 'BSI043', nome: 'Ética e Legislação em TI', periodo: 8, carga: 60, area: 'Humanidades', professor: 'A definir', descricao: 'Aspectos éticos e legais.', preRequisitos: null },
    { codigo: 'BSI044', nome: 'Tópicos Avançados em SI', periodo: 8, carga: 60, area: 'Sistemas', professor: 'A definir', descricao: 'Temas emergentes em SI.', preRequisitos: null },
    { codigo: 'BSI045', nome: 'Tópicos Avançados em Telecom', periodo: 8, carga: 60, area: 'Redes', professor: 'A definir', descricao: 'Temas emergentes em telecomunicações.', preRequisitos: 'Redes de Computadores' },
    { codigo: 'BSI046', nome: 'Trabalho de Curso', periodo: 8, carga: 120, area: 'TCC', professor: 'A definir', descricao: 'Desenvolvimento do TCC.', preRequisitos: 'Práticas Orientadas de TCC' }
  ];

  // Populate Area Filter
  const areas = [...new Set(disciplinas.map(d => d.area))].sort();
  areas.forEach(area => {
    const option = document.createElement('option');
    option.value = area;
    option.textContent = area;
    filtroArea.appendChild(option);
  });

  // Render Function
  function renderizarDisciplinas(items) {
    if (!items || items.length === 0) {
      matrizContainer.innerHTML = '<p class="sem-resultado">Nenhuma disciplina encontrada.</p>';
      return;
    }

    // Group by period
    const byPeriod = {};
    items.forEach(d => {
      if (!byPeriod[d.periodo]) byPeriod[d.periodo] = [];
      byPeriod[d.periodo].push(d);
    });

    const periods = Object.keys(byPeriod).sort((a, b) => a - b);
    matrizContainer.innerHTML = '';

    periods.forEach(p => {
      const group = document.createElement('div');
      group.className = 'periodo-group';

      const totalHours = byPeriod[p].reduce((acc, curr) => acc + curr.carga, 0);

      group.innerHTML = `
        <h3>${p}º Período <span style="font-size: 0.8em; color: var(--text-gray); font-weight: 400; margin-left: 10px;">(${totalHours}h)</span></h3>
        ${byPeriod[p].map(d => `
          <div class="disciplina-card" title="${d.descricao}">
            <span class="code">${d.codigo}</span>
            <h4>${d.nome}</h4>
            <span class="hours">${d.carga}h</span>
          </div>
        `).join('')}
      `;
      matrizContainer.appendChild(group);
    });
  }

  // Filter Logic
  function applyFilters() {
    const area = filtroArea.value;
    const search = buscaDisciplina.value.toLowerCase().trim();

    let filtered = disciplinas.filter(d => {
      // Period Filter
      if (currentPeriod !== 'all' && d.periodo !== parseInt(currentPeriod)) return false;

      // Area Filter
      if (area !== '0' && d.area !== area) return false;

      // Search Filter
      if (search && !d.nome.toLowerCase().includes(search) && !d.codigo.toLowerCase().includes(search)) return false;

      return true;
    });

    renderizarDisciplinas(filtered);
  }

  // Event Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add to clicked
      btn.classList.add('active');
      // Update state
      currentPeriod = btn.dataset.periodo;
      applyFilters();
    });
  });

  filtroArea.addEventListener('change', applyFilters);
  buscaDisciplina.addEventListener('input', applyFilters);

  // Initial Render
  renderizarDisciplinas(disciplinas);
});