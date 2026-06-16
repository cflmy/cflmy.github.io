<template>
  <AppLayout>
    <RouterLink to="/" class="back">← 返回工具列表</RouterLink>

    <template v-if="meta">
      <header class="tool-head">
        <span class="tool-icon">{{ meta.icon }}</span>
        <div>
          <h1>{{ meta.name }}</h1>
          <p>{{ meta.desc }}</p>
        </div>
      </header>

      <div class="tool-body">
        <component :is="ToolComp" v-if="ToolComp" />
        <p v-else class="not-found">该工具组件未注册</p>
      </div>
    </template>

    <div v-else class="not-found">
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
  display: inline-block;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: #64748b;
  text-decoration: none;
}

.back:hover {
  color: var(--color-wind);
}

.tool-head {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.tool-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(192, 132, 252, 0.1);
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--color-cloud);
}

.tool-head h1 {
  margin: 0;
  font-size: 1.5rem;
}

.tool-head p {
  margin: 6px 0 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.tool-body {
  padding: 8px 0;
}

.not-found {
  color: #64748b;
  padding: 40px 0;
  text-align: center;
}
</style>
