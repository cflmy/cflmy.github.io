<template>
  <button type="button" class="btn btn-sm" :class="{ copied }" @click="copy">
    {{ copied ? '已复制' : label }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{ text: string; label?: string }>(),
  { label: '复制' }
);

const copied = ref(false);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    /* ignore */
  }
}
</script>

<style scoped>
.copied {
  border-color: rgba(100, 255, 218, 0.5);
  color: var(--color-wind);
}
</style>
