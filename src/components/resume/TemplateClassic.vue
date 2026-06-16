<template>
  <div ref="rootRef" class="tpl classic">
    <header class="head">
      <div class="head-row">
        <div class="head-main">
          <h1>{{ data.name || '您的姓名' }}</h1>
          <p class="title">{{ data.title || '意向岗位' }}</p>
          <div class="contact">
            <span v-if="data.phone">📱 {{ data.phone }}</span>
            <span v-if="data.email">✉ {{ data.email }}</span>
            <span v-if="data.location">📍 {{ data.location }}</span>
            <span v-if="data.website">🔗 {{ data.website }}</span>
          </div>
        </div>
        <ResumePhoto :src="data.photo" :name="data.name" variant="classic" shape="square" />
      </div>
    </header>

    <section v-if="data.summary.trim()" class="sec">
      <h2><span>个人简介</span></h2>
      <p class="summary">{{ data.summary }}</p>
    </section>

    <section v-if="educations.length" class="sec">
      <h2><span>教育经历</span></h2>
      <div v-for="(e, i) in educations" :key="i" class="item">
        <div class="item-head">
          <strong>{{ e.school }}</strong>
          <em>{{ e.period }}</em>
        </div>
        <p class="sub">{{ e.degree }}</p>
        <p v-if="e.detail" class="detail">{{ e.detail }}</p>
      </div>
    </section>

    <section v-if="experiences.length" class="sec">
      <h2><span>工作经历</span></h2>
      <div v-for="(e, i) in experiences" :key="i" class="item">
        <div class="item-head">
          <strong>{{ e.company }}</strong>
          <em>{{ e.period }}</em>
        </div>
        <p class="sub role">{{ e.role }}</p>
        <ul v-if="bullets(e.bullets).length">
          <li v-for="(b, j) in bullets(e.bullets)" :key="j">{{ b }}</li>
        </ul>
      </div>
    </section>

    <section v-if="projects.length" class="sec">
      <h2><span>项目经历</span></h2>
      <div v-for="(p, i) in projects" :key="i" class="item">
        <div class="item-head">
          <strong>{{ p.name }}</strong>
          <em>{{ p.period }}</em>
        </div>
        <p v-if="p.desc" class="detail">{{ p.desc }}</p>
      </div>
    </section>

    <section v-if="skills.length" class="sec">
      <h2><span>专业技能</span></h2>
      <div class="skill-row">
        <span v-for="(s, i) in skills" :key="i" class="skill-chip">{{ s }}</span>
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
  padding: 14mm 16mm;
  background: #fff;
  color: #1e293b;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
  box-sizing: border-box;
}

.head {
  padding-bottom: 14px;
  margin-bottom: 18px;
  border-bottom: 3px solid #2c5282;
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
  margin: -14mm -16mm 18px;
  padding: 18mm 16mm 14px;
}

.head-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.head-main {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.head h1 {
  margin: 0;
  font-size: 26pt;
  font-weight: 800;
  color: #1e3a5f;
  letter-spacing: 0.06em;
}

.title {
  margin: 8px 0 0;
  font-size: 13pt;
  color: #3b82f6;
  font-weight: 500;
}

.contact {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-size: 9pt;
  color: #64748b;
  justify-content: flex-start;
}

.sec {
  margin-bottom: 16px;
}

.sec h2 {
  margin: 0 0 10px;
  font-size: 11pt;
  font-weight: 700;
  color: #1e3a5f;
}

.sec h2 span {
  display: inline-block;
  padding-bottom: 4px;
  border-bottom: 2px solid #3b82f6;
}

.item {
  margin-bottom: 12px;
  padding-left: 10px;
  border-left: 3px solid #e2e8f0;
}

.item-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.item-head strong {
  font-size: 11pt;
  color: #0f172a;
}

.item-head em {
  font-style: normal;
  font-size: 9pt;
  color: #64748b;
  white-space: nowrap;
}

.sub {
  margin: 3px 0;
  color: #475569;
}

.role {
  font-weight: 500;
  color: #3b82f6;
}

.detail,
.summary {
  margin: 4px 0 0;
  color: #475569;
  text-align: justify;
}

ul {
  margin: 6px 0 0;
  padding-left: 1.1em;
  color: #334155;
}

li {
  margin-bottom: 3px;
}

.skill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  padding: 4px 12px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 9.5pt;
  border: 1px solid #bfdbfe;
}
</style>
