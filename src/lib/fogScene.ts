export interface FogSceneHandle {
  resize: () => void;
  dispose: () => void;
  setPointer: (nx: number, ny: number) => void;
}

interface Puff {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  opacity: number;
}

/** 参考湘夫人专题：柔雾层 + 鼠标拨开，纯白底上几乎不可见但可互动 */
export function initFogScene(canvas: HTMLCanvasElement): FogSceneHandle {
  const ctxRaw = canvas.getContext('2d', { alpha: true });
  if (!ctxRaw) throw new Error('Canvas 不可用');
  const ctx = ctxRaw;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 22 : 38;

  let width = 0;
  let height = 0;
  let pointerNx = 0.5;
  let pointerNy = 0.5;
  let frameId = 0;
  let running = true;

  const puffs: Puff[] = [];

  function makePuff(): Puff {
    return {
      x: Math.random() * Math.max(width, 1),
      y: Math.random() * Math.max(height, 1),
      r: 90 + Math.random() * 140,
      vx: 0.12 + Math.random() * 0.2,
      vy: (Math.random() - 0.5) * 0.06,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.018 + Math.random() * 0.028,
    };
  }

  function ensurePuffs() {
    while (puffs.length < count) puffs.push(makePuff());
    while (puffs.length > count) puffs.pop();
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    width = w;
    height = h;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ensurePuffs();
  }

  function drawPuff(p: Puff) {
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    g.addColorStop(0, `rgba(203, 213, 225, ${p.opacity})`);
    g.addColorStop(0.55, `rgba(241, 245, 249, ${p.opacity * 0.45})`);
    g.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPointerMist(px: number, py: number) {
    const g = ctx.createRadialGradient(px, py, 0, px, py, 160);
    g.addColorStop(0, 'rgba(203, 213, 225, 0.045)');
    g.addColorStop(0.4, 'rgba(226, 232, 240, 0.02)');
    g.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(px, py, 160, 0, Math.PI * 2);
    ctx.fill();
  }

  function step(time: number) {
    const t = time * 0.001;
    const px = pointerNx * width;
    const py = pointerNy * height;
    const pushR = isMobile ? 120 : 200;

    for (const p of puffs) {
      p.x += p.vx + Math.sin(t * 0.6 + p.phase) * 0.06;
      p.y += p.vy + Math.cos(t * 0.45 + p.phase) * 0.04;

      const dx = p.x - px;
      const dy = p.y - py;
      const dist = Math.hypot(dx, dy);
      if (dist < pushR && dist > 1) {
        const f = (1 - dist / pushR) * 1.2;
        p.x += (dx / dist) * f;
        p.y += (dy / dist) * f;
      }

      if (p.x > width + p.r) p.x = -p.r * 0.5;
      if (p.x < -p.r) p.x = width + p.r * 0.5;
      if (p.y > height + p.r) p.y = -p.r * 0.3;
      if (p.y < -p.r) p.y = height + p.r * 0.3;
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (const p of puffs) drawPuff(p);

    if (!prefersReduced) {
      drawPointerMist(pointerNx * width, pointerNy * height);
    }
  }

  function animate(time: number) {
    if (!running) return;
    frameId = requestAnimationFrame(animate);
    step(time);
    render();
  }

  resize();

  if (!prefersReduced) {
    frameId = requestAnimationFrame(animate);
  } else {
    render();
  }

  function setPointer(nx: number, ny: number) {
    pointerNx = nx;
    pointerNy = ny;
  }

  function dispose() {
    running = false;
    cancelAnimationFrame(frameId);
  }

  return { resize, dispose, setPointer };
}
