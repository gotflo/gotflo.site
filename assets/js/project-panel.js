/**
 * Project detail panel.
 *
 * One dialog is reused for every project. Content is rebuilt from
 * window.PORTFOLIO_PROJECTS in the language that is currently active, so the
 * panel follows the FR/EN switch without reloading the page.
 */
(function () {
  'use strict';

  const COPY = {
    en: {
      close: 'Close',
      overview: 'Overview',
      highlights: 'What it does',
      stack: 'Built with',
      role: 'My role',
      period: 'Period',
      links: 'Links',
      demo: 'Live demo',
      demoHint: 'Simulated data, so you can see how the real interface behaves.',
      enlarge: 'Open the full screenshot',
      details: 'View details',
      previous: 'Previous project',
      next: 'Next project',
      kinds: {
        appstore: 'App Store',
        playstore: 'Google Play',
        github: 'Source on GitHub',
        website: 'Visit the site',
        download: 'Download the APK',
        video: 'Watch the walkthrough',
        architecture: 'View the architecture'
      }
    },
    fr: {
      close: 'Fermer',
      overview: 'Présentation',
      highlights: 'Ce que ça fait',
      stack: 'Réalisé avec',
      role: 'Mon rôle',
      period: 'Période',
      links: 'Liens',
      demo: 'Démonstration',
      demoHint: 'Données simulées, pour voir comment l’interface réelle se comporte.',
      enlarge: 'Ouvrir la capture en grand',
      details: 'Voir le détail',
      previous: 'Projet précédent',
      next: 'Projet suivant',
      kinds: {
        appstore: 'App Store',
        playstore: 'Google Play',
        github: 'Code sur GitHub',
        website: 'Visiter le site',
        download: 'Télécharger l’APK',
        video: 'Voir la présentation',
        architecture: 'Voir l’architecture'
      }
    }
  };

  const ICONS = {
    appstore: 'bxl-apple',
    playstore: 'bxl-play-store',
    github: 'bxl-github',
    website: 'bx-link-external',
    download: 'bx-download',
    video: 'bxl-youtube',
    architecture: 'bx-sitemap'
  };

  const panel = document.getElementById('projectPanel');
  if (!panel || !window.PORTFOLIO_PROJECTS) return;

  const dialog = panel.querySelector('.project-panel-dialog');
  const body = panel.querySelector('.project-panel-body');
  const titleEl = panel.querySelector('.project-panel-title');
  const kickerEl = panel.querySelector('.project-panel-kicker');
  const closeBtn = panel.querySelector('.project-panel-close');
  const prevBtn = panel.querySelector('.project-panel-prev');
  const nextBtn = panel.querySelector('.project-panel-next');

  let currentKey = null;
  let lastFocused = null;
  let order = [];
  let closeTimer = null;

  const lang = () => (document.documentElement.lang || 'en').startsWith('fr') ? 'fr' : 'en';
  const copy = () => COPY[lang()];
  const escape = value => String(value).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  function refreshOrder() {
    order = Array.from(document.querySelectorAll('.portfolio-item'))
      .filter(item => item.offsetParent !== null)
      .map(item => item.querySelector('[data-project]')?.getAttribute('data-project'))
      .filter(Boolean);
  }

  function linkMarkup(link, text) {
    const label = link.label?.[lang()] || text.kinds[link.kind] || link.kind;
    const icon = ICONS[link.kind] || 'bx-link';
    if (link.kind === 'architecture') {
      return `<button type="button" class="project-link" data-architecture="${escape(link.target)}">
        <i class="bx ${icon}" aria-hidden="true"></i><span>${escape(label)}</span>
      </button>`;
    }
    return `<a class="project-link" href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">
      <i class="bx ${icon}" aria-hidden="true"></i><span>${escape(label)}</span>
      <i class="bx bx-up-arrow-alt project-link-out" aria-hidden="true"></i>
    </a>`;
  }

  function render(key) {
    const project = window.PORTFOLIO_PROJECTS[key];
    if (!project) return;
    const text = copy();
    const content = project[lang()] || project.en;

    titleEl.textContent = content.title;
    kickerEl.textContent = content.kicker;

    const image = project.cover;
    const meta = [
      content.period ? `<div class="project-meta-item"><dt>${text.period}</dt><dd>${escape(content.period)}</dd></div>` : '',
      content.role ? `<div class="project-meta-item"><dt>${text.role}</dt><dd>${escape(content.role)}</dd></div>` : ''
    ].join('');

    const links = (project.links || []).map(link => linkMarkup(link, text)).join('');

    body.innerHTML = `
      <figure class="project-shot">
        <a href="${escape(image)}" class="project-shot-link glightbox-project" data-gallery="projectPanel"
           title="${escape(content.title)}" aria-label="${escape(text.enlarge)}">
          <img src="${escape(image)}" alt="${escape(content.caption || content.title)}" loading="lazy">
          <span class="project-shot-zoom"><i class="bx bx-expand-alt" aria-hidden="true"></i>${escape(text.enlarge)}</span>
        </a>
        ${content.caption ? `<figcaption>${escape(content.caption)}</figcaption>` : ''}
      </figure>

      <div class="project-section">
        <h4>${text.overview}</h4>
        <p class="project-summary">${escape(content.summary)}</p>
      </div>

      ${meta ? `<dl class="project-meta">${meta}</dl>` : ''}

      ${links ? `<div class="project-section">
        <h4>${text.links}</h4>
        <div class="project-links">${links}</div>
      </div>` : ''}

      ${project.demo ? `<div class="project-section">
        <h4>${escape(project.demoTitle?.[lang()] || text.demo)}</h4>
        ${project.demoHint === false ? '' : `<p class="project-demo-hint">${escape(project.demoHint?.[lang()] || text.demoHint)}</p>`}
        <div class="project-demo" data-demo="${escape(project.demo)}"></div>
      </div>` : ''}

      <div class="project-section">
        <h4>${text.highlights}</h4>
        <ul class="project-highlights">
          ${content.highlights.map(item => `<li>${escape(item)}</li>`).join('')}
        </ul>
      </div>

      <div class="project-section">
        <h4>${text.stack}</h4>
        <ul class="project-stack">${content.stack.map(item => `<li>${escape(item)}</li>`).join('')}</ul>
      </div>

      ${content.note ? `<p class="project-note">${escape(content.note)}</p>` : ''}
    `;

    closeBtn.setAttribute('aria-label', text.close);
    closeBtn.setAttribute('title', text.close);
    prevBtn.setAttribute('aria-label', text.previous);
    prevBtn.setAttribute('title', text.previous);
    nextBtn.setAttribute('aria-label', text.next);
    nextBtn.setAttribute('title', text.next);

    refreshOrder();
    const index = order.indexOf(key);
    prevBtn.disabled = order.length < 2;
    nextBtn.disabled = order.length < 2;
    prevBtn.dataset.target = order.length ? order[(index - 1 + order.length) % order.length] : '';
    nextBtn.dataset.target = order.length ? order[(index + 1) % order.length] : '';

    window.ProjectDemos?.mount(body.querySelector('.project-demo'));
    window.ProjectLightbox?.refresh();
  }

  function open(key, trigger) {
    if (!window.PORTFOLIO_PROJECTS[key]) return;
    // A close that is still running must not hide the panel we are reopening.
    clearTimeout(closeTimer);
    closeTimer = null;
    lastFocused = trigger || document.activeElement;
    currentKey = key;
    render(key);
    panel.hidden = false;
    document.body.classList.add('project-panel-open');
    body.scrollTop = 0;
    dialog.scrollTop = 0;
    requestAnimationFrame(() => {
      panel.classList.add('is-open');
      body.scrollTop = 0;
      closeBtn.focus({ preventScroll: true });
    });
    // The cover image settles after the panel is already on screen.
    body.querySelector('.project-shot img')?.addEventListener('load', () => {
      body.scrollTop = 0;
    }, { once: true });
    if (history.replaceState) {
      history.replaceState(null, '', '#project-' + key);
    }
  }

  function close() {
    if (panel.hidden) return;
    window.ProjectDemos?.unmount();
    panel.classList.remove('is-open');
    document.body.classList.remove('project-panel-open');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      closeTimer = null;
      panel.hidden = true;
      body.innerHTML = '';
    }, 380);
    currentKey = null;
    if (history.replaceState) {
      history.replaceState(null, '', location.pathname + location.search + '#portfolio');
    }
    lastFocused?.focus?.();
  }

  function goTo(key) {
    if (!key) return;
    currentKey = key;
    render(key);
    body.scrollTop = 0;
    dialog.scrollTop = 0;
    closeBtn.focus({ preventScroll: true });
    if (history.replaceState) {
      history.replaceState(null, '', '#project-' + key);
    }
  }

  // Opening: the details button, or any click inside a card that is not a link.
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (trigger && !event.target.closest('.portfolio-links a, .portfolio-links button')) {
      event.preventDefault();
      open(trigger.getAttribute('data-project'), trigger);
      return;
    }

    if (event.target.closest('.project-panel-close') || event.target.closest('.project-panel-backdrop')) {
      close();
      return;
    }

    const nav = event.target.closest('.project-panel-prev, .project-panel-next');
    if (nav) {
      goTo(nav.dataset.target);
      return;
    }

    const architecture = event.target.closest('[data-architecture]');
    if (architecture) {
      const target = document.querySelector(architecture.dataset.architecture);
      if (target && window.bootstrap) {
        close();
        setTimeout(() => window.bootstrap.Modal.getOrCreateInstance(target).show(), 260);
      }
    }
  });

  // Keyboard: Escape closes, Tab stays inside the dialog, arrows move between projects.
  document.addEventListener('keydown', event => {
    if (panel.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === 'ArrowLeft' && !event.target.closest('input, textarea')) {
      goTo(prevBtn.dataset.target);
      return;
    }
    if (event.key === 'ArrowRight' && !event.target.closest('input, textarea')) {
      goTo(nextBtn.dataset.target);
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = dialog.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('portfolio:languagechange', () => {
    if (currentKey) render(currentKey);
  });

  // A shared link such as /#project-cpilot opens that project straight away.
  window.addEventListener('load', () => {
    const match = /^#project-(.+)$/.exec(location.hash);
    if (match) setTimeout(() => open(decodeURIComponent(match[1])), 400);
  });
})();
