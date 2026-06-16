<template>
  <div ref="rootRef" class="tpl minimal">
    <header class="head">
      <div class="head-row">
        <div class="head-top">
          <h1>{{ data.name || '您的姓名' }}</h1>
          <p class="title">{{ data.title || '意向岗位' }}</p>
        </div>
        <ResumePhoto :src="data.photo" :name="data.name" variant="minimal" shape="square" />
      </div>
      <div class="contact-bar">
        <span v-if="data.phone">{{ data.phone }}</span>
        <span v-if="data.email">{{ data.email }}</span>
        <span v-if="data.location">{{ data.location }}</span>
        <span v-if="data.website">{{ data.website }}</span>
      </div>
    </header>

    <section v-if="data.summary.trim()" class="sec">
      <h2>ABOUT</h2>
      <p>{{ data.summary }}</p>
    </section>

    <section v-if="experiences.length" class="sec">
      <h2>EXPERIENCE</h2>
      <div v-for="(e, i) in experiences" :key="i" class="timeline-item">
        <div class="dot" />
        <div class="content">
          <div class="item-head">
            <strong>{{ e.company }}</strong>
            <span>{{ e.period }}</span>
          </div>
          <p class="role">{{ e.role }}</p>
          <ul v-if="bullets(e.bullets).length">
            <li v-for="(b, j) in bullets(e.bullets)" :key="j">{{ b }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section v-if="educations.length" class="sec">
      <h2>EDUCATION</h2>
      <div v-for="(e, i) in educations" :key="i" class="row-item">
        <strong>{{ e.school }}</strong>
        <span>{{ e.period }}</span>
        <p>{{ e.degree }}</p>
      </div>
    </section>

    <section v-if="projects.length" class="sec">
      <h2>PROJECTS</h2>
      <div v-for="(p, i) in projects" :key="i" class="row-item">
        <strong>{{ p.name }}</strong>
        <span>{{ p.period }}</span>
        <p v-if="p.desc">{{ p.desc }}</p>
      </div>
    </section>

    <section v-if="skills.length" class="sec">
      <h2>SKILLS</h2>
      <div class="tags">
        <span v-for="(s, i) in skills" :key="i">{{ s }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import type { ResumeData } from '@/types/resume';
import { useResumeContent } from '@/composables/useResumeContent';
import ResumePhoto from '@/components/resume/ResumePhoto.vue';

const props = defineProps<{ data: ResumeData }>();
const rootRef = ref<HTMLElement | null>(null);
const { educations, experiences, projects, skills, bullets } = useResumeContent(toRef(props, 'data'));

defineExpose({ rootRef });
</script>

<style scoped>
.tpl {
  width: 210mm;
  min-height: 297mm;
  padding: 16mm 18mm;
  background: #fff;
  color: #0f172a;
  font-family: 'Noto Sans SC', 'Georgia', serif;
  font-size: 10.5pt;
  line-height: 1.55;
  box-sizing: border-box;
}

.head {
  margin-bottom: 20px;
}

.head-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
}

.head-top {
  flex: 1;
  min-width: 0;
  border-left: 6px solid #14b8a6;
  padding-left: 16px;
}

.head h1 {
  margin: 0;
  font-size: 32pt;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.title {
  margin: 6px 0 0;
  font-size: 13pt;
  color: #14b8a6;
  font-weight: 600;
  font-family: 'Noto Sans SC', sans-serif;
}

.contact-bar {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5pt;
  color: #64748b;
}

.sec {
  margin-bottom: 18px;
}

.sec h2 {
  margin: 0 0 12px;
  font-size: 9pt;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace;
}

.sec > p {
  margin: 0;
  color: #475569;
  text-align: justify;
}

.timeline-item {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #14b8a6;
  margin-top: 5px;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px #ccfbf1;
}

.content {
  flex: 1;
}

.item-head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.item-head strong {
  font-size: 11pt;
  font-family: 'Noto Sans SC', sans-serif;
}

.item-head span {
  font-size: 8.5pt;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
}

.role {
  margin: 2px 0 4px;
  color: #0d9488;
  font-weight: 600;
  font-size: 10pt;
  font-family: 'Noto Sans SC', sans-serif;
}

ul {
  margin: 4px 0 0;
  padding-left: 1em;
  color: #475569;
  font-size: 10pt;
  font-family: 'Noto Sans SC', sans-serif;
}

.row-item {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px 12px;
}

.row-item strong {
  grid-column: 1;
  font-family: 'Noto Sans SC', sans-serif;
}

.row-item span {
  grid-column: 2;
  font-size: 8.5pt;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace;
}

.row-item p {
  grid-column: 1 / -1;
  margin: 0;
  color: #64748b;
  font-size: 9.5pt;
  font-family: 'Noto Sans SC', sans-serif;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags span {
  padding: 6px 14px;
  background: #0f172a;
  color: #5eead4;
  font-size: 9pt;
  font-family: 'JetBrains Mono', monospace;
  border-radius: 4px;
}
</style>
