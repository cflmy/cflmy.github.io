<template>
  <div ref="wrapRef" class="fog-bg" aria-hidden="true">
    <canvas ref="canvasRef" class="fog-canvas" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { initFogScene, type FogSceneHandle } from '@/lib/fogScene';

const wrapRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

let handle: FogSceneHandle | null = null;
let observer: ResizeObserver | null = null;
let reducedMotion = false;

function onPointerMove(e: PointerEvent) {
  if (reducedMotion) return;
  handle?.setPointer(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = canvasRef.value;
  const wrap = wrapRef.value;
  if (!canvas || !wrap) return;

  try {
    handle = initFogScene(canvas);
    observer = new ResizeObserver(() => handle?.resize());
    observer.observe(wrap);
    handle.resize();
  } catch {
    /* 保留纯白背景 */
  }

  if (!reducedMotion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }
});

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove);
  observer?.disconnect();
  handle?.dispose();
  handle = null;
});
</script>

<style scoped>
.fog-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: #ffffff;
}

.fog-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
