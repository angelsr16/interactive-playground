const COLORS = {
  border: "#dcdee3",
  plasma: "#6C63FF",
  matrix: "#00D4AA",
  ice: "#4FC3F7",
  elevated: "#1E2330",
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
}

let noiseParticles: Particle[] = [];
let noiseSeed = "";

function buildParticles(w: number, h: number): Particle[] {
  const colors = [COLORS.plasma, COLORS.matrix, COLORS.ice, COLORS.border];
  return Array.from({ length: 80 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random() * 0.4 + 0.1,
  }));
}

export function drawNoise(
  ctx: CanvasRenderingContext2D,
  mouse: { x: number; y: number },
  t: number,
) {
  const w = ctx.canvas.width / (window.devicePixelRatio || 1);
  const h = ctx.canvas.height / (window.devicePixelRatio || 1);
  const key = `${Math.round(w)}x${Math.round(h)}`;

  if (noiseSeed !== key) {
    noiseParticles = buildParticles(w, h);
    noiseSeed = key;
  }

  ctx.clearRect(0, 0, w, h);

  // Update + draw particles
  noiseParticles.forEach((p) => {
    p.x += p.vx + Math.sin(t * 0.0005 + p.y * 0.01) * 0.2;
    p.y += p.vy + Math.cos(t * 0.0004 + p.x * 0.01) * 0.15;
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    const dx = p.x - mouse.x,
      dy = p.y - mouse.y;
    const prox = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 100);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + prox * 3, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha + prox * 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Connection lines between nearby particles
  for (let i = 0; i < noiseParticles.length; i++) {
    for (let j = i + 1; j < noiseParticles.length; j++) {
      const a = noiseParticles[i],
        b = noiseParticles[j];
      const dx = a.x - b.x,
        dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 80) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = COLORS.border;
        ctx.globalAlpha = (1 - d / 80) * 0.35;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}
