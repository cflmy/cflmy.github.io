<template>
  <div class="resume-tool">
    <div class="form-side">
      <ToolPanel title="填写简历信息" hint="左侧编辑，右侧实时预览；数据仅存于浏览器">
        <div class="template-picker">
          <p class="template-picker-label">简历模板</p>
          <div class="template-grid">
            <button
              v-for="tpl in RESUME_TEMPLATES"
              :key="tpl.id"
              type="button"
              class="template-card"
              :class="{ active: templateId === tpl.id }"
              @click="templateId = tpl.id"
            >
              <span class="template-swatch" :class="`swatch-${tpl.layout}`" />
              <span class="template-name">{{ tpl.name }}</span>
              <span class="template-desc">{{ tpl.desc }}</span>
            </button>
          </div>
        </div>

        <button type="button" class="btn btn-sm" @click="loadSample">填入示例</button>

        <div class="field">
          <label>姓名</label>
          <input v-model="data.name" class="tool-input" placeholder="张三" />
        </div>
        <div class="field">
          <label>意向岗位</label>
          <input v-model="data.title" class="tool-input" placeholder="前端开发工程师" />
        </div>

        <div class="field photo-field">
          <label>证件照</label>
          <div class="photo-upload">
            <div class="photo-preview">
              <img v-if="data.photo" :src="data.photo" alt="证件照预览" />
              <span v-else class="photo-empty">未上传</span>
            </div>
            <div class="photo-actions">
              <label class="btn btn-sm photo-btn">
                {{ data.photo ? '更换照片' : '上传照片' }}
                <input type="file" accept="image/*" class="photo-input" @change="onPhotoChange" />
              </label>
              <button v-if="data.photo" type="button" class="btn btn-sm remove" @click="clearPhoto">
                移除
              </button>
            </div>
          </div>
          <p class="photo-hint">建议半身照，自动居中裁剪并压缩，仅保存在浏览器中</p>
          <p v-if="photoError" class="err-msg">{{ photoError }}</p>
        </div>

        <div class="field-row">
          <div class="field">
            <label>手机</label>
            <input v-model="data.phone" class="tool-input" />
          </div>
          <div class="field">
            <label>邮箱</label>
            <input v-model="data.email" class="tool-input" />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label>所在地</label>
            <input v-model="data.location" class="tool-input" />
          </div>
          <div class="field">
            <label>个人网站</label>
            <input v-model="data.website" class="tool-input" />
          </div>
        </div>
        <div class="field">
          <label>个人简介</label>
          <textarea v-model="data.summary" class="tool-textarea" rows="3" />
        </div>

        <div class="block">
          <div class="block-head">
            <span>教育经历</span>
            <button type="button" class="btn btn-sm" @click="data.educations.push(emptyEducation())">+ 添加</button>
          </div>
          <div v-for="(e, i) in data.educations" :key="i" class="sub-block">
            <input v-model="e.school" class="tool-input" placeholder="学校" />
            <input v-model="e.degree" class="tool-input" placeholder="学历 / 专业" />
            <input v-model="e.period" class="tool-input" placeholder="2018.09 - 2022.06" />
            <input v-model="e.detail" class="tool-input" placeholder="补充说明（可选）" />
            <button
              v-if="data.educations.length > 1"
              type="button"
              class="btn btn-sm remove"
              @click="data.educations.splice(i, 1)"
            >
              删除
            </button>
          </div>
        </div>

        <div class="block">
          <div class="block-head">
            <span>工作经历</span>
            <button type="button" class="btn btn-sm" @click="data.experiences.push(emptyExperience())">+ 添加</button>
          </div>
          <div v-for="(e, i) in data.experiences" :key="i" class="sub-block">
            <input v-model="e.company" class="tool-input" placeholder="公司" />
            <input v-model="e.role" class="tool-input" placeholder="职位" />
            <input v-model="e.period" class="tool-input" placeholder="2022.07 - 至今" />
            <textarea
              v-model="e.bullets"
              class="tool-textarea"
              rows="3"
              placeholder="工作描述，每行一条"
            />
            <button
              v-if="data.experiences.length > 1"
              type="button"
              class="btn btn-sm remove"
              @click="data.experiences.splice(i, 1)"
            >
              删除
            </button>
          </div>
        </div>

        <div class="block">
          <div class="block-head">
            <span>项目经历</span>
            <button type="button" class="btn btn-sm" @click="data.projects.push(emptyProject())">+ 添加</button>
          </div>
          <div v-for="(p, i) in data.projects" :key="i" class="sub-block">
            <input v-model="p.name" class="tool-input" placeholder="项目名称" />
            <input v-model="p.period" class="tool-input" placeholder="时间" />
            <textarea v-model="p.desc" class="tool-textarea" rows="2" placeholder="项目描述" />
            <button
              v-if="data.projects.length > 1"
              type="button"
              class="btn btn-sm remove"
              @click="data.projects.splice(i, 1)"
            >
              删除
            </button>
          </div>
        </div>

        <div class="field">
          <label>技能（逗号分隔）</label>
          <input v-model="data.skills" class="tool-input" placeholder="Vue, TypeScript, JavaScript" />
        </div>

        <div class="export-row">
          <button class="btn btn-primary" :disabled="!!exporting" @click="exportWord">
            {{ exporting === 'word' ? '导出中…' : '导出 Word' }}
          </button>
          <button class="btn btn-primary" :disabled="!!exporting" @click="exportPdf">
            {{ exporting === 'pdf' ? '导出中…' : '导出 PDF' }}
          </button>
        </div>
        <p v-if="error" class="err-msg">{{ error }}</p>
        <p v-if="ok" class="ok-msg">✓ 已导出</p>
      </ToolPanel>
    </div>

    <div class="preview-side">
      <p class="preview-label">实时预览</p>
      <div class="preview-scroll">
        <ResumePreview ref="previewRef" :data="data" :template-id="templateId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import ToolPanel from '@/components/ToolPanel.vue';
