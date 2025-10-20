// ==============================
// 🎃 Pumpkin Panic — v0.3
// Movimiento con teclado + mouse
// ==============================

// --- Carga de elementos base ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const fullscreenBtn = document.getElementById("fullscreenBtn");

// --- Recursos multimedia ---
const bg = new Image();
bg.src = "assets/BG.jpg";
const pumpkinImg = new Image();
pumpkinImg.src = "assets/pumpkin.png";

const popSound = new Audio("assets/pop.mp3");
const introMusic = new Audio("assets/intro.mp3");
introMusic.loop = true;
introMusic.volume = 0.4;

// --- Variables del juego ---
let pumpkins = [];
let score = 0;
let cursor = { x: canvas.width / 2, y: canvas.height / 2, size: 30 };
let keys = {};

// --- Función para crear calabazas ---
function createPumpkin() {
  const size = 50 + Math.random() * 30;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);
  const speedX = (Math.random() - 0.5) * 4;
  const speedY = (Math.random() - 0.5) * 4;

  pumpkins.push({ x, y, size, speedX, speedY });
}

// --- Dibujar puntero personalizado ---
function drawCursor() {
  ctx.beginPath();
  ctx.arc(cursor.x, cursor.y, cursor.size / 4, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffcc00";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// --- Dibujar fondo ---
function drawBackground() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

// --- Actualizar calabazas ---
function updatePumpkins() {
  pumpkins.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;

    // Rebote en los bordes
    if (p.x < 0 || p.x + p.size > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y + p.size > canvas.height) p.speedY *= -1;

    ctx.drawImage(pumpkinImg, p.x, p.y, p.size, p.size);
  });

  // Ocasionalmente crear más calabazas
  if (Math.random() < 0.02 && pumpkins.length < 10) createPumpkin();
}

// --- Eliminar calabaza al hacer clic o espacio ---
function handleClick(x, y) {
  pumpkins.forEach((p, i) => {
    if (x > p.x && x < p.x + p.size && y > p.y && y < p.y + p.size) {
      pumpkins.splice(i, 1);
      score++;
      scoreElement.textContent = score;
      popSound.currentTime = 0;
      popSound.play();
    }
  });
}

// --- Movimiento con teclado ---
function handleKeys() {
  const speed = 5;
  if (keys["ArrowUp"]) cursor.y -= speed;
  if (keys["ArrowDown"]) cursor.y += speed;
  if (keys["ArrowLeft"]) cursor.x -= speed;
  if (keys["ArrowRight"]) cursor.x += speed;

  // Limitar dentro del canvas
  cursor.x = Math.max(0, Math.min(canvas.width, cursor.x));
  cursor.y = Math.max(0, Math.min(canvas.height, cursor.y));
}

// --- Animación principal ---
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  updatePumpkins();
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
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// --- Activar pantalla completa ---
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// --- Movimiento del cursor con mouse ---
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  cursor.x = e.clientX - rect.left;
  cursor.y = e.clientY - rect.top;
});

// --- Iniciar juego ---
introMusic.play();
for (let i = 0; i < 5; i++) createPumpkin();
animate();
