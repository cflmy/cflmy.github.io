<template>
  <component :is="currentTpl" ref="tplRef" :data="data" />
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import type { ResumeData } from '@/types/resume';
import TemplateClassic from '@/components/resume/TemplateClassic.vue';
import TemplateSidebar from '@/components/resume/TemplateSidebar.vue';
import TemplateBanner from '@/components/resume/TemplateBanner.vue';
import TemplateMinimal from '@/components/resume/TemplateMinimal.vue';

const props = defineProps<{
  data: ResumeData;
  templateId: string;
}>();

const tplRef = ref<{ rootRef: HTMLElement | null } | null>(null);

const MAP: Record<string, Component> = {
  classic: TemplateClassic,
  sidebar: TemplateSidebar,
  banner: TemplateBanner,
  minimal: TemplateMinimal,
};

const currentTpl = computed(() => MAP[props.templateId] ?? TemplateClassic);

function getRootEl(): HTMLElement | null {
  return tplRef.value?.rootRef ?? null;
}

defineExpose({ getRootEl });
</script>
