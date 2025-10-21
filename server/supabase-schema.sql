-- Tabela para áreas de conhecimento
CREATE TABLE areas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  icone TEXT,
  cor TEXT,
  descricao TEXT
);

-- Tabela para professores
CREATE TABLE professores (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  area_id INTEGER REFERENCES areas(id)
);

-- Tabela para disciplinas
CREATE TABLE disciplinas (
  id SERIAL PRIMARY KEY,
  codigo TEXT NOT NULL,
  nome TEXT NOT NULL,
  periodo INTEGER NOT NULL,
  carga_teorica INTEGER NOT NULL,
  carga_pratica INTEGER NOT NULL,
  descricao TEXT,
  pre_requisitos TEXT,
  area_id INTEGER REFERENCES areas(id),
  professor_id INTEGER REFERENCES professores(id)
);

-- Inserir áreas de conhecimento
INSERT INTO areas (nome, icone, cor, descricao) VALUES
('Programação', '💻', '#4285F4', 'A área de Programação engloba o desenvolvimento de software, algoritmos, estruturas de dados e paradigmas de programação.'),
('Banco de Dados', '🗃️', '#DB4437', 'A área de Banco de Dados foca no armazenamento, organização, recuperação e manipulação eficiente de dados.'),
('Redes de Computadores', '🌐', '#F4B400', 'A área de Redes de Computadores aborda a infraestrutura e os protocolos de comunicação entre sistemas.'),
('Engenharia de Software', '🔧', '#0F9D58', 'A Engenharia de Software se concentra nos métodos e processos para desenvolvimento de sistemas de software.'),
('Matemática', '📊', '#9C27B0', 'A área de Matemática fornece a base teórica e as ferramentas quantitativas necessárias para a computação.'),
('Teoria da Computação', '🧠', '#795548', 'Estudo dos modelos teóricos de computação e dos limites fundamentais do que pode ser computado.'),
('Extensão', '🤝', '#607D8B', 'Atividades que integram o conhecimento acadêmico com as demandas da comunidade.'),
('Hardware', '💾', '#FF5722', 'Estudo dos componentes físicos e da organização dos sistemas computacionais.'),
('Comunicação', '📝', '#9E9E9E', 'Desenvolvimento de habilidades de comunicação escrita e oral para o ambiente profissional.');

-- Inserir professores (com base nos fornecidos)
INSERT INTO professores (nome, area_id) VALUES
('Janilson Pereira do Nascimento', 5), -- Matemática (Probabilidade e Estatística)
('Sandir Rodrigues Campos', 7), -- Extensão (Atividades Extensionistas IV)
('Sandir Rodrigues Campos', 2), -- Banco de Dados (Introdução a Banco de Dados)
('Juliana Alves Vieira', 6), -- Teoria da Computação (Linguagens Formais e Autômatos)
('Romes Heriberto Pires de Araújo', 1), -- Programação (Linguagem Programação Avançada)
('João Pedro Ferreira Gress', 3); -- Redes (Introdução a Redes de Computadores)

-- Inserir algumas disciplinas (como exemplo)
INSERT INTO disciplinas (codigo, nome, periodo, carga_teorica, carga_pratica, area_id, professor_id, descricao, pre_requisitos) VALUES
('BSI001', 'Atividades Extensionistas I', 1, 100, 0, 7, NULL, 'Atividades práticas de extensão universitária.', NULL),
('BSI002', 'Cálculo Diferencial e Integral', 1, 60, 0, 5, NULL, 'Limites, derivadas e integrais de funções de uma variável.', NULL),
('BSI003', 'Introdução a Lógica de Programação', 1, 60, 0, 1, NULL, 'Conceitos básicos de algoritmos e programação estruturada.', NULL),
('BSI004', 'Introdução e Organização de Computadores', 1, 60, 0, 8, NULL, 'Conceitos básicos de organização e arquitetura de computadores.', NULL),
('BSI005', 'Lógica Matemática', 1, 60, 0, 5, NULL, 'Lógica proposicional, tabelas-verdade e lógica de predicados.', NULL),
('BSI006', 'Português Instrumental', 1, 60, 0, 9, NULL, 'Produção e interpretação de textos técnicos e científicos.', NULL),
('BSI025', 'Atividades Extensionistas IV', 4, 100, 0, 7, 2, 'Atividades práticas de extensão universitária.', 'Atividades Extensionistas III'),
('BSI026', 'Introdução a Banco de Dados', 4, 60, 0, 2, 3, 'Conceitos básicos de bancos de dados e modelagem de dados.', NULL),
('BSI027', 'Introdução a Redes de Computadores', 4, 60, 0, 3, 6, 'Fundamentos de redes de computadores e protocolos de comunicação.', NULL),
('BSI028', 'Linguagem Programação Avançada', 4, 60, 0, 1, 5, 'Conceitos avançados de programação e desenvolvimento de aplicações.', 'Programação Orientada a Objetos'),
('BSI029', 'Linguagens Formais e Autômatos', 4, 60, 0, 6, 4, 'Teoria de linguagens formais, autômatos e expressões regulares.', NULL),
('BSI030', 'Probabilidade e Estatística', 4, 60, 0, 5, 1, 'Conceitos de probabilidade, estatística descritiva e inferencial.', NULL);