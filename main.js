// main.js - Pumpkin Panic v0.1
// Autor: Leonardo Miguel Celis García (versión inicial)
// Usa: assets/BG.jpg, assets/pumpkin.png, opcional: assets/bg-music.mp3

(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const musicToggleBtn = document.getElementById('musicToggle');

  const W = canvas.width;
  const H = canvas.height;

  // Recursos
  const bgImg = new Image();
  bgImg.src = 'assets/BG.jpg';

  const pumpkinImg = new Image();
  pumpkinImg.src = 'assets/pumpkin.png';

  // Música (opcional)
  const bgMusic = new Audio('assets/bg-music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.35;

  // Estado del juego
  let score = 0;
  let running = true;
  let lastSpawn = 0;
  let spawnInterval = 800; // ms
  let pumpkins = [];
  let mouse = { x: W / 2, y: H / 2, down: false };
  let time = { now: 0, dt: 0, last: performance.now() };

  // Tipos de movimiento
  const movementTypes = ['up', 'down', 'left', 'right', 'diag', 'circle', 'zigzag'];

  // Utility
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function randInt(min, max) { return Math.floor(rand(min, max + 1)); }

  // Pumpkin constructor
  function createPumpkin() {
    const size = rand(36, 80);
    const x = rand(0, W - size);
    const y = rand(0, H - size);
    const speed = rand(30, 160); // px/sec
    const mov = movementTypes[randInt(0, movementTypes.length - 1)];
    const life = rand(6, 14); // seconds
    const angle = rand(0, Math.PI * 2);
    const spin = rand(-3, 3); // radians/sec for rotating visual
    const scoreValue = mov === 'circle' ? 3 : mov === 'zigzag' ? 2 : 1;

    return {
      x, y, size, speed, mov, life, born: time.now, angle, spin, scoreValue,
      vx: (rand() < 0.5 ? -1 : 1) * rand(20, 80),
      vy: (rand() < 0.5 ? -1 : 1) * rand(20, 80),
      id: Math.random().toString(36).slice(2, 9),
      alpha: 1
    };
  }

  // Spawn logic (adaptive slight randomness)
  function trySpawn(now) {
    if (now - lastSpawn > spawnInterval) {
      pumpkins.push(createPumpkin());
      lastSpawn = now;
      // vary spawn interval slowly
      spawnInterval = rand(600, 1400);
      // keep max pumpkins reasonable
      if (pumpkins.length > 20) pumpkins.shift();
    }
  }

  // Update pumpkin positions
  function updatePumpkin(p, dt) {
    const s = p.speed * dt;
    p.angle += p.spin * dt;
    const age = (time.now - p.born);
    // fade out near end of life
    if (age > p.life - 1) {
      p.alpha = Math.max(0, 1 - (age - (p.life - 1)));
    }

    switch (p.mov) {
      case 'up': p.y -= s; break;
      case 'down': p.y += s; break;
      case 'left': p.x -= s; break;
      case 'right': p.x += s; break;
      case 'diag':
        p.x += Math.cos(p.angle) * s;
        p.y += Math.sin(p.angle) * s * 0.6;
        break;
      case 'circle':
        // orbit around a center point determined at spawn
        if (!p.cx) { p.cx = p.x; p.cy = p.y; p.orbR = rand(30, 120); p.orbSpeed = rand(1, 3); }
        p.x = p.cx + Math.cos(age * p.orbSpeed) * p.orbR;
        p.y = p.cy + Math.sin(age * p.orbSpeed) * p.orbR * 0.7;
        break;
      case 'zigzag':
        p.x += Math.cos(age * 6) * s * 0.6;
        p.y += Math.sign(Math.sin(age * 1.2)) * s * 0.9;
        break;
      default:
        p.x += p.vx * dt;
        p.y += p.vy * dt;
    }

    // random small jitter
    p.x += Math.sin(age * 3.14 + p.angle) * 0.2;
    p.y += Math.cos(age * 2.1 + p.angle) * 0.2;

    // remove when offscreen or life expired
    if (p.x < -p.size * 1.2 || p.x > W + p.size * 1.2 || p.y < -p.size * 1.2 || p.y > H + p.size * 1.2) {
      p.dead = true;
    }
    if (age > p.life + 0.6) p.dead = true;
  }

  // Draw functions
  function drawBackground() {
    if (bgImg.complete) {
      // draw covering background while keeping aspect
      ctx.drawImage(bgImg, 0, 0, W, H);
    } else {
      // fallback
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, W, H);
    }
  }

  function drawPumpkin(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    // rotate around center
    const cx = p.x + p.size / 2;
    const cy = p.y + p.size / 2;
    ctx.translate(cx, cy);
    ctx.rotate(p.angle * 0.2);
    if (pumpkinImg.complete) {
      ctx.drawImage(pumpkinImg, -p.size / 2, -p.size / 2, p.size, p.size);
    } else {
      // placeholder circle
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size/2, p.size/2.1, 0, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Custom cursor drawn in canvas
  function drawReticle(x, y) {
    ctx.save();
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x + 20, y);
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x, y + 20);
    ctx.stroke();
    ctx.restore();
  }

  // Click detection
  function handleClick(e) {
    // compute mouse relative to canvas
    const rect = canvas.getBoundingClientRect();
    const mx = mouse.x;
    const my = mouse.y;

    // find topmost pumpkin hit (reverse iterate)
    for (let i = pumpkins.length - 1; i >= 0; i--) {
      const p = pumpkins[i];
      const px = p.x + p.size / 2;
      const py = p.y + p.size / 2;
      const dist = Math.hypot(mx - px, my - py);
      if (dist < Math.max(18, p.size * 0.45)) {
        // hit!
        score += p.scoreValue;
        scoreEl.textContent = score;
        // spawn some pop particles (simple effect)
        spawnPop(px, py, p.size, p.scoreValue);
        pumpkins.splice(i, 1);
        return;
      }
    }
  }

  // Simple particle pops
  let pops = [];
  function spawnPop(x, y, size, val) {
    for (let i = 0; i < 8 + val*2; i++) {
      pops.push({
        x, y,
        vx: rand(-120, 120),
        vy: rand(-160, -20),
        life: rand(0.4, 1.2),
        born: time.now,
        r: rand(2, 5)
      });
    }
  }
  function updatePops(dt) {
    pops.forEach(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 300 * dt;
      if (time.now - p.born > p.life) p.dead = true;
    });
    pops = pops.filter(p => !p.dead);
  }
  function drawPops() {
    ctx.save();
    pops.forEach(p => {
      const a = 1 - ((time.now - p.born) / p.life);
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,200,50,0.95)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
  }

  // Main loop
  function tick(nowMs) {
    time.now = nowMs / 1000;
    time.dt = Math.min(0.05, (nowMs - time.last) / 1000);
    time.last = nowMs;
    if (!running) {
      requestAnimationFrame(tick);
      return;
    }

    // spawn
    trySpawn(nowMs);

    // update pumpkins
    pumpkins.forEach(p => updatePumpkin(p, time.dt));
    pumpkins = pumpkins.filter(p => !p.dead);

    // update pops
    updatePops(time.dt);

    // draw
    ctx.clearRect(0, 0, W, H);
    drawBackground();

    pumpkins.forEach(p => drawPumpkin(p));
    drawPops();

    // draw score small in-canvas (redundant with header)
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(8, 8, 120, 28);
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.fillText('Puntuación: ' + score, 16, 28);
    ctx.restore();

    // draw custom cursor reticle
    drawReticle(mouse.x, mouse.y);

    requestAnimationFrame(tick);
  }

  // Pause toggle
  function toggleRunning() {
    running = !running;
    if (running) {
      lastSpawn = performance.now();
    }
  }

  // Event listeners
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
    mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
  });

  canvas.addEventListener('mouseleave', () => {
    // move reticle off-screen when leaving
    mouse.x = -100;
    mouse.y = -100;
  });

  canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // left
      handleClick(e);
      // also try to start music (browsers usually require user gesture)
      if (bgMusic && bgMusic.paused) {
        // try to play; may be blocked - handle promise
        bgMusic.play().catch(()=>{ /* ignore */ });
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      toggleRunning();
    }
  });

  // Music button
  musicToggleBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicToggleBtn.textContent = 'Pausar música';
    } else {
      bgMusic.pause();
      musicToggleBtn.textContent = 'Reproducir música';
    }
  });

  // Resize handling (keep canvas fixed internal size for pixel ratio)
  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    // keep internal resolution as set in HTML, but scale CSS size to be responsive
    const containerWidth = canvas.parentElement.clientWidth;
    const scale = Math.min(containerWidth / canvas.getAttribute('width'), 1.2);
    canvas.style.width = Math.floor(canvas.getAttribute('width') * scale) + 'px';
    canvas.style.height = Math.floor(canvas.getAttribute('height') * scale) + 'px';
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // init and start
  function init() {
    // seed some pumpkins
    for (let i = 0; i < 5; i++) pumpkins.push(createPumpkin());
    time.last = performance.now();
    requestAnimationFrame(tick);
  }

  // Start after images attempt to load (no need to block)
  pumpkinImg.onload = () => { /* ready */ };
  bgImg.onload = () => { /* ready */ };

  init();

})();
