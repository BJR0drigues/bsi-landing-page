# ConectaBSI - Redesign da Landing Page do Bacharelado em Sistemas de Informação

![Status](https://img.shields.io/badge/Status-Active-success)
![ConectaBSI Hero](/fotos/image.png)

## 🚀 Sobre o Projeto

Este projeto é um redesign completo da Landing Page do curso de **Bacharelado em Sistemas de Informação (BSI)**. O objetivo foi criar uma interface moderna, atraente e funcional, focada em atrair estudantes do ensino médio e fornecer informações claras sobre o curso.

O design adota uma estética **"High-Tech" e "Dark Mode"**, utilizando cores vibrantes (neon), efeitos de vidro (glassmorphism) e tipografia moderna para refletir a inovação e a tecnologia que permeiam o curso.

---

## ✨ Funcionalidades Principais

### 1. 🏠 Página Inicial (Landing Page)
- **Hero Section Dinâmica:** Uma apresentação impactante com gradientes e chamadas para ação claras.
- **Estatísticas do Curso:** Dados rápidos sobre empregabilidade, salários e duração.
- **Diferenciais:** Cards com ícones destacando os pontos fortes do curso (Mercado, Inovação, Prática).
- **Trilha de Carreira:** Um visualizador passo-a-passo do que o aluno pode esperar desde o 1º período até a formatura.

### 2. 🎥 Apresentação (O Curso)
- **Player de Vídeo Robusto:** Uma galeria de vídeos funcional com:
    - **Suporte a YouTube Shorts e Vídeos Normais.**
    - **Correção de Erro 153:** Implementação inteligente usando `youtube-nocookie` para garantir a reprodução mesmo em ambientes locais.
    - **Carrossel Interativo:** Navegação fácil entre os depoimentos de alunos e tours pelos laboratórios.
- **Depoimentos Reais:** Vídeos de alunos (Italo, Luis, Caio, Brayan) compartilhando suas experiências.

### 3. 📚 Matriz Curricular Interativa
- **Visualização Completa:** Lista de todas as disciplinas do 1º ao 8º período.
- **Sistema de Filtros:**
    - **Por Período:** Botões rápidos para ver disciplinas de um semestre específico.
    - **Por Área:** Filtro dropdown para ver matérias de "Programação", "Matemática", "Gestão", etc.
    - **Busca em Tempo Real:** Barra de pesquisa para encontrar disciplinas pelo nome.
- **Layout em Cards:** Design limpo mostrando carga horária e pré-requisitos.

### 4. 🎮 Áreas de Atuação (Gamificação)
- **Conceito "Choose Your Class":** Uma seção inspirada em RPGs onde o aluno escolhe sua "classe" (carreira).
- **Cards 3D Flip:** Cartões interativos que giram ao passar o mouse, revelando detalhes sobre carreiras como:
    - **Full Stack Developer**
    - **Data Scientist**
    - **Cybersecurity Specialist**
    - **Product Manager**
- **Barras de Habilidade:** Visualização gráfica das skills necessárias para cada área.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura acessível e otimizada para SEO.
- **CSS3 Moderno:**
    - **CSS Variables:** Para gerenciamento consistente de cores e temas.
    - **Flexbox & Grid:** Para layouts responsivos e complexos.
    - **Glassmorphism:** Efeitos de transparência e desfoque.
    - **Animações CSS:** Transições suaves e efeitos de hover.
- **JavaScript (ES6+):**
    - Lógica de filtragem dinâmica (Matriz Curricular).
    - Manipulação de DOM para o Player de Vídeo e Carrossel.
    - Tratamento de erros e fallbacks para APIs externas (YouTube).
- **Google Fonts:** Tipografia com 'Inter' (leitura) e 'Press Start 2P' (detalhes gamer).

---

## 🔧 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/BJR0drigues/bsi-landing-page.git
   ```
2. **Navegue até a pasta:**
   ```bash
   cd bsi-landing-page
   ```
3. **Abra o projeto:**
   Basta abrir o arquivo `index.html` em qualquer navegador moderno.
   *Recomendação: Use uma extensão como "Live Server" no VS Code para a melhor experiência.*

---

## 🎨 Design System

O projeto segue um Design System próprio definido em `css/style.css`:

- **Cores Primárias:** Indigo (`#6366f1`) e Violeta (`#8b5cf6`).
- **Fundo:** Dark Navy (`#0f172a`) para profundidade e conforto visual.
- **Acentos:** Ciano e Rosa Neon para destaques e interações.

---

## 📝 Créditos

Desenvolvido como parte do projeto de revitalização da identidade visual do curso de BSI.
**Desenvolvedor:** Brayan J. Rodrigues
**Design:** Baseado em tendências modernas de UI/UX para produtos digitais.
