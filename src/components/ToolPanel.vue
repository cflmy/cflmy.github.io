<template>
  <div class="tool-panel">
    <header v-if="title" class="panel-head">
      <h3 class="panel-title">{{ title }}</h3>
      <p v-if="hint" class="panel-hint">{{ hint }}</p>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string; hint?: string }>();
</script>

<style scoped>
.tool-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel-head {
  margin-bottom: 4px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.panel-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.panel-hint {
  margin-top: 6px;
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.5;
}
</style>
