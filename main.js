// main.js - Pumpkin Panic v0.2.1
// Autor: Leonardo Miguel Celis García
// Correcciones: ejecución, fullscreen y sonidos funcionando
// Recursos usados: assets/BG.jpg, assets/pumpkin.png, assets/pop.mp3, assets/intro.mp3

(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Audio
  const introAudio = new Audio('assets/intro.mp3');
  const popAudio = new Audio('assets/pop.mp3');
  const bgMusic = new Audio('assets/bg-music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.35;

  // Dimensiones iniciales
  const W = canvas.width;
  const H = canvas.height;

  // Imágenes
  const bgImg = new Image();
  bgImg.src = 'assets/BG.jpg';
  const pumpkinImg = new Image();
  pumpkinImg.src = 'assets/pumpkin.png';

  // Estado del juego
  let score = 0;
  let running = true;
  let lastSpawn = 0;
  let spawnInterval = 800;
  let pumpkins = [];
  let pops = [];
  let mouse = { x: W / 2, y: H / 2 };
  let time = { now: 0, dt: 0, last: performance.now() };

  const movementTypes = ['up', 'down', 'left', 'right', 'diag', 'circle', 'zigzag'];

  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));

  // Crear calabaza
  function createPumpkin() {
    const size = rand(36, 80);
    const x = rand(0, W - size);
    const y = rand(0, H - size);
    const speed = rand(30, 160);
    const mov = movementTypes[randInt(0, movementTypes.length - 1)];
    const life = rand(6, 14);
    const angle = rand(0, Math.PI * 2);
    const spin = rand(-3, 3);
    const scoreValue = mov === 'circle' ? 3 : mov === 'zigzag' ? 2 : 1;

    return {
      x, y, size, speed, mov, life, born: time.now, angle, spin, scoreValue,
      vx: (rand() < 0.5 ? -1 : 1) * rand(20, 80),
      vy: (rand() < 0.5 ? -1 : 1) * rand(20, 80),
      alpha: 1
    };
  }

  // Generar nuevas calabazas
  function trySpawn(now) {
    if (now - lastSpawn > spawnInterval) {
      pumpkins.push(createPumpkin());
      lastSpawn = now;
      spawnInterval = rand(600, 1400);
      if (pumpkins.length > 20) pumpkins.shift();
    }
  }

  // Actualizar posición de calabaza
  function updatePumpkin(p, dt) {
    const s = p.speed * dt;
    p.angle += p.spin * dt;
    const age = time.now - p.born;

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

    if (p.x < -p.size || p.x > W + p.size || p.y < -p.size || p.y > H + p.size) {
      p.dead = true;
    }
    if (age > p.life + 0.6) p.dead = true;
  }

  // Dibujar fondo
  function drawBackground() {
    if (bgImg.complete) ctx.drawImage(bgImg, 0, 0, W, H);
    else {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, W, H);
    }
  }

  // Dibujar calabaza
  function drawPumpkin(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    const cx = p.x + p.size / 2;
    const cy = p.y + p.size / 2;
    ctx.translate(cx, cy);
    ctx.rotate(p.angle * 0.2);
    if (pumpkinImg.complete) ctx.drawImage(pumpkinImg, -p.size / 2, -p.size / 2, p.size, p.size);
    else {
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Dibujar cursor
  function drawReticle(x, y) {
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
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

  // Partículas "pop"
  function spawnPop(x, y, size, val) {
    for (let i = 0; i < 8 + val * 2; i++) {
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
      ctx.fillStyle = 'rgba(255,200,50,0.95)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // Click
  function handleClick(e) {
    const mx = mouse.x;
    const my = mouse.y;

    for (let i = pumpkins.length - 1; i >= 0; i--) {
      const p = pumpkins[i];
      const px = p.x + p.size / 2;
      const py = p.y + p.size / 2;
      const dist = Math.hypot(mx - px, my - py);
      if (dist < Math.max(18, p.size * 0.45)) {
        score += p.scoreValue;
        scoreEl.textContent = score;
        spawnPop(px, py, p.size, p.scoreValue);
        popAudio.currentTime = 0;
        popAudio.play().catch(() => {});
        pumpkins.splice(i, 1);
        return;
      }
    }
  }

  // Bucle principal
  function tick(nowMs) {
    time.now = nowMs / 1000;
    time.dt = Math.min(0.05, (nowMs - time.last) / 1000);
    time.last = nowMs;

    if (running) {
      trySpawn(nowMs);
      pumpkins.forEach(p => updatePumpkin(p, time.dt));
      pumpkins = pumpkins.filter(p => !p.dead);
      updatePops(time.dt);
    }

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

  // Eventos
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
    mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
  });

  canvas.addEventListener('mousedown', e => {
    if (e.button === 0) {
      handleClick(e);
      if (bgMusic.paused) bgMusic.play().catch(() => {});
    }
  });

  window.addEventListener('keydown', e => {
    if (e.code === 'Space') running = !running;
  });

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) canvas.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  });

  // Redimensionar
  function resizeCanvas() {
    const containerWidth = canvas.parentElement.clientWidth;
    const scale = Math.min(containerWidth / canvas.getAttribute('width'), 1.2);
    canvas.style.width = Math.floor(canvas.getAttribute('width') * scale) + 'px';
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Iniciar
  function init() {
    for (let i = 0; i < 5; i++) pumpkins.push(createPumpkin());
    introAudio.volume = 0.6;
    introAudio.play().catch(() => {});
    requestAnimationFrame(tick);
  }

  init();
})();
