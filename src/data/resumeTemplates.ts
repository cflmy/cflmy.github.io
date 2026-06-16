export type ResumeLayout = 'classic' | 'sidebar' | 'banner' | 'minimal';

export interface ResumeTemplate {
  id: string;
  name: string;
  desc: string;
  layout: ResumeLayout;
  /** Word 导出用 */
  docx: {
    headingColor: string;
    nameColor: string;
    accentColor: string;
  };
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'classic',
    name: '经典商务',
    desc: '居中标题 · 稳重蓝调',
    layout: 'classic',
    docx: { headingColor: '1a365d', nameColor: '1a365d', accentColor: '2c5282' },
  },
  {
    id: 'sidebar',
    name: '侧边栏',
    desc: '双栏布局 · 信息分区清晰',
    layout: 'sidebar',
    docx: { headingColor: '134e4a', nameColor: 'ffffff', accentColor: '0d9488' },
  },
  {
    id: 'banner',
    name: '顶栏渐变',
    desc: '渐变页眉 · 视觉突出',
    layout: 'banner',
    docx: { headingColor: '5b21b6', nameColor: 'ffffff', accentColor: '7c3aed' },
  },
  {
    id: 'minimal',
    name: '极简标签',
    desc: '大标题 · 技能标签化',
    layout: 'minimal',
    docx: { headingColor: '0f766e', nameColor: '0f172a', accentColor: '14b8a6' },
  },
];

export function getResumeTemplate(id: string): ResumeTemplate {
  return RESUME_TEMPLATES.find((t) => t.id === id) ?? RESUME_TEMPLATES[0];
}
