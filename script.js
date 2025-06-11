
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Particle(x, y, dx, dy, size, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.size = size;
  this.color = color;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.shadowBlur = 25;
  ctx.shadowColor = '#000000';
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
  if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
  this.x += this.dx;
  this.y += this.dy;
  this.draw();
};

function init() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 8000;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    const color = 'rgba(0, 0, 0, 0.8)';
    particlesArray.push(new Particle(x, y, dx, dy, size, color));
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => p.update());
  requestAnimationFrame(animate);
}
init();
animate();
