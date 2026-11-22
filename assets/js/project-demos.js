/**
 * Small interactive demos shown inside the project panel.
 *
 * They run on generated data so a visitor can see how each interface behaves
 * without the hardware or an account. Everything stops as soon as the panel
 * closes or the browser tab goes to the background.
 */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isFrench = () => (document.documentElement.lang || 'en').startsWith('fr');
  const pick = (en, fr) => (isFrench() ? fr : en);

  let active = null;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setupCanvas(canvas) {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || canvas.parentElement.clientWidth || 600;
    const height = parseFloat(canvas.dataset.height) || 150;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { ctx, width, height };
  }

  function cssVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  /* ---------------------------------------------------------------- C-PILOT */

  function cpilotDemo(container) {
    const scenarios = {
      cruise: {
        label: pick('Cruise', 'Croisière'),
        bpm: 71, rr: 845, calm: 64, focus: 68, workload: 0.38, temp: 33.4, gaze: 0.12, bands: [7.1, 5.0, 9.4, 5.6, 3.0]
      },
      turbulence: {
        label: pick('Turbulence', 'Turbulence'),
        bpm: 94, rr: 638, calm: 38, focus: 81, workload: 0.74, temp: 34.3, gaze: 0.34, bands: [5.8, 4.2, 6.1, 8.9, 4.6]
      },
      approach: {
        label: pick('Approach', 'Approche'),
        bpm: 86, rr: 698, calm: 46, focus: 89, workload: 0.63, temp: 33.9, gaze: 0.22, bands: [6.0, 4.6, 7.0, 8.1, 4.1]
      }
    };

    const sensors = [
      { key: 'eeg', name: 'Neurosity Crown', detail: 'EEG' },
      { key: 'ecg', name: 'Polar H10', detail: pick('ECG and RR', 'ECG et RR') },
      { key: 'ppg', name: 'Polar Verity', detail: 'PPG' },
      { key: 'thermal', name: 'FLIR Lepton', detail: pick('Thermal', 'Thermique') },
      { key: 'gaze', name: 'Gazepoint', detail: pick('Eye tracking', 'Suivi oculaire') }
    ];

    container.innerHTML = `
      <div class="demo demo-cpilot">
        <div class="demo-toolbar" role="group" aria-label="${pick('Flight phase', 'Phase de vol')}">
          ${Object.entries(scenarios).map(([key, value], index) => `
            <button type="button" class="demo-chip${index === 0 ? ' is-active' : ''}" data-scenario="${key}">${value.label}</button>
          `).join('')}
          <button type="button" class="demo-chip demo-play" data-play aria-pressed="true">
            <i class="bx bx-pause" aria-hidden="true"></i><span>${pick('Pause', 'Pause')}</span>
          </button>
        </div>

        <ul class="demo-sensors">
          ${sensors.map(sensor => `
            <li><span class="demo-dot" aria-hidden="true"></span>
              <strong>${sensor.name}</strong><span>${sensor.detail}</span></li>
          `).join('')}
        </ul>

        <div class="demo-grid">
          <div class="demo-card demo-card-wide">
            <div class="demo-card-head"><span>${pick('Cardiac signal', 'Signal cardiaque')}</span>
              <span class="demo-live">${pick('live', 'direct')}</span></div>
            <canvas class="demo-canvas" data-height="110" data-role="ecg"></canvas>
            <div class="demo-readouts">
              <div><span data-value="bpm">--</span><small>BPM</small></div>
              <div><span data-value="rr">--</span><small>${pick('RR interval', 'Intervalle RR')}</small></div>
              <div><span data-value="temp">--</span><small>${pick('Face temp.', 'Temp. visage')}</small></div>
            </div>
          </div>

          <div class="demo-card">
            <div class="demo-card-head"><span>${pick('Brain activity', 'Activité cérébrale')}</span></div>
            <div class="demo-bands" data-role="bands">
              ${['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma'].map(name => `
                <div class="demo-band"><i style="height:10%"></i><small>${name}</small></div>
              `).join('')}
            </div>
          </div>

          <div class="demo-card">
            <div class="demo-card-head"><span>${pick('Gaze', 'Regard')}</span></div>
            <div class="demo-gaze" data-role="gaze"><span class="demo-gaze-dot"></span></div>
          </div>

          <div class="demo-card demo-card-wide">
            <div class="demo-card-head"><span>${pick('Research estimates', 'Estimations de recherche')}</span></div>
            <div class="demo-meters">
              ${[['calm', pick('Calm', 'Calme')], ['focus', pick('Focus', 'Concentration')], ['workload', pick('Workload', 'Charge de travail')]]
                .map(([key, label]) => `
                  <div class="demo-meter"><span>${label}</span>
                    <i><b data-meter="${key}" style="width:0%"></b></i>
                    <em data-value="${key}">--</em></div>
                `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('[data-role="ecg"]');
    const gazeDot = container.querySelector('.demo-gaze-dot');
    const bands = Array.from(container.querySelectorAll('.demo-band i'));
    const values = {};
    container.querySelectorAll('[data-value]').forEach(el => { values[el.dataset.value] = el; });
    const meters = {};
    container.querySelectorAll('[data-meter]').forEach(el => { meters[el.dataset.meter] = el; });

    let target = scenarios.cruise;
    const state = { bpm: 71, rr: 845, calm: 64, focus: 68, workload: 0.38, temp: 33.4, bands: [...target.bands] };
    let frame = 0;
    let running = !reduceMotion.matches;
    let raf = null;
    let surface = setupCanvas(canvas);
    const trace = new Array(Math.round(surface.width)).fill(0);

    const onResize = () => {
      surface = setupCanvas(canvas);
      trace.length = Math.round(surface.width);
      trace.fill(0);
    };
    window.addEventListener('resize', onResize, { passive: true });

    function beat(phase) {
      // A readable ECG-like shape rather than a sine wave.
      if (phase < 0.08) return 0.12 * Math.sin((phase / 0.08) * Math.PI);
      if (phase < 0.16) return 0;
      if (phase < 0.19) return -0.22;
      if (phase < 0.23) return 1;
      if (phase < 0.27) return -0.35;
      if (phase < 0.42) return 0;
      if (phase < 0.56) return 0.26 * Math.sin(((phase - 0.42) / 0.14) * Math.PI);
      return 0;
    }

    function draw() {
      const { ctx, width, height } = surface;
      ctx.clearRect(0, 0, width, height);

      const grid = cssVar('--border-glass', 'rgba(255,255,255,0.1)');
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i += 1) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = cssVar('--accent-pink', '#ec4899');
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      const mid = height * 0.62;
      const amplitude = height * 0.34;
      for (let x = 0; x < trace.length; x += 1) {
        const y = mid - trace[x] * amplitude;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function step() {
      if (running) {
        frame += 1;
        const ease = 0.045;
        state.bpm += (target.bpm - state.bpm) * ease;
        state.rr += (target.rr - state.rr) * ease;
        state.calm += (target.calm - state.calm) * ease;
        state.focus += (target.focus - state.focus) * ease;
        state.workload += (target.workload - state.workload) * ease;
        state.temp += (target.temp - state.temp) * ease;
        target.bands.forEach((value, i) => { state.bands[i] += (value - state.bands[i]) * ease; });

        const samplesPerBeat = Math.max(18, Math.round(3600 / state.bpm));
        const phase = (frame % samplesPerBeat) / samplesPerBeat;
        trace.shift();
        trace.push(beat(phase) + (Math.random() - 0.5) * 0.02);
        draw();

        const jitter = () => (Math.random() - 0.5);
        values.bpm.textContent = Math.round(state.bpm + jitter() * 2);
        values.rr.textContent = Math.round(state.rr + jitter() * 18) + ' ms';
        values.temp.textContent = (state.temp + jitter() * 0.1).toFixed(1) + ' °C';
        values.calm.textContent = Math.round(state.calm);
        values.focus.textContent = Math.round(state.focus);
        values.workload.textContent = state.workload.toFixed(2);
        meters.calm.style.width = clamp(state.calm, 0, 100) + '%';
        meters.focus.style.width = clamp(state.focus, 0, 100) + '%';
        meters.workload.style.width = clamp(state.workload * 100, 0, 100) + '%';

        bands.forEach((bar, i) => {
          bar.style.height = clamp((state.bands[i] / 12) * 100, 6, 100) + '%';
        });

        const spread = target.gaze;
        const x = 50 + Math.sin(frame / 34) * 26 * spread * 3 + jitter() * 4;
        const y = 50 + Math.cos(frame / 23) * 22 * spread * 3 + jitter() * 4;
        gazeDot.style.left = clamp(x, 6, 94) + '%';
        gazeDot.style.top = clamp(y, 8, 92) + '%';
      }
      raf = requestAnimationFrame(step);
    }

    container.addEventListener('click', event => {
      const scenarioBtn = event.target.closest('[data-scenario]');
      if (scenarioBtn) {
        container.querySelectorAll('[data-scenario]').forEach(b => b.classList.toggle('is-active', b === scenarioBtn));
        target = scenarios[scenarioBtn.dataset.scenario];
        return;
      }
      const playBtn = event.target.closest('[data-play]');
      if (playBtn) {
        running = !running;
        playBtn.setAttribute('aria-pressed', String(running));
        playBtn.querySelector('i').className = running ? 'bx bx-pause' : 'bx bx-play';
        playBtn.querySelector('span').textContent = running
          ? pick('Pause', 'Pause')
          : pick('Play', 'Lecture');
      }
    });

    if (reduceMotion.matches) {
      const playBtn = container.querySelector('[data-play]');
      playBtn.setAttribute('aria-pressed', 'false');
      playBtn.querySelector('i').className = 'bx bx-play';
      playBtn.querySelector('span').textContent = pick('Play', 'Lecture');
    }

    draw();
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }

  /* -------------------------------------------------------------- Neurosity */

  function neurosityDemo(container) {
    const states = {
      rest: { label: pick('At rest', 'Au repos'), calm: 74, focus: 42, bands: [8.4, 6.1, 11.2, 4.2, 2.4], noise: 0.5 },
      task: { label: pick('Focused task', 'Tâche concentrée'), calm: 44, focus: 83, bands: [5.1, 4.0, 6.2, 9.4, 4.4], noise: 0.9 },
      noisy: { label: pick('Distraction', 'Distraction'), calm: 31, focus: 36, bands: [9.2, 7.8, 5.4, 6.1, 5.2], noise: 1.6 }
    };
    const channels = ['CP3', 'C3', 'F5', 'PO3', 'PO4', 'F6', 'C4', 'CP4'];

    container.innerHTML = `
      <div class="demo demo-neurosity">
        <div class="demo-toolbar" role="group" aria-label="${pick('Mental state', 'État mental')}">
          ${Object.entries(states).map(([key, value], index) => `
            <button type="button" class="demo-chip${index === 0 ? ' is-active' : ''}" data-state="${key}">${value.label}</button>
          `).join('')}
          <button type="button" class="demo-chip demo-play" data-play aria-pressed="true">
            <i class="bx bx-pause" aria-hidden="true"></i><span>${pick('Pause', 'Pause')}</span>
          </button>
        </div>

        <div class="demo-grid demo-grid-two">
          <div class="demo-card demo-rings">
            ${[['calm', pick('Calm', 'Calme')], ['focus', pick('Focus', 'Concentration')]].map(([key, label]) => `
              <div class="demo-ring">
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle class="demo-ring-track" cx="60" cy="60" r="50"></circle>
                  <circle class="demo-ring-value demo-ring-${key}" cx="60" cy="60" r="50" data-ring="${key}"></circle>
                </svg>
                <strong data-value="${key}">0%</strong>
                <small>${label}</small>
              </div>
            `).join('')}
          </div>

          <div class="demo-card">
            <div class="demo-card-head"><span>${pick('Frequency bands', 'Bandes de fréquence')}</span></div>
            <div class="demo-bands">
              ${['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma'].map(name => `
                <div class="demo-band"><i style="height:10%"></i><small>${name}</small></div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="demo-card">
          <div class="demo-card-head"><span>${pick('Raw EEG, eight channels', 'EEG brut, huit voies')}</span>
            <span class="demo-live">256 Hz</span></div>
          <canvas class="demo-canvas" data-height="210" data-role="eeg"></canvas>
        </div>
      </div>
    `;

    const canvas = container.querySelector('[data-role="eeg"]');
    const bands = Array.from(container.querySelectorAll('.demo-band i'));
    const rings = {};
    container.querySelectorAll('[data-ring]').forEach(el => { rings[el.dataset.ring] = el; });
    const values = {};
    container.querySelectorAll('[data-value]').forEach(el => { values[el.dataset.value] = el; });

    const circumference = 2 * Math.PI * 50;
    Object.values(rings).forEach(ring => {
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = circumference;
    });

    let target = states.rest;
    const state = { calm: 0, focus: 0, bands: [...target.bands] };
    let running = !reduceMotion.matches;
    let raf = null;
    let frame = 0;
    let surface = setupCanvas(canvas);
    let buffers = channels.map(() => new Array(Math.round(surface.width)).fill(0));

    const onResize = () => {
      surface = setupCanvas(canvas);
      buffers = channels.map(() => new Array(Math.round(surface.width)).fill(0));
    };
    window.addEventListener('resize', onResize, { passive: true });

    const palette = ['#6366f1', '#0ea5e9', '#8b5cf6', '#a855f7', '#f59e0b', '#06b6d4', '#3b82f6', '#64748b'];

    function draw() {
      const { ctx, width, height } = surface;
      ctx.clearRect(0, 0, width, height);
      const lane = height / channels.length;

      ctx.font = '11px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      channels.forEach((name, i) => {
        const mid = lane * (i + 0.5);
        ctx.fillStyle = palette[i];
        ctx.fillText(name, 2, mid);

        ctx.strokeStyle = palette[i];
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        const data = buffers[i];
        for (let x = 0; x < data.length; x += 1) {
          const y = mid - data[x] * (lane * 0.36);
          if (x === 0) ctx.moveTo(x + 34, y); else ctx.lineTo(x + 34, y);
        }
        ctx.stroke();
      });
    }

    function step() {
      if (running) {
        frame += 1;
        const ease = 0.05;
        state.calm += (target.calm - state.calm) * ease;
        state.focus += (target.focus - state.focus) * ease;
        target.bands.forEach((value, i) => { state.bands[i] += (value - state.bands[i]) * ease; });

        channels.forEach((_, i) => {
          const t = frame / 26;
          const sample =
            0.55 * Math.sin(t * 2.1 + i) +
            0.30 * Math.sin(t * 5.4 + i * 0.7) +
            0.18 * Math.sin(t * 9.8 + i * 1.3) +
            (Math.random() - 0.5) * 0.3 * target.noise;
          buffers[i].shift();
          buffers[i].push(sample);
        });
        draw();

        values.calm.textContent = Math.round(state.calm) + '%';
        values.focus.textContent = Math.round(state.focus) + '%';
        rings.calm.style.strokeDashoffset = circumference - (clamp(state.calm, 0, 100) / 100) * circumference;
        rings.focus.style.strokeDashoffset = circumference - (clamp(state.focus, 0, 100) / 100) * circumference;
        bands.forEach((bar, i) => {
          bar.style.height = clamp((state.bands[i] / 13) * 100, 6, 100) + '%';
        });
      }
      raf = requestAnimationFrame(step);
    }

    container.addEventListener('click', event => {
      const stateBtn = event.target.closest('[data-state]');
      if (stateBtn) {
        container.querySelectorAll('[data-state]').forEach(b => b.classList.toggle('is-active', b === stateBtn));
        target = states[stateBtn.dataset.state];
        return;
      }
      const playBtn = event.target.closest('[data-play]');
      if (playBtn) {
        running = !running;
        playBtn.setAttribute('aria-pressed', String(running));
        playBtn.querySelector('i').className = running ? 'bx bx-pause' : 'bx bx-play';
        playBtn.querySelector('span').textContent = running ? pick('Pause', 'Pause') : pick('Play', 'Lecture');
      }
    });

    if (reduceMotion.matches) {
      const playBtn = container.querySelector('[data-play]');
      playBtn.setAttribute('aria-pressed', 'false');
      playBtn.querySelector('i').className = 'bx bx-play';
      playBtn.querySelector('span').textContent = pick('Play', 'Lecture');
    }

    draw();
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }

  /* -------------------------------------------------------------------- EVH */

  function evhDemo(container) {
    const roles = [
      {
        key: 'pr',
        name: pick('Resident pastor', 'Pasteur résident'),
        scope: pick('Whole church', 'Église entière'),
        can: pick(
          ['Sees every member, tribe and department', 'Publishes the weekly assignment and the announcements', 'Opens the monthly reports and the audit log'],
          ['Voit tous les membres, toutes les tribus et tous les départements', 'Publie le devoir de la semaine et les annonces', 'Ouvre les rapports mensuels et le journal d’audit']
        )
      },
      {
        key: 'ap',
        name: pick('Assistant pastor', 'Assistant pasteur'),
        scope: pick('Several tribes', 'Plusieurs tribus'),
        can: pick(
          ['Follows the tribes assigned to them', 'Writes the report sent up to the pastor', 'Handles tribe change requests'],
          ['Suit les tribus qui lui sont attribuées', 'Rédige le rapport transmis au pasteur', 'Traite les demandes de changement de tribu']
        )
      },
      {
        key: 'patriarche',
        name: pick('Patriarch', 'Patriarche'),
        scope: pick('One tribe and its small groups', 'Une tribu et ses GEM'),
        can: pick(
          ['Follows the members of the tribe', 'Approves spiritual health form edit requests', 'Keeps the attendance sheets'],
          ['Suit les membres de sa tribu', 'Approuve les demandes de modification de fiche', 'Tient les feuilles de présence']
        )
      },
      {
        key: 'garde',
        name: pick('Small group leader', 'Garde de GEM'),
        scope: pick('Three to five members', 'Trois à cinq membres'),
        can: pick(
          ['Sees the members of their own group', 'Records attendance and punctuality', 'Writes the weekly group report'],
          ['Voit les membres de son GEM', 'Note la présence et la ponctualité', 'Rédige le rapport hebdomadaire du groupe']
        )
      },
      {
        key: 'fidele',
        name: pick('Member', 'Membre'),
        scope: pick('Their own space', 'Son espace personnel'),
        can: pick(
          ['Fills in the monthly spiritual health form', 'Sets the resolutions of the month and does the assignment', 'Books an appointment with the pastor'],
          ['Remplit sa fiche de santé spirituelle mensuelle', 'Pose ses résolutions du mois et fait son devoir', 'Prend rendez-vous avec le pasteur']
        )
      }
    ];

    container.innerHTML = `
      <div class="demo demo-evh">
        <p class="demo-lead">${pick(
          'Every screen is filtered by the role and the scope attached to it. Pick a role to see what it opens.',
          'Chaque écran est filtré par le rôle et le périmètre qui lui est attaché. Choisissez un rôle pour voir ce qu’il ouvre.'
        )}</p>
        <div class="demo-toolbar" role="group" aria-label="${pick('Role', 'Rôle')}">
          ${roles.map((role, index) => `
            <button type="button" class="demo-chip${index === 0 ? ' is-active' : ''}" data-role-key="${role.key}">${role.name}</button>
          `).join('')}
        </div>
        <div class="demo-card demo-role" aria-live="polite">
          <p class="demo-role-scope"><span>${pick('Scope', 'Périmètre')}</span><strong data-scope></strong></p>
          <ul class="demo-role-list" data-can></ul>
        </div>
      </div>
    `;

    const scopeEl = container.querySelector('[data-scope]');
    const canEl = container.querySelector('[data-can]');

    function show(role) {
      scopeEl.textContent = role.scope;
      canEl.innerHTML = role.can.map(item => `<li>${item}</li>`).join('');
    }

    container.addEventListener('click', event => {
      const button = event.target.closest('[data-role-key]');
      if (!button) return;
      container.querySelectorAll('[data-role-key]').forEach(b => b.classList.toggle('is-active', b === button));
      show(roles.find(role => role.key === button.dataset.roleKey));
    });

    show(roles[0]);
    return () => {};
  }

  /* ----------------------------------------------------------------- public */

  const registry = { cpilot: cpilotDemo, neurosity: neurosityDemo, evh: evhDemo };

  let mountToken = 0;

  window.ProjectDemos = {
    mount(container) {
      this.unmount();
      if (!container) return;
      const build = registry[container.dataset.demo];
      if (!build) return;
      // The panel animates in, so wait until the container has its real width.
      // The token makes sure a demo whose build was already cancelled never starts.
      const token = ++mountToken;
      requestAnimationFrame(() => {
        if (token !== mountToken || !container.isConnected) return;
        active = { stop: build(container) };
      });
    },
    unmount() {
      mountToken += 1;
      active?.stop?.();
      active = null;
    }
  };
})();
