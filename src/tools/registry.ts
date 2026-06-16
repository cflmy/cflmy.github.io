import type { Component } from 'vue';
import QrTool from '@/tools/QrTool.vue';
import ImageCompressTool from '@/tools/ImageCompressTool.vue';
import WordFormatTool from '@/tools/WordFormatTool.vue';
import ResumeTool from '@/tools/ResumeTool.vue';

/** 静态注册，避免生产环境动态 import 多 chunk 不同步导致 404 */
export const TOOL_COMPONENTS: Record<string, Component> = {
  qrcode: QrTool,
  'image-compress': ImageCompressTool,
  'word-format': WordFormatTool,
  resume: ResumeTool,
};
