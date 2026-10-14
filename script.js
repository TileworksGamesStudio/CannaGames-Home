/**
 * Game Hub Controller & Botanical Physics Environment
 * Professional Cannabis-Themed Visual Rebrand Compliant
 * Natural Olive Foundation · Muted Gold Borders · Lavender Purple Atmosphere
 */
(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. Decoupled Game Catalog & Runtime Schema Validation
     -------------------------------------------------------------------------- */
  const GAME_CATALOG = [
    { id: "crossword",    name: "Crossword",   desc: "Daily mini puzzle",    url: "#crossword",   enabled: true,  icon: "grid" },
    { id: "connections",  name: "Connections", desc: "Find groups of 4",     url: "#connections", enabled: true,  icon: "nodes" },
    { id: "trivia",       name: "Trivia",      desc: "Knowledge test",       url: "#trivia",      enabled: true,  icon: "help" },
    { id: "hangman",      name: "Hangman",     desc: "Guess the phrase",     url: "#hangman",     enabled: true,  icon: "text" },
    { id: "specs",        name: "Match",       desc: "Pair identical cards", url: "#specs",       enabled: true,  icon: "check" },
    { id: "memory",       name: "Memory",      desc: "Pattern recall",       url: "#memory",      enabled: true,  icon: "cards" },
    { id: "spelling-bee", name: "Letters",     desc: "Form 4+ letter words", url: "#spelling",    enabled: true,  icon: "hex" },
    { id: "wordle",       name: "Word Guess",  desc: "5-letter challenge",   url: "#wordle",      enabled: true,  icon: "rows" },
    { id: "wordsearch",   name: "Wordsearch",  desc: "Find hidden words",    url: "#wordsearch",  enabled: true,  icon: "dice" }
  ];

  // Botanical line craft SVG icons
  const ICONS = {
    grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    nodes: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.8"/><circle cx="18" cy="6" r="2.8"/><circle cx="6" cy="18" r="2.8"/><circle cx="18" cy="18" r="2.8"/><line x1="8.8" y1="6" x2="15.2" y2="6"/><line x1="6" y1="8.8" x2="6" y2="15.2"/><line x1="18" y1="8.8" x2="18" y2="15.2"/><line x1="8.8" y1="18" x2="15.2" y2="18"/></svg>',
    help: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9a2.8 2.8 0 0 1 5.4.9c0 1.9-2.6 2.5-2.6 3.8"/><circle cx="12" cy="16.8" r="0.8" fill="currentColor"/></svg>',
    text: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="6" y1="17" x2="20" y2="17"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 11.1V12a9.5 9.5 0 1 1-5.6-8.7"/><polyline points="21.5 4.5 11.5 14.5 8.5 11.5"/></svg>',
    cards: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="12.5" height="14.5" rx="2"/><rect x="9" y="3.5" width="12.5" height="14.5" rx="2"/></svg>',
    hex: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2.5 20.5 7.4 20.5 17.1 12 22 3.5 17.1 3.5 7.4 12 2.5"/></svg>',
    rows: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="3.8" rx="1.2"/><rect x="3" y="10.1" width="18" height="3.8" rx="1.2"/><rect x="3" y="16.2" width="18" height="3.8" rx="1.2"/></svg>',
    dice: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/><circle cx="16" cy="8" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="8" cy="16" r="1.3" fill="currentColor"/><circle cx="16" cy="16" r="1.3" fill="currentColor"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="10.5" width="17" height="11" rx="2"/><path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5"/></svg>'
  };

  /**
   * Runtime data validation ensuring no malformed item breaks rendering
   */
  function validateGameItem(item, index) {
    return {
      id: typeof item.id === "string" && item.id.trim() ? item.id : `game-${index}`,
      name: typeof item.name === "string" && item.name.trim() ? item.name : "New Puzzle",
      desc: typeof item.desc === "string" ? item.desc : "",
      url: typeof item.url === "string" && item.url.trim() ? item.url : "#",
      enabled: typeof item.enabled === "boolean" ? item.enabled : true,
      icon: ICONS[item.icon] ? item.icon : "grid"
    };
  }

  /* --------------------------------------------------------------------------
     2. Centralized Audio Profiles & Sound Synth Engine
     -------------------------------------------------------------------------- */
  const AUDIO_THEME = {
    CHIME_TAP:    { freq1: 523.25, freq2: 659.25, type: "sine",     duration: 0.08 },
    SHUFFLE_TAP:  { freq1: 587.33, freq2: 880.00, type: "triangle", duration: 0.10 },
    MODAL_OPEN:   { freq1: 440.00, freq2: 587.33, type: "sine",     duration: 0.06 },
    MODAL_CLOSE:  { freq1: 400.00, freq2: 300.00, type: "sine",     duration: 0.05 },
    TOGGLE_CLICK: { freq1: 600.00, freq2: 600.00, type: "sine",     duration: 0.04 },
    DONATE_TAP:   { freq1: 523.25, freq2: 783.99, type: "sine",     duration: 0.09 }
  };

  let audioCtx = null;

  function initAudio() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && (audioCtx.state === "suspended" || audioCtx.state === "interrupted")) {
        audioCtx.resume();
      }
    } catch (e) {
      // Audio fails gracefully on unsupported clients
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  });

  /**
   * Harmonious two-tone audio chime with haptic feedback fallback
   */
  function playAudioTone(profile) {
    if (!state.sound) {
      if ("vibrate" in navigator) {
        try { navigator.vibrate(10); } catch (err) {}
      }
      return;
    }

    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = profile.type || "sine";
      osc2.type = profile.type || "sine";

      osc1.frequency.setValueAtTime(profile.freq1, now);
      osc2.frequency.setValueAtTime(profile.freq2, now + profile.duration * 0.4);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + profile.duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + profile.duration * 0.5);

      osc2.start(now + profile.duration * 0.4);
      osc2.stop(now + profile.duration);
    } catch (e) {
      // Silent failure if audio permission is restricted
    }
  }

  /* --------------------------------------------------------------------------
     3. State, Versioned Persistence & Multi-Tab Synchronization
     -------------------------------------------------------------------------- */
  const SETTINGS_KEY = "game_hub_settings_v1";
  const PROGRESS_KEY = "hub_daily_progress";
  const LAST_PLAYED_KEY = "hub_last_played";

  const state = {
    version: 1,
    sound: true,
    animations: true
  };

  function loadSettings() {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.version === 1) {
          if (typeof parsed.sound === "boolean") state.sound = parsed.sound;
          if (typeof parsed.animations === "boolean") state.animations = parsed.animations;
        }
      }
    } catch (e) {
      state.sound = true;
      state.animations = true;
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function getTodayLocalDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getCompletedGamesToday() {
    try {
      const today = getTodayLocalDate();
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Object.keys(data).filter((id) => data[id] === today);
    } catch (e) {
      return [];
    }
  }

  function markGameCompletedToday(gameId) {
    try {
      const today = getTodayLocalDate();
      const data = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      data[gameId] = today;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
      renderGrid();
    } catch (e) {}
  }

  function getLastPlayedGame() {
    try {
      return localStorage.getItem(LAST_PLAYED_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  function setLastPlayedGame(gameId) {
    try {
      localStorage.setItem(LAST_PLAYED_KEY, gameId);
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
     4. Dynamic Mobile Viewport & Symmetric Grid Scaling
     -------------------------------------------------------------------------- */
  function applyDynamicMobileLayout() {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const viewportHeight = window.innerHeight;

    const availableWidth = Math.min(viewportWidth - 24, 440);
    const gap = viewportWidth < 360 ? 8 : (viewportWidth < 400 ? 10 : 13);
    const calculatedTileSize = Math.floor((availableWidth - (gap * 2)) / 3);

    const root = document.documentElement;
    root.style.setProperty("--app-width", `${availableWidth}px`);
    root.style.setProperty("--app-height", `${viewportHeight}px`);
    root.style.setProperty("--dyn-tile-size", `${calculatedTileSize}px`);
    root.style.setProperty("--dyn-grid-gap", `${gap}px`);

    if (viewportHeight < 680) {
      document.body.classList.add("compact-screen");
    } else {
      document.body.classList.remove("compact-screen");
    }
  }

  /* --------------------------------------------------------------------------
     5. Contextual Greeting & Feedback Announcer
     -------------------------------------------------------------------------- */
  function updateTimeOfDayGreeting() {
    const subtitle = document.getElementById("hub-subtitle");
    if (!subtitle) return;

    const hour = new Date().getHours();
    let greeting = "Select a game to play";

    if (hour >= 5 && hour < 12) {
      greeting = "Good morning! Pick today's educational puzzle";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Good afternoon! Sharpen your dispensary botany";
    } else {
      greeting = "Good evening! Unwind with terpene & plant trivia";
    }

    subtitle.textContent = greeting;
  }

  function announceA11y(message) {
    const announcer = document.getElementById("a11y-announcer");
    if (announcer) {
      announcer.textContent = "";
      setTimeout(() => {
        announcer.textContent = message;
      }, 50);
    }
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast-banner");
    if (!toast) return;

    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toast.setAttribute("aria-hidden", "false");

    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.setAttribute("aria-hidden", "true");
    }, 2400);
  }

  /* --------------------------------------------------------------------------
     6. Grid Renderer with Badges, Subtitles & Loading Feedback
     -------------------------------------------------------------------------- */
  function renderGrid() {
    const grid = document.getElementById("game-grid");
    if (!grid) return;

    const completedList = getCompletedGamesToday();
    const lastPlayedId = getLastPlayedGame();
    const fragment = document.createDocumentFragment();

    GAME_CATALOG.forEach((rawItem, index) => {
      const item = validateGameItem(rawItem, index);
      const li = document.createElement("li");
      li.className = "grid-cell";
      li.style.minWidth = "0";

      if (item.enabled) {
        const link = document.createElement("a");
        link.className = "tile";
        link.href = item.url;
        link.setAttribute("aria-label", `Play ${item.name}: ${item.desc}`);
        link.setAttribute("data-id", item.id);
        link.style.minWidth = "0";

        if (completedList.includes(item.id)) {
          const badge = document.createElement("span");
          badge.className = "tile-badge-done";
          badge.setAttribute("aria-label", "Completed today");
          badge.textContent = "✓";
          link.appendChild(badge);
        } else if (item.id === lastPlayedId) {
          const recentBadge = document.createElement("span");
          recentBadge.className = "tile-badge-recent";
          recentBadge.textContent = "Recent";
          link.appendChild(recentBadge);
        }

        const iconEl = document.createElement("div");
        iconEl.className = "tile-icon";
        iconEl.innerHTML = ICONS[item.icon] || ICONS.grid;

        const label = document.createElement("span");
        label.className = "tile-label";
        label.textContent = item.name;

        const desc = document.createElement("span");
        desc.className = "tile-desc";
        desc.textContent = item.desc;

        link.appendChild(iconEl);
        link.appendChild(label);
        link.appendChild(desc);

        link.addEventListener("click", (e) => {
          setLastPlayedGame(item.id);
          playAudioTone(AUDIO_THEME.CHIME_TAP);

          if (item.url.startsWith("#")) {
            e.preventDefault();
            link.classList.add("is-loading");
            showToast(`Loading ${item.name}...`);
            setTimeout(() => {
              link.classList.remove("is-loading");
            }, 600);
          }
        });

        li.appendChild(link);
      } else {
        const disabledTile = document.createElement("div");
        disabledTile.className = "tile tile-disabled";
        disabledTile.setAttribute("aria-disabled", "true");
        disabledTile.setAttribute("aria-label", `${item.name} is coming soon`);
        disabledTile.style.minWidth = "0";

        const iconEl = document.createElement("div");
        iconEl.className = "tile-icon";
        iconEl.innerHTML = ICONS.lock;

        const label = document.createElement("span");
        label.className = "tile-label";
        label.textContent = item.name;

        const desc = document.createElement("span");
        desc.className = "tile-desc";
        desc.textContent = "Coming Soon";

        disabledTile.appendChild(iconEl);
        disabledTile.appendChild(label);
        disabledTile.appendChild(desc);
        li.appendChild(disabledTile);
      }

      fragment.appendChild(li);
    });

    grid.innerHTML = "";
    grid.appendChild(fragment);
  }

  window.addEventListener("pageshow", () => {
    document.querySelectorAll(".tile.is-loading").forEach((el) => {
      el.classList.remove("is-loading");
    });
  });

  /* --------------------------------------------------------------------------
     7. Modal Dialog Controller with Focus Trap & Swipe-to-Dismiss
     -------------------------------------------------------------------------- */
  let activeModal = null;
  let previouslyFocused = null;
  let closeTimeoutId = null;

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function trapFocus(e) {
    if (!activeModal) return;
    const focusables = getFocusableElements(activeModal);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    } else if (e.key === "Escape") {
      closeModal();
    }
  }

  function openModal(modalEl, triggerBtn) {
    if (!modalEl) return;
    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId);
      closeTimeoutId = null;
    }

    initAudio();
    playAudioTone(AUDIO_THEME.MODAL_OPEN);

    previouslyFocused = triggerBtn || document.activeElement;
    activeModal = modalEl;

    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) backdrop.classList.add("is-active");

    modalEl.hidden = false;
    void modalEl.offsetHeight;
    modalEl.classList.add("is-open");

    if (triggerBtn) {
      triggerBtn.setAttribute("aria-expanded", "true");
    }

    const focusables = getFocusableElements(modalEl);
    if (focusables.length) {
      focusables[0].focus();
    }

    document.addEventListener("keydown", trapFocus);
    announceA11y(`${modalEl.querySelector(".sheet-title")?.textContent || "Dialog"} opened`);
  }

  function closeModal() {
    if (!activeModal) return;

    playAudioTone(AUDIO_THEME.MODAL_CLOSE);

    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) backdrop.classList.remove("is-active");

    activeModal.classList.remove("is-open");
    const closingModal = activeModal;

    function handleTransitionEnd(e) {
      if (e.target === closingModal && (e.propertyName === "transform" || !e.propertyName)) {
        closingModal.removeEventListener("transitionend", handleTransitionEnd);
        if (!closingModal.classList.contains("is-open")) {
          closingModal.hidden = true;
        }
      }
    }

    closingModal.addEventListener("transitionend", handleTransitionEnd);
    closeTimeoutId = setTimeout(() => {
      closingModal.removeEventListener("transitionend", handleTransitionEnd);
      if (!closingModal.classList.contains("is-open")) {
        closingModal.hidden = true;
      }
    }, 320);

    const btnSettings = document.getElementById("btn-settings");
    const btnDonate = document.getElementById("btn-donate");
    if (btnSettings) btnSettings.setAttribute("aria-expanded", "false");
    if (btnDonate) btnDonate.setAttribute("aria-expanded", "false");

    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }

    document.removeEventListener("keydown", trapFocus);
    activeModal = null;
  }

  function setupSwipeToDismiss(modalEl) {
    let startY = 0;
    let currentY = 0;
    let isTracking = false;

    const handle = modalEl.querySelector(".sheet-handle") || modalEl.querySelector(".sheet-header");
    if (!handle) return;

    handle.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        startY = e.touches[0].clientY;
        isTracking = true;
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isTracking || !activeModal) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        activeModal.style.transform = `translate(-50%, ${deltaY}px)`;
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      if (!isTracking || !activeModal) return;
      isTracking = false;
      const deltaY = currentY - startY;
      activeModal.style.transform = "";

      if (deltaY > 75) {
        closeModal();
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     8. BOTANICAL ATMOSPHERIC ENVIRONMENT & FLOATING PARTICLES ENGINE
     Palette Aligned: #22251A Foundation · #A78BC8 Purple Mists · #B3BD85 Spores
     -------------------------------------------------------------------------- */
  let canvas = null;
  let ctx = null;
  let animFrameId = null;
  let lastTimestamp = 0;

  const nugs = []; // Preserved specimen list used for soft ambient botanical motes
  const smokeParticles = [];
  let emberGlow = 0;
  let emberTimer = 0;
  const EMBER_INTERVAL = 30;

  function createCannabisNug(options) {
    return {
      x: options.x || 100,
      y: options.y || 100,
      vx: (Math.random() - 0.5) * 6,
      vy: -(4 + Math.random() * 8),
      radius: options.radius || 24,
      depth: options.depth || 0.5,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.12,
      opacity: 0.12 + (options.depth || 0.5) * 0.16,
      color: Math.random() > 0.4 ? "#879652" : "#B3BD85"
    };
  }

  function initBotanicalSystem() {
    canvas = document.getElementById("botanical-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d", { alpha: true });

    resizeBotanicalCanvas();

    const isMobile = window.innerWidth < 600;
    const targetCount = isMobile ? 5 : 9;
    nugs.length = 0;

    for (let i = 0; i < targetCount; i++) {
      const depth = 0.2 + (i / targetCount) * 0.8;
      const radius = 16 + depth * 22;
      nugs.push(createCannabisNug({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        depth
      }));
    }

    lastTimestamp = performance.now();
    startBotanicalLoop();
  }

  function resizeBotanicalCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  function triggerSmokeAscent() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = 18;

    for (let i = 0; i < count; i++) {
      smokeParticles.push({
        x: (width * 0.1) + Math.random() * (width * 0.8),
        y: height + Math.random() * 20,
        vx: (Math.random() - 0.5) * 12,
        vy: -(18 + Math.random() * 24),
        radius: 30 + Math.random() * 45,
        maxRadius: 160 + Math.random() * 180,
        life: 0,
        maxLife: 6.0 + Math.random() * 3.0,
        opacity: 0.08 + Math.random() * 0.1,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2
      });
    }
  }

  function updateBotanicalPhysics(dt, nowSec) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    emberTimer += dt;
    if (emberTimer > EMBER_INTERVAL) {
      const progress = emberTimer - EMBER_INTERVAL;
      if (progress < 1.0) {
        emberGlow = progress / 1.0;
      } else if (progress < 2.0) {
        emberGlow = 1.0 - ((progress - 1.0) / 1.0);
        if (smokeParticles.length === 0 && progress > 1.1) {
          triggerSmokeAscent();
        }
      } else {
        emberGlow = 0;
        emberTimer = 0;
      }
    } else {
      emberGlow = 0;
    }

    const driftX = Math.sin(nowSec * 0.2) * 8;
    nugs.forEach((nug) => {
      nug.x += (nug.vx + driftX * nug.depth) * dt;
      nug.y += nug.vy * dt;
      nug.rotation += nug.vRot * dt;

      const pad = nug.radius * 2;
      if (nug.y < -pad) {
        nug.y = height + pad;
        nug.x = Math.random() * width;
      } else if (nug.y > height + pad) {
        nug.y = -pad;
      }
      if (nug.x < -pad) nug.x = width + pad;
      if (nug.x > width + pad) nug.x = -pad;
    });

    for (let s = smokeParticles.length - 1; s >= 0; s--) {
      const p = smokeParticles[s];
      p.life += dt;
      const progress = p.life / p.maxLife;

      if (progress >= 1) {
        smokeParticles.splice(s, 1);
        continue;
      }

      p.radius += (p.maxRadius - p.radius) * (dt * 0.5);
      p.x += (p.vx + Math.sin(nowSec + p.y * 0.01) * 16) * dt;
      p.y += p.vy * dt;
      p.rot += p.vRot * dt;
      p.vy *= Math.pow(0.96, dt * 60);
    }
  }

  function renderBotanicalScene(nowSec) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    // 1. Soft atmospheric botanical motes
    nugs.forEach((nug) => {
      ctx.save();
      ctx.translate(nug.x, nug.y);
      ctx.rotate(nug.rotation);
      ctx.globalAlpha = nug.opacity;

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, nug.radius);
      grad.addColorStop(0, nug.color);
      grad.addColorStop(0.6, "rgba(104, 122, 63, 0.4)");
      grad.addColorStop(1, "rgba(34, 37, 26, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, nug.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 2. Soft lavender purple ambient baseline mist
    if (emberGlow > 0.01) {
      ctx.save();
      const glowHeight = Math.max(18, height * 0.04);
      const grad = ctx.createLinearGradient(0, height, 0, height - glowHeight);
      grad.addColorStop(0, "rgba(167, 139, 200, " + (emberGlow * 0.35) + ")");
      grad.addColorStop(1, "rgba(167, 139, 200, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, height - glowHeight, width, glowHeight);
      ctx.restore();
    }

    // 3. Diffused herbal mist particles
    if (smokeParticles.length > 0) {
      smokeParticles.forEach((p) => {
        const progress = p.life / p.maxLife;
        let alpha = p.opacity;
        if (progress < 0.2) {
          alpha *= (progress / 0.2);
        } else if (progress > 0.6) {
          alpha *= (1 - (progress - 0.6) / 0.4);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        const sGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
        sGrad.addColorStop(0, "rgba(135, 150, 82, " + alpha + ")");
        sGrad.addColorStop(0.5, "rgba(167, 139, 200, " + (alpha * 0.5) + ")");
        sGrad.addColorStop(1, "rgba(34, 37, 26, 0)");

        ctx.fillStyle = sGrad;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
  }

  function botanicalAnimationLoop(timestamp) {
    if (!state.animations || document.body.classList.contains("animations-disabled")) {
      animFrameId = null;
      return;
    }

    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
    lastTimestamp = timestamp;
    const nowSec = timestamp / 1000;

    updateBotanicalPhysics(dt, nowSec);
    renderBotanicalScene(nowSec);

    animFrameId = requestAnimationFrame(botanicalAnimationLoop);
  }

  function startBotanicalLoop() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    lastTimestamp = performance.now();
    animFrameId = requestAnimationFrame(botanicalAnimationLoop);
  }

  /* --------------------------------------------------------------------------
     9. Interactions, Settings & Multi-Tab Synchronization
     -------------------------------------------------------------------------- */
  function applyAnimationState() {
    if (state.animations) {
      document.body.classList.remove("animations-disabled");
      startBotanicalLoop();
    } else {
      document.body.classList.add("animations-disabled");
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  function setupInteractions() {
    const btnInstagram = document.getElementById("btn-instagram");
    const btnSettings = document.getElementById("btn-settings");
    const btnDonate = document.getElementById("btn-donate");
    const modalSettings = document.getElementById("settings-modal");
    const modalDonate = document.getElementById("donate-modal");
    const btnCloseSettings = document.getElementById("close-settings");
    const btnCloseDonate = document.getElementById("close-donate");
    const backdrop = document.getElementById("modal-backdrop");
    const soundToggle = document.getElementById("toggle-sound");
    const animToggle = document.getElementById("toggle-animations");
    const stripeLink = document.getElementById("stripe-donate-link");

    if (soundToggle) soundToggle.checked = state.sound;
    if (animToggle) animToggle.checked = state.animations;
    applyAnimationState();

    if (btnInstagram) {
      btnInstagram.addEventListener("click", () => {
        playAudioTone(AUDIO_THEME.TOGGLE_CLICK);
      });
    }

    if (soundToggle) {
      soundToggle.addEventListener("change", (e) => {
        state.sound = e.target.checked;
        saveSettings();
        if (state.sound) {
          playAudioTone(AUDIO_THEME.TOGGLE_CLICK);
        }
        announceA11y(state.sound ? "Sound effects enabled" : "Sound effects disabled");
      });
    }

    if (animToggle) {
      animToggle.addEventListener("change", (e) => {
        state.animations = e.target.checked;
        saveSettings();
        applyAnimationState();
        playAudioTone(AUDIO_THEME.TOGGLE_CLICK);
        announceA11y(state.animations ? "Animations enabled" : "Animations disabled");
      });
    }

    if (btnSettings && modalSettings) {
      btnSettings.addEventListener("click", () => openModal(modalSettings, btnSettings));
      setupSwipeToDismiss(modalSettings);
    }

    if (btnDonate && modalDonate) {
      btnDonate.addEventListener("click", () => openModal(modalDonate, btnDonate));
      setupSwipeToDismiss(modalDonate);
    }

    if (btnCloseSettings) btnCloseSettings.addEventListener("click", closeModal);
    if (btnCloseDonate) btnCloseDonate.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    if (stripeLink) {
      stripeLink.addEventListener("click", () => {
        playAudioTone(AUDIO_THEME.DONATE_TAP);
      });
    }

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        applyDynamicMobileLayout();
        resizeBotanicalCanvas();
      }, 60);
    });

    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        applyDynamicMobileLayout();
        resizeBotanicalCanvas();
      }, 100);
    });

    window.addEventListener("storage", (e) => {
      if (e.key === SETTINGS_KEY) {
        loadSettings();
        if (soundToggle) soundToggle.checked = state.sound;
        if (animToggle) animToggle.checked = state.animations;
        applyAnimationState();
      } else if (e.key === PROGRESS_KEY) {
        renderGrid();
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. Initialization
     -------------------------------------------------------------------------- */
  function init() {
    loadSettings();
    applyDynamicMobileLayout();
    updateTimeOfDayGreeting();
    renderGrid();
    setupInteractions();
    initBotanicalSystem();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.GameHub = {
    markCompleted: markGameCompletedToday
  };
})();