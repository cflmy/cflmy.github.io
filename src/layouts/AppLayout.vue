<template>
  <div class="layout">
    <header class="topbar">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">⚡</span>
        <span>
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
const year = new Date().getFullYear();
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(8, 12, 20, 0.92);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.brand-icon {
  font-size: 1.25rem;
}

.brand strong {
  display: block;
  font-size: 1rem;
  background: linear-gradient(90deg, var(--color-wind), var(--color-cloud));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand small {
  font-size: 0.7rem;
  color: #64748b;
}

.topnav {
  display: flex;
  gap: 16px;
}

.nav-link {
  font-size: 0.875rem;
  color: #94a3b8;
  text-decoration: none;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-wind);
}

.main {
  flex: 1;
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: 24px 20px 48px;
}

.footer {
  padding: 16px 20px;
  text-align: center;
  font-size: 0.75rem;
  color: #475569;
  border-top: 1px solid var(--color-border);
}
</style>
