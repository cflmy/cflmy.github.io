import type { ResumeData } from '@/types/resume';
import { emptyEducation, emptyExperience, emptyProject } from '@/types/resume';

export const SAMPLE_RESUME: ResumeData = {
  name: '张三',
  title: '前端开发工程师',
  photo: '',
  email: 'zhangsan@example.com',
  phone: '138-0000-0000',
  location: '安徽 · 合肥',
  website: 'https://www.cflmy.cn',
  summary:
    '3 年前端开发经验，熟悉 Vue、TypeScript 与工程化实践，注重用户体验与代码质量，有完整产品从 0 到 1 的落地经验。',
  educations: [
    {
      school: '某某大学',
      degree: '计算机科学与技术 · 本科',
      period: '2018.09 - 2022.06',
      detail: '主修课程：数据结构、操作系统、软件工程',
    },
  ],
  experiences: [
    {
      company: '某某科技有限公司',
      role: '前端开发工程师',
      period: '2022.07 - 至今',
      bullets:
        '负责公司核心产品 Web 端开发与维护\n使用 Vue3 + TypeScript 重构旧版后台，首屏加载提升 40%\n参与组件库建设，沉淀 20+ 业务组件',
    },
    {
      company: '某某互联网公司',
      role: '前端实习生',
      period: '2021.06 - 2021.12',
      bullets: '参与活动页 H5 开发，配合设计完成多端适配\n协助排查并修复线上兼容性问题',
    },
  ],
  projects: [
    {
      name: '长风工具箱',
      period: '2025',
      desc: '纯前端在线工具合集，支持二维码、图片压缩、Word 排版等功能，GitHub Pages 部署。',
    },
  ],
  skills: 'Vue, TypeScript, JavaScript, HTML/CSS, Node.js, Git, Vite',
};

export function createEmptyResume(): ResumeData {
  return {
    name: '',
    title: '',
    photo: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    educations: [emptyEducation()],
    experiences: [emptyExperience()],
    projects: [emptyProject()],
    skills: '',
  };
}
