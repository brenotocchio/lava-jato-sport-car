/* Lava Jato Sport Car – scripts do site */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Configuração ---------- */
  const WA_MAIN = '5518997274334';
  const ADDRESS = 'R. América do Sul, 761, Vila Carvalho, Araçatuba - SP, 16025-300';
  // Se tiver o link direto do Perfil da Empresa no Google, coloque aqui:
  const REVIEWS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Lava Jato Sport Car, ' + ADDRESS);
  const DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(ADDRESS);

  const SERVICES = [
    { ic: 'i-car',   t: 'Lavagem de carros, motos, caminhões e tratores', d: 'Do carro do dia a dia ao trator da lida: estrutura para veículos de todos os portes.' },
    { ic: 'i-drop',  t: 'Lavagem simples e completa', d: 'A simples para manter em dia; a completa com detalhamento por dentro e por fora.' },
    { ic: 'i-spark', t: 'Polimento e cristalização', d: 'Remove a opacidade e riscos superficiais e sela a pintura com brilho e proteção.' },
    { ic: 'i-tag',   t: 'Preparação de carros', d: 'Deixe o carro pronto para vender mais rápido e melhor, ou para brilhar no evento.' },
    { ic: 'i-seat',  t: 'Limpeza de bancos, carpetes e tapeçaria', d: 'Tira manchas, sujeira e odores de bancos, carpetes e forros.' },
    { ic: 'i-leaf',  t: 'Hidratação de bancos de couro', d: 'Couro macio, sem ressecar nem rachar, com aspecto de novo.' },
    { ic: 'i-wind',  t: 'Higienização de ar-condicionado', d: 'Acaba com o cheiro ruim e com fungos e bactérias do sistema de ar.' },
    { ic: 'i-light', t: 'Polimento de faróis', d: 'Faróis amarelados de volta ao transparente: mais visual e mais segurança à noite.' },
    { ic: 'i-truck', t: 'Busca e entrega do veículo', d: 'Sem tempo? A gente busca e devolve o seu veículo.', note: 'Sujeito a disponibilidade: confirme pelo WhatsApp.' }
  ];

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const waLink = (msg, num = WA_MAIN) => 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);

  /* ---------- Cards de serviço ---------- */
  const grid = document.getElementById('services-grid');
  if (grid) {
    grid.innerHTML = SERVICES.map((s) => `
      <article class="svc reveal">
        <span class="svc-ic"><svg class="ic" aria-hidden="true"><use href="#${s.ic}"/></svg></span>
        <h3>${esc(s.t)}</h3>
        <p>${esc(s.d)}</p>
        ${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}
        <a class="btn" href="#" data-wa="${esc('Olá! Vim pelo site e quero agendar: ' + s.t + '.')}">
          <svg class="ic" aria-hidden="true"><use href="#i-wa"/></svg> Agendar pelo WhatsApp
        </a>
      </article>`).join('');
  }

  /* ---------- Links (WhatsApp, avaliações, rota) ---------- */
  document.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = waLink(a.dataset.wa, a.dataset.num || WA_MAIN);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('[data-reviews]').forEach((a) => { a.href = REVIEWS_URL; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-directions]').forEach((a) => { a.href = DIRECTIONS_URL; a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- Imagens: mostra marcador enquanto não houver foto ---------- */
  const markEmpty = (img) => img.closest('.ph')?.classList.add('empty');
  document.querySelectorAll('.ph img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) markEmpty(img);
    img.addEventListener('error', () => markEmpty(img));
  });
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) {
    const ok = () => heroPhoto.closest('.hero-art').classList.add('has-photo');
    if (heroPhoto.complete && heroPhoto.naturalWidth > 0) ok();
    heroPhoto.addEventListener('load', ok);
  }

  /* ---------- Menu mobile ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  if (menuBtn && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- Sombra do topo ao rolar ---------- */
  const top = document.querySelector('.top');
  const onScroll = () => top && top.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Antes e depois ---------- */
  const ba = document.querySelector('.ba');
  const range = document.getElementById('ba-range');
  if (ba && range) {
    const set = (v) => ba.style.setProperty('--pos', v + '%');
    range.addEventListener('input', () => set(range.value));
    set(range.value);
  }

  /* ---------- Aberto agora (horário de Araçatuba) ---------- */
  const openEl = document.querySelector('[data-open]');
  const updateOpen = () => {
    let day = 0, hour = 0, min = 0;
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t)?.value;
      day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      hour = Number(get('hour'));
      min = Number(get('minute'));
    } catch (err) {
      const d = new Date(); day = d.getDay(); hour = d.getHours(); min = d.getMinutes();
    }
    const weekday = day >= 1 && day <= 5;
    const mins = hour * 60 + min;
    const open = weekday && mins >= 480 && mins < 1080;
    if (openEl) {
      openEl.textContent = open ? 'Aberto agora' : 'Fechado agora';
      openEl.classList.toggle('on', open);
    }
    const row = document.querySelector('.hours tr[data-day]');
    const rows = document.querySelectorAll('.hours tbody tr');
    rows.forEach((r) => r.classList.remove('today'));
    (weekday ? row : rows[rows.length - 1])?.classList.add('today');
  };
  updateOpen();
  setInterval(updateOpen, 60000);

  /* ---------- Formulário de agendamento ---------- */
  const form = document.getElementById('booking');
  if (form) {
    const sel = form.querySelector('#f-serv');
    sel.innerHTML = SERVICES.map((s) => `<option>${esc(s.t)}</option>`).join('');
    const date = form.querySelector('#f-data');
    const today = new Date();
    date.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const msg = form.querySelector('.form-msg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      if (!nome) {
        form.nome.setAttribute('aria-invalid', 'true');
        msg.textContent = 'Informe seu nome para continuar.';
        form.nome.focus();
        return;
      }
      form.nome.removeAttribute('aria-invalid');
      let dia = 'a combinar';
      if (form.data.value) {
        const [y, m, d] = form.data.value.split('-');
        dia = `${d}/${m}/${y}`;
        const wd = new Date(+y, +m - 1, +d).getDay();
        if (wd === 0 || wd === 6) {
          msg.textContent = 'Atendemos de segunda a sexta. Escolha um dia útil.';
          form.data.focus();
          return;
        }
      }
      const text = [
        `Olá! Sou ${nome} e vim pelo site.`,
        `Quero agendar: ${form.servico.value}`,
        `Veículo: ${form.veiculo.value}`,
        `Dia: ${dia} · Período: ${form.periodo.value}`,
        form.busca.checked ? 'Gostaria de busca e entrega.' : ''
      ].filter(Boolean).join('\n');
      const url = waLink(text);
      msg.innerHTML = 'Abrindo o WhatsApp… Se não abrir, <a href="' + esc(url) + '" target="_blank" rel="noopener">toque aqui</a>.';
      let w = null;
      try { w = window.open(url, '_blank'); if (w) w.opener = null; } catch (err) { w = null; }
      if (!w) { try { window.location.href = url; } catch (err) { /* o link acima resolve */ } }
    });
  }

  /* ---------- Revelação suave ao rolar ---------- */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => revealObs.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
