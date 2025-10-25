// Configuração dos vídeos (exemplos). Substitua/adicione conforme necessário.
// Observações:
// - Paths absolutos (começando com /bsi-landing-page/...) podem falhar quando a página
//   for aberta localmente (file://) ou quando o base path do servidor for diferente.
// - Usamos caminhos relativos e um fallback de thumb para evitar imagens quebradas.
// Use a real file that exists in the repo as a default thumbnail
const defaultThumb = '../fotos/image.png';

// Normalize várias formatos de URL do YouTube para a URL de incorporação usada em iframes.
function normalizeYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return url;
  // Tente extrair um ID de YouTube de 11 caracteres de formatos de URL comuns
  const m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
  // If the URL is in the short youtu.be?vless form or contains v= with extra params, try fallback
  const q = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (q && q[1]) return `https://www.youtube.com/embed/${q[1]}`;
  // No match: return original URL (may still work)
  return url;
}
const VIDEO_ITEMS = [
  {
    id: 'yt-intro',
    type: 'youtube',
    title: 'Visão Geral',
    desc: 'Falando a respeito do curso e site.',
    src: 'https://youtu.be/pWoFdaQ9VhQ',
    // thumb: use default placeholder (substitua por uma real em ../img/thumbs/...)
    thumb:'../fotos/obraya.jfif'
  },
  {
    id: 'local-depo',
    type: 'youtube',
    title: 'Depoimento — Breno',
    desc: 'Falando um pouco sobre o curso de BSI.',
    // para shorts use o formato embed
    src: 'https://www.youtube.com/embed/98aN-AAFD6E',
    poster: '../fotos/brenao.jfif',
    thumb: '../fotos/brenao.jfif'
  },
  {
    id: 'yt-labs',
    type: 'youtube',
    title: 'Estrutura de Laboratórios',
    desc: 'Conheça os espaços e recursos para aulas práticas.',
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumb: defaultThumb
  },
  {
    id: 'yt-extensao',
    type: 'youtube',
    title: 'Projetos e Extensão',
    desc: 'Iniciativas, eventos e comunidade do curso.',
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumb: defaultThumb
  }
];

const playerEl = document.getElementById('video-player');
const trackEl = document.getElementById('carousel-track');
const viewportEl = document.getElementById('carousel-viewport');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

let currentId = VIDEO_ITEMS[0]?.id || null;

function renderPlayer(item) {
  if (!item) return;
  playerEl.innerHTML = '';
  if (item.type === 'youtube') {
    const iframe = document.createElement('iframe');
    // normalize to embed URL when possible
    iframe.src = normalizeYouTubeUrl(item.src);
    iframe.title = item.title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    playerEl.appendChild(iframe);
  } else if (item.type === 'mp4') {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    if (item.poster) video.poster = item.poster;
    const source = document.createElement('source');
    source.src = item.src;
    source.type = 'video/mp4';
    video.appendChild(source);
    playerEl.appendChild(video);
  }
}

function renderCarousel(items) {
  trackEl.innerHTML = '';
  items.forEach((it) => {
    const li = document.createElement('li');
    li.className = 'video-card';
    li.role = 'listitem';
    li.tabIndex = 0;
    li.dataset.videoId = it.id;

    const isActive = it.id === currentId;
    if (isActive) li.setAttribute('aria-current', 'true');

    li.innerHTML = `
      <div class="video-thumb">
        <img src="${it.thumb || defaultThumb}" alt="${it.title}" onerror="this.onerror=null;this.src='${defaultThumb}';">
      </div>
      <div class="video-meta">
        <h3 class="video-title">${it.title}</h3>
        <p class="video-desc">${it.desc || ''}</p>
      </div>
    `;

    const activate = () => {
      if (currentId === it.id) return;
      currentId = it.id;
      document.querySelectorAll('.video-card[aria-current="true"]').forEach((el) => el.removeAttribute('aria-current'));
      li.setAttribute('aria-current', 'true');
      renderPlayer(it);
    };

    li.addEventListener('click', activate);
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });

    trackEl.appendChild(li);
  });
}

function getActiveIndex() {
  return VIDEO_ITEMS.findIndex(v => v.id === currentId);
}

function scrollToIndex(idx) {
  const itemWidth = trackEl.querySelector('.video-card')?.getBoundingClientRect().width || 0;
  const gap = parseFloat(getComputedStyle(trackEl).columnGap || 12);
  viewportEl.scrollTo({ left: (itemWidth + gap) * Math.max(0, idx), behavior: 'smooth' });
}

function updateNavButtons() {
  // Navegação infinita não-estrita; mantemos botões sempre habilitados para UX suave.
  prevBtn.disabled = false;
  nextBtn.disabled = false;
}

prevBtn?.addEventListener('click', () => {
  const idx = getActiveIndex();
  const prevIdx = (idx - 1 + VIDEO_ITEMS.length) % VIDEO_ITEMS.length;
  const target = VIDEO_ITEMS[prevIdx];
  currentId = target.id;
  renderPlayer(target);
  document.querySelectorAll('.video-card[aria-current="true"]').forEach((el) => el.removeAttribute('aria-current'));
  const li = [...trackEl.children].find(el => el.dataset.videoId === target.id);
  li?.setAttribute('aria-current', 'true');
  scrollToIndex(prevIdx);
  updateNavButtons();
});

nextBtn?.addEventListener('click', () => {
  const idx = getActiveIndex();
  const nextIdx = (idx + 1) % VIDEO_ITEMS.length;
  const target = VIDEO_ITEMS[nextIdx];
  currentId = target.id;
  renderPlayer(target);
  document.querySelectorAll('.video-card[aria-current="true"]').forEach((el) => el.removeAttribute('aria-current'));
  const li = [...trackEl.children].find(el => el.dataset.videoId === target.id);
  li?.setAttribute('aria-current', 'true');
  scrollToIndex(nextIdx);
  updateNavButtons();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// Inicialização
(function init() {
  if (!VIDEO_ITEMS.length) return;
  renderPlayer(VIDEO_ITEMS[0]);
  renderCarousel(VIDEO_ITEMS);
  updateNavButtons();
})();