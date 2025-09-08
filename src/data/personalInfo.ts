// 定义个人信息数据
export const personalInfo = {
  name: '张三',
  title: '前端开发工程师',
  bio: '热爱技术、喜欢创造，专注于构建优雅的用户界面和流畅的用户体验。',
  skills: ['Vue.js', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Node.js', 'Vite', 'Webpack'],
  projects: [
    {
      title: '电商平台',
      description: '使用Vue 3和TypeScript开发的现代化电商平台，包含完整的购物流程。',
      image: 'https://placehold.co/400x300/e0e0e0/333333?text=电商平台',
      technologies: ['Vue 3', 'TypeScript', 'Pinia', 'Vite']
    },
    {
      title: '任务管理系统',
      description: '高效的团队协作工具，支持拖拽排序、实时更新和权限管理。',
      image: 'https://placehold.co/400x300/e0e0e0/333333?text=任务管理',
      technologies: ['React', 'Redux', 'Firebase', 'Styled Components']
    },
    {
      title: '个人博客',
      description: '基于Markdown的个人博客系统，支持代码高亮和响应式设计。',
      image: 'https://placehold.co/400x300/e0e0e0/333333?text=个人博客',
      technologies: ['Node.js', 'Express', 'MongoDB', 'EJS']
    }
  ],
  contact: {
    email: 'example@email.com',
    phone: '138-8888-8888',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
}

export type Project = typeof personalInfo.projects[0]
export type ContactInfo = typeof personalInfo.contact