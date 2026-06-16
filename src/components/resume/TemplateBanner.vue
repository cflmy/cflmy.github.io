<template>
  <div ref="rootRef" class="tpl banner">
    <header class="banner-head">
      <div class="banner-inner">
        <ResumePhoto :src="data.photo" :name="data.name" variant="banner" shape="round" />
        <div class="banner-text">
          <h1>{{ data.name || '您的姓名' }}</h1>
          <p class="title">{{ data.title || '意向岗位' }}</p>
          <div class="contact">
            <span v-if="data.phone">{{ data.phone }}</span>
            <span v-if="data.email">{{ data.email }}</span>
            <span v-if="data.location">{{ data.location }}</span>
            <span v-if="data.website">{{ data.website }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="body">
      <section v-if="data.summary.trim()" class="card">
        <h2>✦ 个人简介</h2>
        <p>{{ data.summary }}</p>
      </section>

      <section v-if="experiences.length" class="card">
        <h2>✦ 工作经历</h2>
        <div v-for="(e, i) in experiences" :key="i" class="item">
          <div class="item-head">
            <strong>{{ e.company }}</strong>
            <span class="badge">{{ e.period }}</span>
          </div>
          <p class="role">{{ e.role }}</p>
          <ul v-if="bullets(e.bullets).length">
            <li v-for="(b, j) in bullets(e.bullets)" :key="j">{{ b }}</li>
          </ul>
        </div>
      </section>

      <div class="two-col">
        <section v-if="educations.length" class="card">
          <h2>✦ 教育经历</h2>
          <div v-for="(e, i) in educations" :key="i" class="item compact">
            <strong>{{ e.school }}</strong>
            <p class="sub">{{ e.degree }} · {{ e.period }}</p>
          </div>
        </section>

        <section v-if="projects.length" class="card">
          <h2>✦ 项目经历</h2>
          <div v-for="(p, i) in projects" :key="i" class="item compact">
            <strong>{{ p.name }}</strong>
            <p class="sub">{{ p.period }}</p>
            <p v-if="p.desc" class="detail">{{ p.desc }}</p>
          </div>
        </section>
      </div>

      <section v-if="skills.length" class="card skills-card">
        <h2>✦ 专业技能</h2>
        <div class="skill-pills">
          <span v-for="(s, i) in skills" :key="i">{{ s }}</span>
        </div>
      </section>
    </div>
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
  background: #f5f3ff;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 10pt;
  box-sizing: border-box;
}

.banner-head {
  background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #a855f7 100%);
  padding: 16mm 14mm 14mm;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.banner-head::after {
  content: '';
  position: absolute;
  right: -30px;
  top: -30px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.banner-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
}

.banner-text {
  flex: 1;
  min-width: 0;
}

.banner-head h1 {
  margin: 0;
  font-size: 24pt;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.title {
  margin: 8px 0 0;
  font-size: 12pt;
  opacity: 0.92;
}

.contact {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  font-size: 9pt;
  opacity: 0.88;
}

.contact span::before {
  content: '· ';
  opacity: 0.6;
}

.contact span:first-child::before {
  content: '';
}

.body {
  padding: 10mm 12mm 14mm;
}

.card {
  background: #fff;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px rgba(109, 40, 217, 0.08);
  border: 1px solid #ede9fe;
}

.card h2 {
  margin: 0 0 10px;
  font-size: 11pt;
  color: #6d28d9;
  font-weight: 700;
}

.card > p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
  text-align: justify;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.item {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #e9d5ff;
}

.item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.item.compact {
  border: none;
  padding: 0;
  margin-bottom: 8px;
}

.item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.item-head strong {
  color: #1e1b4b;
  font-size: 10.5pt;
}

.badge {
  font-size: 8pt;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f3e8ff;
  color: #7c3aed;
  white-space: nowrap;
}

.role {
  margin: 4px 0;
  color: #7c3aed;
  font-weight: 600;
  font-size: 9.5pt;
}

.sub,
.detail {
  margin: 2px 0;
  font-size: 9pt;
  color: #64748b;
}

ul {
  margin: 4px 0 0;
  padding-left: 1.1em;
  color: #475569;
  font-size: 9.5pt;
}

.skill-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-pills span {
  padding: 5px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ede9fe, #f3e8ff);
  color: #5b21b6;
  font-size: 9pt;
  font-weight: 500;
  border: 1px solid #ddd6fe;
}
</style>
