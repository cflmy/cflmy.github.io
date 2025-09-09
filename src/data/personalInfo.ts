// 定义个人信息数据
export const personalInfo = {
  name: '平安',
  title: '网络开发爱好者',
  bio: '热爱技术、喜欢创造。',
  skills: ['C/C++', 'Python', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Vue', 'Vite', 'PHP'],
  projects: [
    {
      title: 'CFLMY-创明笔记',
      description: '使用C++的Crow框架结合Postgresql开发的后端API，Vite+Vue开发前端生成的卡片式笔记项目',
      image: 'https://openlist.cflmy.cn/sd/iv5f06Iw/Web/pages/CFLMY.webp',
      technologies: ['C++', 'TypeScript', 'Vue', 'Vite', 'Postgresql']
    },
    {
      title: 'CFLMY-个人博客',
      description: '基于Mkdocs的个人博客系统',
      image: 'https://openlist.cflmy.cn/sd/iv5f06Iw/Web/pages/desktop1.webp',
      technologies: ['Python', 'Markdown', 'Html', 'CSS']
    }
  ],
  contact: {
    email: 'pingan@cflmy.cn',
    phone: '150-3685-9798',
    github: 'https://github.com/cflmy'
  }
}

export type Project = typeof personalInfo.projects[0]
export type ContactInfo = typeof personalInfo.contact