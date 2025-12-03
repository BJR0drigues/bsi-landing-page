// Configuração dos vídeos
const defaultThumb = '../fotos/image.png';

// Normalize YouTube URLs to embed format
function normalizeYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return url;

  let videoId = null;
  // Extract ID
  const m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  if (m && m[1]) videoId = m[1];

  if (!videoId) {
    const q = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    if (q && q[1]) videoId = q[1];
  }

  if (videoId) {
    // Use youtube-nocookie to avoid some local playback restrictions
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  }

  return url;
}

const VIDEO_ITEMS = [
  {
    id: 'vid-1',
    type: 'youtube',
    title: 'Depoimento - Italo',
    desc: 'Depoimentos',
    src: 'https://youtube.com/shorts/CctSxgm3EkU?si=a-lH9MnSaZP2OSyD',
    thumb: defaultThumb
  },
  {
    id: 'vid-2',
    type: 'youtube',
    title: 'Depoimento - Luis',
    desc: 'Depoimentos',
    src: 'https://youtu.be/fnkjI01ZGOY',
    thumb: defaultThumb
  },
  {
    id: 'vid-3',
    type: 'youtube',
    title: 'Depoimento - Caio',
    desc: 'Depoimentos',
    src: 'https://youtube.com/shorts/iMn0GCGS8nk?si=U2LYAU-52hkWzcGV',
    thumb: defaultThumb
  },
  {
    id: 'vid-4',
    type: 'youtube',
    title: 'Depoimento - Brayan',
    desc: 'Depoimentos',
    src: 'https://youtube.com/shorts/pWoFdaQ9VhQ?feature=share',
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
    iframe.src = normalizeYouTubeUrl(item.src);
    iframe.title = item.title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    // Removed referrerPolicy as it can block local file playback
    iframe.allowFullscreen = true;
    playerEl.appendChild(iframe);
  } else if (item.type === 'mp4') {
    // ... (mp4 logic)
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

    // Use hqdefault for thumbnails as it is safer
    const thumbUrl = `https://i.ytimg.com/vi/${getYouTubeID(it.src)}/hqdefault.jpg`;

    li.innerHTML = `
      <div class="video-thumb">
        <img src="${thumbUrl}" alt="${it.title}" onerror="this.onerror=null;this.src='${defaultThumb}';">
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

// Helper needed for thumbnail generation in renderCarousel
function getYouTubeID(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : '';
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