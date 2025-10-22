// ==============================
// 🎃 Pumpkin Panic — v0.3.3
// ==============================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const fullscreenBtn = document.getElementById("fullscreenBtn");

const bgImage = new Image();
bgImage.src = "assets/BG.jpg";

const pumpkinImage = new Image();
pumpkinImage.src = "assets/pumpkin.png";

const popSound = new Audio("assets/pop.mp3");
const bgMusic = new Audio("assets/bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0;

let pumpkins = [];
let particles = [];
let score = 0;
let cursor = { x: 450, y: 250, size: 30 };
let keys = {};
const MIN_PUMPKINS = 5;

// --- Pantalla completa dinámica ---
function resizeCanvas() {
  if (document.fullscreenElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 900;
    canvas.height = 500;
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// --- Crear calabazas ---
function createPumpkin() {
  const size = 50 + Math.random() * 30;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);
  const speedX = (Math.random() - 0.5) * 6;
  const speedY = (Math.random() - 0.5) * 6;

  const pumpkin = { x, y, size, speedX, speedY };
  const lifetime = 5000 + Math.random() * 5000;

  setTimeout(() => {
    const index = pumpkins.indexOf(pumpkin);
    if (index !== -1) {
      pumpkins.splice(index, 1);
      createParticles(pumpkin.x + pumpkin.size / 2, pumpkin.y + pumpkin.size / 2, "black");
    }
  }, lifetime);

  pumpkins.push(pumpkin);
}

function createParticles(x, y, color) {
  for (let i = 0; i < 10; i++) {
    particles.push({
      x,
      y,
      radius: Math.random() * 4 + 1,
      color,
      alpha: 1,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
    });
  }
}

function updateParticles() {
  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 0.02;
    if (p.alpha <= 0) particles.splice(i, 1);
    else {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  });
}

function drawCursor() {
  ctx.beginPath();
  ctx.arc(cursor.x, cursor.y, cursor.size / 4, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffcc00";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBackground() {
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

function updatePumpkins() {
  pumpkins.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x + p.size > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y + p.size > canvas.height) p.speedY *= -1;
    ctx.drawImage(pumpkinImage, p.x, p.y, p.size, p.size);
  });

  while (pumpkins.length < MIN_PUMPKINS) createPumpkin();
}

function handleClick(x, y) {
  pumpkins.forEach((p, i) => {
    if (x > p.x && x < p.x + p.size && y > p.y && y < p.y + p.size) {
      pumpkins.splice(i, 1);
      score++;
      scoreElement.textContent = score;
      createParticles(p.x + p.size / 2, p.y + p.size / 2, "orange");
      popSound.currentTime = 0;
      popSound.play();
    }
  });
}

function handleKeys() {
  const speed = 9;
  if (keys["ArrowUp"]) cursor.y -= speed;
  if (keys["ArrowDown"]) cursor.y += speed;
  if (keys["ArrowLeft"]) cursor.x -= speed;
  if (keys["ArrowRight"]) cursor.x += speed;

  cursor.x = Math.max(0, Math.min(canvas.width, cursor.x));
  cursor.y = Math.max(0, Math.min(canvas.height, cursor.y));
}

function drawCanvasScore() {
  ctx.font = "bold 24px Poppins";
  ctx.fillStyle = "#ffcc66";
  ctx.textAlign = "left";
  ctx.fillText(`Puntos: ${score}`, 20, 40);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  updatePumpkins();
  updateParticles();
  drawCanvasScore();
  drawCursor();
  handleKeys();
  requestAnimationFrame(animate);
}

// --- Eventos ---
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  handleClick(e.clientX - rect.left, e.clientY - rect.top);
});

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " ") handleClick(cursor.x, cursor.y);
  if (e.key.toLowerCase() === "f") toggleFullscreen();
});

window.addEventListener("keyup", (e) => (keys[e.key] = false));

fullscreenBtn.addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Movimiento del cursor con el mouse
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  cursor.x = e.clientX - rect.left;
  cursor.y = e.clientY - rect.top;
});

// --- Iniciar juego ---
let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgMusic.play().catch(() => {
      // En caso de error, el usuario deberá interactuar para reproducir
      console.log("Interactúa para escuchar la música");
    });
    musicStarted = true;
  }
}

// Iniciar música con cualquier interacción del usuario
window.addEventListener("click", startMusic);
window.addEventListener("keydown", startMusic);

for (let i = 0; i < MIN_PUMPKINS; i++) createPumpkin();
animate();
