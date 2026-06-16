<template>
  <div class="resume-photo" :class="[shape, variant, { empty: !src }]">
    <img v-if="src" :src="src" alt="证件照" />
    <span v-else class="placeholder">{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resumeInitials } from '@/utils/resumePhoto';

const props = withDefaults(
  defineProps<{
    src: string;
    name: string;
    shape?: 'round' | 'square';
    variant?: 'classic' | 'sidebar' | 'banner' | 'minimal';
  }>(),
  {
    shape: 'square',
    variant: 'classic',
  }
);

const initials = computed(() => resumeInitials(props.name));
</script>

<style scoped>
.resume-photo {
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  box-sizing: border-box;
}

.resume-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.placeholder {
  font-weight: 700;
  color: #94a3b8;
  user-select: none;
}

/* classic — 右上角证件照 */
.classic {
  width: 26mm;
  height: 32mm;
  border: 2px solid #bfdbfe;
  box-shadow: 0 2px 8px rgba(30, 58, 95, 0.12);
}

.classic.round {
  border-radius: 4px;
}

.classic.square {
  border-radius: 2px;
}

.classic .placeholder {
  font-size: 14pt;
}

/* sidebar — 侧栏圆形头像 */
.sidebar {
  width: 22mm;
  height: 22mm;
  border: 2px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.12);
}

.sidebar.round {
  border-radius: 50%;
}

.sidebar .placeholder {
  font-size: 16pt;
  color: rgba(255, 255, 255, 0.75);
}

/* banner — 页眉圆形 */
.banner {
  width: 24mm;
  height: 24mm;
  border: 3px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.banner.round {
  border-radius: 50%;
}

.banner .placeholder {
  font-size: 15pt;
  color: rgba(255, 255, 255, 0.8);
}

/* minimal — 右上角方框 */
.minimal {
  width: 24mm;
  height: 30mm;
  border: 3px solid #14b8a6;
  background: #f8fafc;
}

.minimal.square {
  border-radius: 0;
}

.minimal .placeholder {
  font-size: 13pt;
  color: #94a3b8;
}
</style>
