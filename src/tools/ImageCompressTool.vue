<template>
  <ToolPanel title="图片压缩" hint="使用 Canvas 在本地压缩，图片不会上传">
    <label class="upload">
      <input type="file" accept="image/*" class="file-input" @change="onFile" />
      <span v-if="!fileName">点击或拖拽选择图片</span>
      <span v-else>{{ fileName }}</span>
    </label>

    <div class="opts">
      <div class="opt">
        <label>最大宽度（0 = 不缩放）</label>
        <input v-model.number="maxWidth" type="range" min="0" max="3840" step="100" @input="compress" />
        <span>{{ maxWidth || '原始' }}px</span>
      </div>
      <div class="opt">
        <label>质量（JPEG / WebP）</label>
        <input
          v-model.number="quality"
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          :disabled="format === 'image/png'"
          @input="compress"
        />
        <span>{{ Math.round(quality * 100) }}%</span>
      </div>
      <div class="opt">
        <label>输出格式</label>
        <select v-model="format" class="tool-input" @change="compress">
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WebP</option>
          <option value="image/png">PNG</option>
        </select>
      </div>
    </div>

    <button class="btn btn-primary" :disabled="!sourceFile || loading" @click="compress">
      {{ loading ? '压缩中…' : '重新压缩' }}
    </button>
    <p v-if="error" class="err-msg">{{ error }}</p>

    <div v-if="originalUrl" class="compare">
      <div class="compare-col">
        <p class="label">原图</p>
        <img :src="originalUrl" alt="原图" class="preview" />
        <p class="meta">{{ originalSize }} · {{ originalDims }}</p>
      </div>
      <div class="compare-col">
        <p class="label">压缩后</p>
        <img v-if="resultUrl" :src="resultUrl" alt="压缩后" class="preview" />
        <p v-if="resultSize" class="meta">
          {{ resultSize }}
          <span v-if="savedPercent !== null" class="saved">（节省 {{ savedPercent }}%）</span>
          · {{ resultDims }}
        </p>
      </div>
    </div>

    <a
      v-if="downloadUrl && sourceFile"
      :href="downloadUrl"
      :download="downloadName"
      class="btn btn-primary download"
    >
      下载压缩图
    </a>
  </ToolPanel>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import ToolPanel from '@/components/ToolPanel.vue';
import {
  compressImage,
  extForFormat,
  formatBytes,
  loadImage,
  type ImageOutputFormat,
} from '@/utils/imageCompress';

const sourceFile = ref<File | null>(null);
const fileName = ref('');
const maxWidth = ref(1920);
const quality = ref(0.82);
const format = ref<ImageOutputFormat>('image/jpeg');
const loading = ref(false);
const error = ref('');

const originalUrl = ref('');
const resultUrl = ref('');
const downloadUrl = ref('');
const originalBytes = ref(0);
const resultBytes = ref(0);
const originalDims = ref('');
const resultDims = ref('');

const originalSize = computed(() => formatBytes(originalBytes.value));
const resultSize = computed(() => (resultBytes.value ? formatBytes(resultBytes.value) : ''));
const savedPercent = computed(() => {
  if (!originalBytes.value || !resultBytes.value) return null;
  const p = Math.round((1 - resultBytes.value / originalBytes.value) * 100);
  return p > 0 ? p : 0;
});
const downloadName = computed(() => {
  if (!sourceFile.value) return 'compressed.jpg';
  const base = sourceFile.value.name.replace(/\.[^.]+$/, '');
  return `${base}-compressed.${extForFormat(format.value)}`;
});

let objectUrls: string[] = [];

function trackUrl(url: string) {
  objectUrls.push(url);
  return url;
}

function revokeUrls() {
  objectUrls.forEach((u) => URL.revokeObjectURL(u));
  objectUrls = [];
}

async function onFile(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  revokeUrls();
  error.value = '';
  sourceFile.value = file;
  fileName.value = file.name;
  originalBytes.value = file.size;
  originalUrl.value = trackUrl(URL.createObjectURL(file));

  try {
    const img = await loadImage(file);
    originalDims.value = `${img.naturalWidth} × ${img.naturalHeight}`;
    await compress();
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载失败';
  }
}

async function compress() {
  if (!sourceFile.value) return;
  loading.value = true;
  error.value = '';

  try {
    const img = await loadImage(sourceFile.value);
    const result = await compressImage(img, {
      maxWidth: maxWidth.value,
      quality: quality.value,
      format: format.value,
    });

    if (resultUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(resultUrl.value);
    }
    resultUrl.value = trackUrl(URL.createObjectURL(result.blob));
    downloadUrl.value = resultUrl.value;
    resultBytes.value = result.blob.size;
    resultDims.value = `${result.width} × ${result.height}`;
  } catch (err) {
    error.value = err instanceof Error ? err.message : '压缩失败';
  } finally {
    loading.value = false;
  }
}

onUnmounted(revokeUrls);
</script>

<style scoped>
.upload {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  padding: 24px;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.upload:hover {
  border-color: var(--color-border-strong);
  background: rgba(14, 165, 233, 0.04);
}

.file-input {
  display: none;
}

.opts {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.opt label {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 6px;
}

.opt input[type='range'] {
  width: 100%;
}

.opt span {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: #94a3b8;
}

.compare {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 640px) {
  .compare {
    grid-template-columns: 1fr;
  }
}

.compare-col .label {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 8px;
}

.preview {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: #f8fafc;
}

.meta {
  margin-top: 8px;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: #94a3b8;
}

.saved {
  color: var(--color-wind);
}

.download {
  display: inline-flex;
  text-decoration: none;
  width: fit-content;
}
</style>
