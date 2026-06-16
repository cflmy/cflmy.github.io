<template>
  <ToolPanel title="二维码生成" hint="输入文本或链接，本地生成二维码">
    <textarea
      v-model="text"
      class="tool-textarea"
      rows="4"
      placeholder="https://www.cflmy.cn"
      @input="generate"
    />
    <div class="opts">
      <div class="opt">
        <label>尺寸</label>
        <input v-model.number="size" type="range" min="128" max="512" step="32" @input="generate" />
        <span>{{ size }}px</span>
      </div>
      <div class="opt">
        <label>边距</label>
        <input v-model.number="margin" type="range" min="0" max="8" step="1" @input="generate" />
        <span>{{ margin }}</span>
      </div>
    </div>
    <button class="btn btn-primary" @click="generate">生成</button>
    <p v-if="error" class="err-msg">{{ error }}</p>

    <div v-if="dataUrl" class="qr-wrap">
      <img :src="dataUrl" :width="size" :height="size" alt="二维码" />
      <div class="qr-actions">
        <a :href="dataUrl" :download="fileName" class="btn">下载 PNG</a>
        <CopyButton :text="dataUrl" label="复制 Data URL" />
      </div>
    </div>
  </ToolPanel>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import QRCode from 'qrcode';
import ToolPanel from '@/components/ToolPanel.vue';
import CopyButton from '@/components/CopyButton.vue';

const text = ref('https://www.cflmy.cn');
const size = ref(256);
const margin = ref(2);
const dataUrl = ref('');
const error = ref('');
const fileName = ref('qrcode.png');

async function generate() {
  error.value = '';
  if (!text.value.trim()) {
    dataUrl.value = '';
    return;
  }
  try {
    dataUrl.value = await QRCode.toDataURL(text.value, {
      width: size.value,
      margin: margin.value,
      color: { dark: '#0f172a', light: '#ffffff' },
    });
  } catch (e) {
    error.value = e instanceof Error ? e.message : '生成失败';
    dataUrl.value = '';
  }
}

onMounted(generate);
</script>

<style scoped>
.opts {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.opt {
  flex: 1;
  min-width: 160px;
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

.qr-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: #fff;
}

.qr-wrap img {
  display: block;
  border-radius: 8px;
}

.qr-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.qr-actions .btn {
  text-decoration: none;
}
</style>
