<template>
  <AppLayout>
    <section class="hero-screen">
      <p class="series">长风 · 工具箱</p>
      <h1 class="hero-title">
        <span>实用小工具</span>
        <span class="thin">随风而至</span>
      </h1>
      <p class="hero-lead">纯浏览器运行，数据不上传。</p>
      <p class="scroll-hint">
        <span>向下探索工具</span>
        <span class="dot">·</span>
        <span>移动鼠标与雾互动</span>
      </p>
      <div class="scroll-indicator" aria-hidden="true">
        <span />
      </div>
    </section>

    <section ref="toolsSectionRef" class="tools-section">
      <header class="section-head reveal">
        <span class="section-mark">择器</span>
        <h2>四般实用，各得其用</h2>
        <p>点击卡片进入，所有处理均在本地完成</p>
      </header>

      <div class="grid">
        <RouterLink
          v-for="(t, i) in tools"
          :key="t.id"
          :to="`/tool/${t.id}`"
          class="card reveal"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <span class="card-index">{{ t.indexLabel }}</span>
          <span class="card-icon">{{ t.icon }}</span>
          <div class="card-body">
            <h3>{{ t.name }}</h3>
            <p class="card-desc">{{ t.desc }}</p>
            <p class="card-verse">{{ t.verse }}</p>
          </div>
          <span class="card-arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { tools } from '@/data/tools';
import { useScrollReveal } from '@/composables/useScrollReveal';

const toolsSectionRef = ref<HTMLElement | null>(null);
useScrollReveal(() => toolsSectionRef.value);
</script>

<style scoped>
.hero-screen {
  min-height: min(88vh, 720px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 0 32px;
  animation: hero-in 1s ease-out both;
}

.series {
  margin: 0 0 20px;
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.hero-title {
  margin: 0;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.hero-title span {
  display: block;
}

.hero-title .thin {
  font-weight: 500;
  color: var(--color-muted);
}

.hero-lead {
  margin: 20px 0 0;
  max-width: 520px;
  font-size: 0.95rem;
  line-height: 1.85;
  color: var(--color-muted);
}

.scroll-hint {
  margin: 36px 0 0;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  color: #94a3b8;
}

.scroll-hint .dot {
  margin: 0 0.4em;
}

.scroll-indicator {
  margin-top: 16px;
  width: 1px;
  height: 48px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.2), transparent);
  position: relative;
  overflow: hidden;
}

.scroll-indicator span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 14px;
  background: rgba(15, 23, 42, 0.35);
  animation: scroll-drop 2s ease-in-out infinite;
}

.tools-section {
  padding: 24px 0 16px;
}

.section-head {
  margin-bottom: 28px;
  max-width: 520px;
}

.section-mark {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: var(--color-muted);
  margin-bottom: 8px;
}

.section-head h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.section-head p {
  margin: 10px 0 0;
  font-size: 0.88rem;
  color: var(--color-muted);
  line-height: 1.6;
}

.grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  max-width: 960px;
}

.card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 22px 22px 20px 36px;
  border-radius: 4px 16px 16px 4px;
  border: 1px solid var(--color-border);
  background: #ffffff;
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s,
    opacity 0.7s ease,
    transform 0.7s ease;
}

.card::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, transparent, rgba(71, 85, 105, 0.25), transparent);
  opacity: 0;
  transition: opacity 0.35s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(15, 23, 42, 0.12);
}

.card:hover::after {
  opacity: 1;
}

.card-index {
  position: absolute;
  left: 14px;
  top: 18px;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: #e2e8f0;
  line-height: 1;
}

.card-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid var(--color-border);
  font-size: 1.25rem;
}

.card-body {
  min-width: 0;
}

.card h3 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
}

.card-desc {
  margin: 6px 0 0;
  font-size: 0.84rem;
  color: var(--color-muted);
  line-height: 1.5;
}

.card-verse {
  margin: 10px 0 0;
  font-family: var(--font-serif);
  font-size: 0.82rem;
  color: #94a3b8;
  font-style: italic;
}

.card-arrow {
  align-self: center;
  font-size: 1rem;
  color: var(--color-muted);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s, transform 0.3s;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scroll-drop {
  0% {
    top: 0;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-screen {
    animation: none;
  }

  .scroll-indicator span {
    animation: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }

  .card:hover {
    transform: none;
  }
}
</style>
