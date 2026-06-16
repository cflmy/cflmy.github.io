export type ToolCategory = 'utility';

export interface ToolMeta {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: ToolCategory;
}

export const CATEGORIES: Record<ToolCategory, string> = {
  utility: '实用工具',
};

export const tools: ToolMeta[] = [
  {
    id: 'qrcode',
    name: '二维码',
    desc: '将链接或文本转为二维码，可下载',
    icon: '▣',
    category: 'utility',
  },
  {
    id: 'image-compress',
    name: '图片压缩',
    desc: '本地压缩图片，可调质量与尺寸',
    icon: '🖼',
    category: 'utility',
  },
  {
    id: 'word-format',
    name: 'Word 排版',
    desc: '上传 docx，一键套用论文/公文格式',
    icon: 'W',
    category: 'utility',
  },
  {
    id: 'resume',
    name: '简历生成',
    desc: '填写信息生成简历，导出 Word / PDF',
    icon: 'CV',
    category: 'utility',
  },
];

export function getTool(id: string) {
  return tools.find((t) => t.id === id);
}
