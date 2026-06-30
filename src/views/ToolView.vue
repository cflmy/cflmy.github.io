<template>
  <AppLayout>
    <RouterLink to="/" class="back">← 返回工具列表</RouterLink>

    <template v-if="meta">
      <header class="tool-head glass-panel">
        <span class="tool-icon">{{ meta.icon }}</span>
        <div>
          <h1>{{ meta.name }}</h1>
          <p>{{ meta.desc }}</p>
          <p v-if="meta.verse" class="tool-verse">{{ meta.verse }}</p>
        </div>
      </header>

      <div class="tool-body glass-panel">
        <component :is="ToolComp" v-if="ToolComp" />
        <p v-else class="not-found">该工具组件未注册</p>
      </div>
    </template>

    <div v-else class="not-found glass-panel">
      <p>未找到该工具</p>
      <RouterLink to="/" class="btn btn-primary">返回首页</RouterLink>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import { getTool } from '@/data/tools';
import { TOOL_COMPONENTS } from '@/tools/registry';

const route = useRoute();
const id = computed(() => route.params.id as string);
const meta = computed(() => getTool(id.value));

const ToolComp = computed((): Component | null => {
  const m = meta.value;
  if (!m) return null;
  return TOOL_COMPONENTS[m.id] ?? null;
});
</script>

<style scoped>
.back {
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: var(--color-muted);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 999px;
  transition: color 0.2s, background 0.2s;
}

.back:hover {
  color: var(--color-wind);
  background: rgba(15, 23, 42, 0.04);
}

.tool-head {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 24px;
}

.tool-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-wind);
  box-shadow: var(--shadow-sm);
}

.tool-head h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.tool-head p {
  margin: 8px 0 0;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.tool-verse {
  font-family: var(--font-serif);
  font-style: italic;
  color: #94a3b8 !important;
  font-size: 0.85rem !important;
}

.tool-body {
  padding: 28px;
}

.not-found {
  color: var(--color-muted);
  padding: 48px 24px;
  text-align: center;
}
</style>
