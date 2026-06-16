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
  gap: 16px;
}

.panel-head {
  margin-bottom: 4px;
}

.panel-title {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
}

.panel-hint {
  margin-top: 4px;
  font-size: 0.8rem;
  color: #64748b;
}
</style>
