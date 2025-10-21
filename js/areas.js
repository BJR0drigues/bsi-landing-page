document.addEventListener('DOMContentLoaded', async function() {
  const areasContainer = document.getElementById('areas-container');
  
  // Carregar áreas e disciplinas do Supabase
  async function carregarAreas() {
    try {
      // Carregar áreas
      const { data: areas, error: areasError } = await supabase
        .from('areas')
        .select('*')
        .order('nome');
        
      if (areasError) throw areasError;
      
      // Para cada área, carregar suas disciplinas
      for (let area of areas) {
        const { data: disciplinas, error: discError } = await supabase
          .from('disciplinas')
          .select('nome, periodo')
          .eq('area_id', area.id)
          .order('periodo');
          
        if (discError) throw discError;
        area.disciplinas = disciplinas;
      }
      
      return areas;
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      return [];
    }
  }
  
  // Renderizar áreas
  if (areasContainer) {
    try {
      areasContainer.innerHTML = '<p class="loading">Carregando áreas de conhecimento...</p>';
      
      const areas = await carregarAreas();
      
      if (areas.length === 0) {
        areasContainer.innerHTML = '<p class="error">Não foi possível carregar as áreas de conhecimento.</p>';
        return;
      }
      
      areasContainer.innerHTML = '';
      
      areas.forEach(area => {
        const areaCard = document.createElement('div');
        areaCard.className = 'area-card';
        
        // Ordenar disciplinas por período
        const disciplinasOrdenadas = [...area.disciplinas].sort((a, b) => a.periodo - b.periodo);
        
        areaCard.innerHTML = `
          <div class="area-header" style="background-color: ${area.cor || '#1a3c8a'}">
            <div class="area-icon">${area.icone || '📚'}</div>
            <h2>${area.nome}</h2>
          </div>
          <div class="area-body">
            <p class="area-desc">${area.descricao || 'Descrição não disponível.'}</p>
            <div class="area-disciplinas">
              <h3>Disciplinas</h3>
              ${disciplinasOrdenadas.length > 0 ? disciplinasOrdenadas.map(d => `
                <div class="disciplina-item">
                  <span class="disciplina-nome">${d.nome}</span>
                  <span class="disciplina-periodo">${d.periodo}º período</span>
                </div>
              `).join('') : '<p>Nenhuma disciplina cadastrada.</p>'}
            </div>
          </div>
        `;
        
        areasContainer.appendChild(areaCard);
      });
    } catch (err) {
      console.error('Erro ao renderizar áreas:', err);
      areasContainer.innerHTML = '<p class="error">Erro ao renderizar áreas de conhecimento.</p>';
    }
  }
});