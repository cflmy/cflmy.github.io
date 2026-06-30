<template>
  <WindBackground />
  <div class="layout">
    <header class="topbar">
      <RouterLink to="/" class="brand">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path
              d="M4 16c6-8 14-8 20 0M6 20c5-6 12-6 18 0M8 24c4-4 10-4 16 0"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span class="brand-text">
          <strong>长风工具箱</strong>
          <small>纯前端 · 本地运行</small>
        </span>
      </RouterLink>
      <nav class="topnav">
        <RouterLink to="/" class="nav-link">全部工具</RouterLink>
        <a href="https://www.cflmy.cn" target="_blank" rel="noopener" class="nav-link">主站</a>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <span>© {{ year }} 平安 · 数据仅在浏览器处理，不上传服务器</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import WindBackground from '@/components/WindBackground.vue';

const year = new Date().getFullYear();
</script>

<style scoped>
.layout {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #ffffff;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.brand-mark {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #ffffff;
  color: var(--color-wind);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.brand-mark svg {
  width: 22px;
  height: 22px;
  animation: breeze 4s ease-in-out infinite;
}

@keyframes breeze {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2px);
  }
}

.brand-text strong {
  display: block;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.02em;
}

.brand-text small {
  font-size: 0.7rem;
  color: var(--color-muted);
}

.topnav {
  display: flex;
  gap: 8px;
}

.nav-link {
  font-size: 0.875rem;
  color: var(--color-muted);
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 999px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-wind);
  background: rgba(15, 23, 42, 0.04);
}

.main {
  flex: 1;
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: 32px 24px 56px;
}

.footer {
  padding: 20px 24px;
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
  background: #ffffff;
}

@media (prefers-reduced-motion: reduce) {
  .brand-mark svg {
    animation: none;
  }
}
</style>
