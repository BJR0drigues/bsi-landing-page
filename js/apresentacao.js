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
    id: 'vid-new-1',
    type: 'youtube',
    title: 'Depoimento - Dylan',
    desc: 'Depoimentos',
    src: 'https://youtube.com/shorts/WZNtmpZ9Zuo?si=H_N78X93iirRHFES',
    thumb: defaultThumb
  },
  {
    id: 'vid-new-2',
    type: 'youtube',
    title: 'Depoimento - Aluno',
    desc: 'Depoimentos',
    src: 'https://youtube.com/shorts/5Wis1WSoKU8?si=p6Rh2DBg92DIdOSN',
    thumb: defaultThumb
  },
  {
    id: 'vid-4',
    type: 'youtube',
    title: 'Depoimento - Brayan',
    desc: 'Depoimentos',
    src: 'https://youtube.com/shorts/pWoFdaQ9VhQ?feature=share',
    thumb: defaultThumb
  },
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
    id: 'vid-5',
    type: 'youtube',
    title: 'Depoimento - Breno',
    desc: 'Depoimentos',
    src: 'https://youtube.com/shorts/98aN-AAFD6E',
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

// AI Chat Logic
const CHAT_DATA = {
  questions: [
    { id: 'q1', text: 'Qual a duração do curso?', answer: 'O curso de BSI tem duração de 4 anos (8 semestres).' },
    { id: 'q2', text: 'Qual o valor da mensalidade?', answer: 'O curso é presencial e oferecido por uma instituição pública, portanto é 100% gratuito!' },
    { id: 'q3', text: 'Tem estágio obrigatório?', answer: 'Sim, o estágio supervisionado é obrigatório e pode ser realizado a partir do 5º período.' },
    { id: 'q4', text: 'Quais as áreas de atuação?', answer: 'Você pode atuar como Desenvolvedor, Analista de Dados, Gerente de Projetos, UX Designer, entre outras áreas.' }
  ]
};

const chatMessages = document.getElementById('chat-messages');
const quickQuestions = document.getElementById('quick-questions');

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.innerHTML = `<p>${text}</p>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleQuestion(qId) {
  const question = CHAT_DATA.questions.find(q => q.id === qId);
  if (!question) return;

  // Add user message
  addMessage(question.text, 'user');

  // Simulate typing delay
  setTimeout(() => {
    addMessage(question.answer, 'bot');
  }, 1000);
}

function initChat() {
  if (!quickQuestions) return;

  CHAT_DATA.questions.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'quick-btn';
    btn.textContent = q.text;
    btn.onclick = () => handleQuestion(q.id);
    quickQuestions.appendChild(btn);
  });
}

// Initialize Chat
document.addEventListener('DOMContentLoaded', initChat);