import ResumePreview from '@/components/ResumePreview.vue';
import { SAMPLE_RESUME } from '@/data/resumeDefaults';
import { RESUME_TEMPLATES } from '@/data/resumeTemplates';
import type { ResumeData } from '@/types/resume';
import { emptyEducation, emptyExperience, emptyProject } from '@/types/resume';
import { exportResumeDocx, exportResumePdf } from '@/utils/resumeExport';
import { processResumePhoto } from '@/utils/resumePhoto';

const data = reactive<ResumeData>(structuredClone(SAMPLE_RESUME));
const templateId = ref('classic');
const previewRef = ref<InstanceType<typeof ResumePreview> | null>(null);
const exporting = ref<'word' | 'pdf' | ''>('');
const error = ref('');
const photoError = ref('');
const ok = ref(false);

function loadSample() {
  Object.assign(data, structuredClone(SAMPLE_RESUME));
}

async function onPhotoChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;

  photoError.value = '';
  if (!file.type.startsWith('image/')) {
    photoError.value = '请选择图片文件';
    return;
  }

  try {
    data.photo = await processResumePhoto(file);
  } catch (err) {
    photoError.value = err instanceof Error ? err.message : '照片处理失败';
  }
}

function clearPhoto() {
  data.photo = '';
  photoError.value = '';
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function fileBase() {
  return (data.name.trim() || '简历').replace(/[\\/:*?"<>|]/g, '_');
}

async function exportWord() {
  exporting.value = 'word';
  error.value = '';
  ok.value = false;
  try {
    const blob = await exportResumeDocx(data, templateId.value);
    downloadBlob(blob, `${fileBase()}.docx`);
    ok.value = true;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Word 导出失败';
  } finally {
    exporting.value = '';
  }
}

async function exportPdf() {
  exporting.value = 'pdf';
  error.value = '';
  ok.value = false;
  try {
    const el = previewRef.value?.getRootEl();
    if (!el) throw new Error('预览区域未就绪');
    await exportResumePdf(el, `${fileBase()}.pdf`);
    ok.value = true;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'PDF 导出失败';
  } finally {
    exporting.value = '';
  }
}
</script>

<style scoped>
.resume-tool {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 960px) {
  .resume-tool {
    grid-template-columns: 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.8rem;
  color: #64748b;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 560px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}

.block {
  border-top: 1px solid var(--color-border);
  padding-top: 14px;
}

.block-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 600;
}

.sub-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
}

.remove {
  align-self: flex-start;
  color: #f87171;
}

.export-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.preview-side {
  position: sticky;
  top: 72px;
}

.preview-label {
  margin: 0 0 10px;
  font-size: 0.85rem;
  color: #64748b;
}

.preview-scroll {
  overflow: auto;
  max-height: calc(100vh - 120px);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: #1e293b;
  padding: 16px;
}

.preview-scroll :deep(.tpl) {
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}

.template-picker {
  margin-bottom: 16px;
}

.template-picker-label {
  margin: 0 0 8px;
  font-size: 0.8rem;
  color: #64748b;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (max-width: 560px) {
  .template-grid {
    grid-template-columns: 1fr;
  }
}

.template-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid var(--color-border);
  background: rgba(0, 0, 0, 0.15);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.template-card:hover {
  border-color: #475569;
}

.template-card.active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.template-swatch {
  width: 100%;
  height: 28px;
  border-radius: 4px;
  margin-bottom: 2px;
}

.swatch-classic {
  background: linear-gradient(180deg, #f8fafc 40%, #1a365d 40%);
}

.swatch-sidebar {
  background: linear-gradient(90deg, #0d9488 32%, #f8fafc 32%);
}

.swatch-banner {
  background: linear-gradient(180deg, #7c3aed 28%, #f8fafc 28%);
}

.swatch-minimal {
  background: linear-gradient(180deg, #f8fafc 50%, #14b8a6 50%);
  border: 1px solid #e2e8f0;
}

.template-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #e2e8f0;
}

.template-desc {
  font-size: 0.72rem;
  color: #94a3b8;
  line-height: 1.3;
}

.photo-field {
  margin-bottom: 4px;
}

.photo-upload {
  display: flex;
  align-items: center;
  gap: 14px;
}

.photo-preview {
  width: 72px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-empty {
  font-size: 0.75rem;
  color: #64748b;
}

.photo-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.photo-btn {
  cursor: pointer;
  margin: 0;
}

.photo-input {
  display: none;
}

.photo-hint {
  margin: 6px 0 0;
  font-size: 0.72rem;
  color: #64748b;
  line-height: 1.4;
}
</style>
