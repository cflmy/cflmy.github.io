export type ToolCategory = 'utility';

export interface ToolMeta {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: ToolCategory;
  /** 卷轴序号，首页展示用 */
  indexLabel: string;
  /** 一句意象说明 */
  verse: string;
}

export const CATEGORIES: Record<ToolCategory, string> = {
  utility: '实用工具',
};

export const tools: ToolMeta[] = [
  {
    id: 'qrcode',
    indexLabel: '壹',
    name: '二维码',
    desc: '将链接或文本转为二维码，可下载',
    verse: '一码即达，随取随用',
    icon: '▣',
    category: 'utility',
  },
  {
    id: 'image-compress',
    indexLabel: '贰',
    name: '图片压缩',
    desc: '本地压缩图片，可调质量与尺寸',
    verse: '轻若无物，清晰依旧',
    icon: '🖼',
    category: 'utility',
  },
  {
    id: 'word-format',
    indexLabel: '叁',
    name: 'Word 排版',
    desc: '上传 docx，一键套用论文/公文格式',
    verse: '一纸成章，风过无痕',
    icon: 'W',
    category: 'utility',
  },
  {
    id: 'resume',
    indexLabel: '肆',
    name: '简历生成',
    desc: '填写信息生成简历，导出 Word / PDF',
    verse: '整装待发，随风而行',
    icon: 'CV',
    category: 'utility',
  },
];

export function getTool(id: string) {
  return tools.find((t) => t.id === id);
}
