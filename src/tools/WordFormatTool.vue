<template>
  <ToolPanel title="Word 格式调整" hint="仅支持 .docx，在浏览器本地处理，不上传服务器">
    <label class="upload">
      <input
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        class="file-input"
        @change="onFile"
      />
      <span v-if="!fileName">点击选择 Word 文档（.docx）</span>
      <span v-else>{{ fileName }}</span>
    </label>

    <div class="section">
      <label class="field-label">格式预设</label>
      <div class="preset-row">
        <button
          v-for="p in PRESETS"
          :key="p.id"
          type="button"
          class="preset-btn"
          :class="{ active: presetId === p.id }"
          @click="selectPreset(p.id)"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <div v-if="presetId === 'custom'" class="section custom-grid">
      <div>
        <label class="field-label">正文字体</label>
        <select v-model="customFontIdx" class="tool-input">
          <option v-for="(f, i) in FONT_OPTIONS" :key="f.label" :value="i">
            {{ f.label }}
          </option>
        </select>
      </div>
      <div>
        <label class="field-label">字号</label>
        <select v-model="customSizeHalfPt" class="tool-input">
          <option v-for="s in SIZE_OPTIONS" :key="s.halfPt" :value="s.halfPt">
            {{ s.label }}
          </option>
        </select>
      </div>
      <div>
        <label class="field-label">行距</label>
        <select v-model="customLineIdx" class="tool-input">
          <option v-for="(l, i) in LINE_OPTIONS" :key="l.label" :value="i">
            {{ l.label }}
          </option>
        </select>
      </div>
      <div>
        <label class="field-label">首行缩进</label>
        <select v-model="customIndent" class="tool-input">
          <option :value="0">无</option>
          <option :value="200">2 字符</option>
        </select>
      </div>
      <div class="span2">
        <label class="field-label">页边距（厘米）</label>
        <div class="margin-grid">
          <label>上 <input v-model.number="marginCm.top" type="number" step="0.1" class="tool-input" /></label>
          <label>下 <input v-model.number="marginCm.bottom" type="number" step="0.1" class="tool-input" /></label>
          <label>左 <input v-model.number="marginCm.left" type="number" step="0.1" class="tool-input" /></label>
          <label>右 <input v-model.number="marginCm.right" type="number" step="0.1" class="tool-input" /></label>
        </div>
      </div>
    </div>

    <label class="check">
      <input v-model="applyToHeadings" type="checkbox" />
      同时调整标题段落（默认仅调整正文）
    </label>

    <div class="summary" v-if="sourceFile">
      <p>将应用：{{ summaryText }}</p>
    </div>

    <button class="btn btn-primary" :disabled="!sourceFile || loading" @click="process">
      {{ loading ? '处理中…' : '一键调整格式' }}
    </button>

    <p v-if="error" class="err-msg">{{ error }}</p>
    <p v-if="success" class="ok-msg">✓ 格式已调整，可下载</p>

    <a v-if="downloadUrl" :href="downloadUrl" :download="downloadName" class="btn btn-primary download">
      下载文档
    </a>

    <p class="note">
      说明：复杂表格、文本框、公式等可能无法完美保留；老版 .doc 请先另存为 .docx。
    </p>
  </ToolPanel>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import ToolPanel from '@/components/ToolPanel.vue';
import {
  cmToTwips,
  defaultDownloadName,
  FONT_OPTIONS,
  formatDocx,
  LINE_OPTIONS,
  PRESETS,
  SIZE_OPTIONS,
  type PresetId,
  type WordFormatOptions,
} from '@/utils/wordFormat';

const sourceFile = ref<File | null>(null);
const fileName = ref('');
const presetId = ref<PresetId>('thesis');
const applyToHeadings = ref(false);
const loading = ref(false);
const error = ref('');
const success = ref(false);
const downloadUrl = ref('');
const downloadName = ref('formatted.docx');

const customFontIdx = ref(0);
const customSizeHalfPt = ref(24);
const customLineIdx = ref(1);
const customIndent = ref(200);
const marginCm = reactive({ top: 2.54, bottom: 2.54, left: 3.17, right: 3.17 });

function selectPreset(id: PresetId) {
  presetId.value = id;
  if (id === 'custom') return;
  const p = PRESETS.find((x) => x.id === id)!;
  applyToHeadings.value = p.options.applyToHeadings;
}

const currentOptions = computed((): WordFormatOptions => {
  if (presetId.value !== 'custom') {
    const p = PRESETS.find((x) => x.id === presetId.value)!;
    return { ...p.options, applyToHeadings: applyToHeadings.value };
  }

  const font = FONT_OPTIONS[customFontIdx.value];
  const line = LINE_OPTIONS[customLineIdx.value];

  return {
    fontEastAsia: font.eastAsia,
    fontAscii: font.ascii,
    fontSizeHalfPt: customSizeHalfPt.value,
    lineRule: line.rule,
    lineValue: line.value,
    firstLineIndentChars: customIndent.value,
    marginTop: cmToTwips(marginCm.top),
    marginBottom: cmToTwips(marginCm.bottom),
    marginLeft: cmToTwips(marginCm.left),
    marginRight: cmToTwips(marginCm.right),
    applyToHeadings: applyToHeadings.value,
  };
});

const summaryText = computed(() => {
  const o = currentOptions.value;
  const pt = o.fontSizeHalfPt / 2;
  const line =
    o.lineRule === 'auto'
      ? o.lineValue === 240
        ? '单倍'
        : o.lineValue === 360
          ? '1.5 倍'
          : '双倍'
      : '固定行距';
  return `${o.fontEastAsia} ${pt}pt · ${line} · 首行缩进 ${o.firstLineIndentChars ? '2 字符' : '无'}`;
});

function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  error.value = '';
  success.value = false;
  if (downloadUrl.value) URL.revokeObjectURL(downloadUrl.value);
  downloadUrl.value = '';

  sourceFile.value = file;
  fileName.value = file.name;
  downloadName.value = defaultDownloadName(file.name);
}

async function process() {
  if (!sourceFile.value) return;
  loading.value = true;
  error.value = '';
  success.value = false;

  try {
    const blob = await formatDocx(sourceFile.value, currentOptions.value);
    if (downloadUrl.value) URL.revokeObjectURL(downloadUrl.value);
    downloadUrl.value = URL.createObjectURL(blob);
    success.value = true;
  } catch (err) {
    error.value = err instanceof Error ? err.message : '处理失败';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.upload {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;
  padding: 20px;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
}

.upload:hover {
  border-color: var(--color-border-strong);
  background: rgba(14, 165, 233, 0.04);
}

.file-input {
  display: none;
}

.section {
  margin-top: 4px;
}

.field-label {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 8px;
}

.preset-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preset-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: #94a3b8;
  font-size: 0.875rem;
  cursor: pointer;
}

.preset-btn.active {
  border-color: var(--color-border-strong);
  color: var(--color-wind);
  background: rgba(14, 165, 233, 0.08);
}

.custom-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr 1fr;
}

.span2 {
  grid-column: 1 / -1;
}

.margin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.margin-grid label {
  font-size: 0.8rem;
  color: #64748b;
}

.check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #94a3b8;
  cursor: pointer;
}

.summary {
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(14, 165, 233, 0.06);
  border: 1px solid rgba(14, 165, 233, 0.12);
  font-size: 0.85rem;
  color: var(--color-muted);
}

.summary p {
  margin: 0;
}

.download {
  display: inline-flex;
  text-decoration: none;
  width: fit-content;
}

.note {
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 560px) {
  .custom-grid {
    grid-template-columns: 1fr;
  }
}
</style>
