<template>
  <div ref="rootRef" class="tpl sidebar">
    <aside class="side">
      <ResumePhoto :src="data.photo" :name="data.name" variant="sidebar" shape="round" />
      <h1>{{ data.name || '您的姓名' }}</h1>
      <p class="title">{{ data.title || '意向岗位' }}</p>

      <div class="side-block">
        <h3>联系方式</h3>
        <p v-if="data.phone">{{ data.phone }}</p>
        <p v-if="data.email">{{ data.email }}</p>
        <p v-if="data.location">{{ data.location }}</p>
        <p v-if="data.website" class="web">{{ data.website }}</p>
      </div>

      <div v-if="skills.length" class="side-block">
        <h3>专业技能</h3>
        <div class="skill-tags">
          <span v-for="(s, i) in skills" :key="i">{{ s }}</span>
        </div>
      </div>
    </aside>

    <main class="main">
      <section v-if="data.summary.trim()" class="sec">
        <h2>个人简介</h2>
        <p>{{ data.summary }}</p>
      </section>

      <section v-if="experiences.length" class="sec">
        <h2>工作经历</h2>
        <div v-for="(e, i) in experiences" :key="i" class="item">
          <div class="item-head">
            <strong>{{ e.company }}</strong>
            <span>{{ e.period }}</span>
          </div>
          <p class="role">{{ e.role }}</p>
          <ul v-if="bullets(e.bullets).length">
            <li v-for="(b, j) in bullets(e.bullets)" :key="j">{{ b }}</li>
          </ul>
        </div>
      </section>

      <section v-if="educations.length" class="sec">
        <h2>教育经历</h2>
        <div v-for="(e, i) in educations" :key="i" class="item">
          <div class="item-head">
            <strong>{{ e.school }}</strong>
            <span>{{ e.period }}</span>
          </div>
          <p class="sub">{{ e.degree }}</p>
          <p v-if="e.detail" class="detail">{{ e.detail }}</p>
        </div>
      </section>

      <section v-if="projects.length" class="sec">
        <h2>项目经历</h2>
        <div v-for="(p, i) in projects" :key="i" class="item">
          <div class="item-head">
            <strong>{{ p.name }}</strong>
            <span>{{ p.period }}</span>
          </div>
          <p v-if="p.desc" class="detail">{{ p.desc }}</p>
        </div>
      </section>
    </main>
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
  display: flex;
  background: #fff;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  box-sizing: border-box;
}

.side {
  width: 34%;
  min-height: 297mm;
  padding: 14mm 10mm;
  background: linear-gradient(165deg, #0f766e 0%, #134e4a 50%, #042f2e 100%);
  color: #ecfdf5;
  box-sizing: border-box;
}

.side :deep(.resume-photo) {
  margin-bottom: 12px;
}

.side h1 {
  margin: 0;
  font-size: 18pt;
  font-weight: 800;
  line-height: 1.3;
}

.title {
  margin: 6px 0 0;
  font-size: 10pt;
  color: #99f6e4;
}

.side-block {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.side-block h3 {
  margin: 0 0 8px;
  font-size: 9pt;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #5eead4;
}

.side-block p {
  margin: 4px 0;
  font-size: 9pt;
  word-break: break-all;
}

.web {
  opacity: 0.85;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tags span {
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 8.5pt;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.main {
  flex: 1;
  padding: 14mm 12mm;
  color: #1e293b;
}

.sec {
  margin-bottom: 16px;
}

.sec h2 {
  margin: 0 0 10px;
  font-size: 12pt;
  color: #0f766e;
  padding-left: 10px;
  border-left: 4px solid #14b8a6;
}

.sec > p {
  margin: 0;
  color: #475569;
  text-align: justify;
}

.item {
  margin-bottom: 12px;
}

.item-head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.item-head strong {
  font-size: 10.5pt;
  color: #0f172a;
}

.item-head span {
  font-size: 8.5pt;
  color: #94a3b8;
  white-space: nowrap;
}

.role {
  margin: 2px 0 4px;
  color: #0d9488;
  font-weight: 600;
  font-size: 9.5pt;
}

.sub,
.detail {
  margin: 2px 0;
  color: #64748b;
  font-size: 9.5pt;
}

ul {
  margin: 4px 0 0;
  padding-left: 1.1em;
  color: #475569;
  font-size: 9.5pt;
}
</style>
