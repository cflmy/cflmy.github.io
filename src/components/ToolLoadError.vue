<template>
  <div class="load-error">
    <p>工具加载失败，请刷新页面重试。</p>
    <p class="hint">若持续失败，请在 Cloudflare 控制台关闭 Rocket Loader（速度 → 优化）。</p>
    <button type="button" class="btn btn-primary" @click="reload">刷新页面</button>
  </div>
</template>

<script setup lang="ts">
function reload() {
  window.location.reload();
}
</script>

<style scoped>
.load-error {
  padding: 32px 16px;
  text-align: center;
  color: #94a3b8;
}

.hint {
  font-size: 0.8rem;
  color: #64748b;
  margin: 8px 0 16px;
}
</style>
