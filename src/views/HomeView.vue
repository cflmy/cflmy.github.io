<template>
  <AppLayout>
    <section class="hero">
      <h1>长风工具箱</h1>
      <p>实用小工具：二维码、图片压缩、Word 排版、简历生成。纯浏览器运行，数据不上传。</p>
    </section>

    <div class="grid">
      <RouterLink
        v-for="t in tools"
        :key="t.id"
        :to="`/tool/${t.id}`"
        class="card"
      >
        <span class="card-icon">{{ t.icon }}</span>
        <div>
          <h2>{{ t.name }}</h2>
          <p>{{ t.desc }}</p>
        </div>
      </RouterLink>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { tools } from '@/data/tools';
</script>

<style scoped>
.hero {
  margin-bottom: 28px;
}

.hero h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.hero p {
  margin: 10px 0 0;
  color: #94a3b8;
  font-size: 0.95rem;
  max-width: 520px;
  line-height: 1.6;
}

.grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  max-width: 720px;
}

.card {
  display: flex;
  gap: 14px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.15s;
}

.card:hover {
  border-color: rgba(100, 255, 218, 0.35);
  transform: translateY(-2px);
}

.card-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(100, 255, 218, 0.08);
  font-size: 1.25rem;
}

.card h2 {
  margin: 0;
  font-size: 1.05rem;
}

.card p {
  margin: 8px 0 0;
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
}
</style>
