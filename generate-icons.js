// generate-icons.js
// يولّد icon-192.png و icon-512.png بدون مكتبات خارجية
// يستخدم مكتبة canvas من npm

const { createCanvas } = require('canvas');
const fs = require('fs');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // ── خلفية بتدرج ──────────────────────────────────────
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0,   '#0a1628');
  grad.addColorStop(0.5, '#112240');
  grad.addColorStop(1,   '#0a2a50');
  ctx.fillStyle = grad;

  // زوايا دائرية (maskable safe zone = 80%)
  const r = size * 0.18;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // ── حلقة زرقاء داخلية ────────────────────────────────
  const cx = size / 2, cy = size / 2;
  const ringR = size * 0.36;
  const ringGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, ringR);
  ringGrad.addColorStop(0, 'rgba(30,111,207,0.5)');
  ringGrad.addColorStop(1, 'rgba(30,111,207,0.05)');
  ctx.beginPath();
  ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
  ctx.fillStyle = ringGrad;
  ctx.fill();

  // ── رمز 💻 ───────────────────────────────────────────
  const fontSize = Math.floor(size * 0.38);
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💻', cx, cy + size * 0.02);

  return canvas.toBuffer('image/png');
}

// توليد الأيقونتين
fs.writeFileSync('icon-192.png', drawIcon(192));
fs.writeFileSync('icon-512.png', drawIcon(512));

console.log('✅ تم توليد icon-192.png و icon-512.png بنجاح!');
