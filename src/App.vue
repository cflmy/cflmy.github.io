<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'

// 定义个人信息数据
const personalInfo = {
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

// 引用
const heroRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)
const projectsRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)
const skillRefs = ref<(Element | ComponentPublicInstance | null)[]>([])
const projectRefs = ref<(Element | ComponentPublicInstance | null)[]>([])



// 设置区域动画
function setupSectionAnimation(ref: Ref<HTMLElement | null>, delay: number) {
  if (ref.value) {
    ref.value.style.opacity = '0'
    ref.value.style.transform = 'translateY(30px)'
    ref.value.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`
    
    setTimeout(() => {
      if (ref.value) {
        ref.value.style.opacity = '1'
        ref.value.style.transform = 'translateY(0)'
      }
    }, delay * 1000)
  }
}

// 按钮悬停动画
function handleButtonHover(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  button.style.transform = 'translateY(-3px)'
  button.style.boxShadow = '0 5px 15px rgba(100, 108, 255, 0.3)'
  button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'
}

// 按钮离开动画
function handleButtonLeave(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  button.style.transform = 'translateY(0)'
  button.style.boxShadow = 'none'
}

// 项目卡片悬停动画
function handleProjectHover(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement
  card.style.transform = 'translateY(-10px)'
  card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)'
  card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'
}

// 项目卡片离开动画
function handleProjectLeave(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement
  card.style.transform = 'translateY(0)'
  card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)'
}

// 技能项悬停动画
function handleSkillHover(event: MouseEvent) {
  const skillItem = event.currentTarget as HTMLElement
  skillItem.style.transform = 'scale(1.05)'
  skillItem.style.backgroundColor = '#646cff'
  skillItem.style.transition = 'transform 0.3s ease, background-color 0.3s ease'
}

// 技能项离开动画
function handleSkillLeave(event: MouseEvent) {
  const skillItem = event.currentTarget as HTMLElement
  skillItem.style.transform = 'scale(1)'
  skillItem.style.backgroundColor = 'var(--card-background)'
}

// 页面加载动画和初始化
onMounted(() => {
  // 设置技能项初始样式
  skillRefs.value.forEach((el: Element | ComponentPublicInstance | null) => {
    if (el) {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'translateY(20px)'
      htmlEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease'
    }
  })
  
  // 设置项目卡片初始样式
  projectRefs.value.forEach((el: Element | ComponentPublicInstance | null) => {
    if (el) {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'translateY(30px)'
      htmlEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease'
    }
  })
  
  // 应用英雄区域动画
  if (heroRef.value) {
    heroRef.value.style.opacity = '1'
    heroRef.value.style.transition = 'opacity 1.2s ease'
  }
  
  // 为各个区域设置进入动画
  setupSectionAnimation(aboutRef, 0.6)
  setupSectionAnimation(projectsRef, 0.8)
  setupSectionAnimation(contactRef, 1.0)
  
  // 为技能项设置交错动画
    setTimeout(() => {
      skillRefs.value.forEach((el: Element | ComponentPublicInstance | null, index: number) => {
      if (el) {
        setTimeout(() => {
          const htmlEl = el as HTMLElement
          htmlEl.style.opacity = '1'
          htmlEl.style.transform = 'translateY(0)'
        }, index * 100)
      }
    })
  }, 600)
  
  // 为项目卡片设置交错动画
    setTimeout(() => {
      projectRefs.value.forEach((el: Element | ComponentPublicInstance | null, index: number) => {
      if (el) {
        setTimeout(() => {
          const htmlEl = el as HTMLElement
          htmlEl.style.opacity = '1'
          htmlEl.style.transform = 'translateY(0)'
        }, index * 200)
      }
    })
  }, 800)
})
</script>

<template>
  <div id="app">
    <!-- 英雄区域 -->
    <header 
      ref="heroRef"
      class="hero"
    >
      <div class="hero-content">
        <h1 class="hero-title">
          你好，我是 {{ personalInfo.name }}
        </h1>
        <h2 class="hero-subtitle">
          {{ personalInfo.title }}
        </h2>
        <p class="hero-bio">
          {{ personalInfo.bio }}
        </p>
        <div class="hero-buttons">
          <a href="#projects" class="btn" @mouseenter="handleButtonHover" @mouseleave="handleButtonLeave">查看作品</a>
          <a href="#contact" class="btn btn-secondary" @mouseenter="handleButtonHover" @mouseleave="handleButtonLeave">联系我</a>
        </div>
      </div>
    </header>

    <!-- 关于我区域 -->
    <section 
      id="about" 
      ref="aboutRef"
      class="section about"
    >
      <div class="container">
        <h2 class="section-title">
          关于我
        </h2>
        <div class="about-content">
          <div class="about-text">
            <p>我是一名拥有3年前端开发经验的工程师，热衷于创建美观、高效且用户友好的Web应用。我不断学习新技术，并将其应用到实际项目中。</p>
            <p>我擅长使用现代前端框架构建单页应用，并且对响应式设计和用户体验有深刻的理解。我喜欢与团队合作，共同解决复杂的技术挑战。</p>
          </div>
          <div class="skills">
            <h3>技术栈</h3>
            <div class="skills-grid">
                <div 
                  v-for="(skill, index) in personalInfo.skills" 
                  :key="skill"
                  :ref="el => skillRefs[index] = el"
                  class="skill-item"
                  @mouseenter="handleSkillHover($event)"
                  @mouseleave="handleSkillLeave($event)"
                >
                  {{ skill }}
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目展示区域 -->
    <section 
      id="projects" 
      ref="projectsRef"
      class="section projects"
    >
      <div class="container">
        <h2 class="section-title">
          我的作品
        </h2>
        <div class="projects-grid">
          <div 
            v-for="(project, index) in personalInfo.projects" 
            :key="project.title"
            :ref="el => projectRefs[index] = el"
            class="project-card"
            @mouseenter="handleProjectHover($event)"
            @mouseleave="handleProjectLeave($event)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
            </div>
            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-technologies">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-badge"
                >
                  {{ tech }}
                </span>
              </div>
              <button class="btn btn-sm" @mouseenter="handleButtonHover" @mouseleave="handleButtonLeave">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式区域 -->
    <section 
      id="contact" 
      ref="contactRef"
      class="section contact"
    >
      <div class="container">
        <h2 class="section-title">
          联系我
        </h2>
        <div class="contact-content">
          <div class="contact-info">
            <p><strong>邮箱：</strong>{{ personalInfo.contact.email }}</p>
            <p><strong>电话：</strong>{{ personalInfo.contact.phone }}</p>
            <div class="social-links">
              <a :href="personalInfo.contact.github" target="_blank" class="social-link">
                GitHub
              </a>
              <a :href="personalInfo.contact.linkedin" target="_blank" class="social-link">
                LinkedIn
              </a>
            </div>
          </div>
          <div class="contact-form">
            <h3>发送消息</h3>
            <form>
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" id="name" placeholder="请输入您的姓名" />
              </div>
              <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" placeholder="请输入您的邮箱" />
              </div>
              <div class="form-group">
                <label for="message">消息</label>
                <textarea id="message" rows="4" placeholder="请输入您的消息"></textarea>
              </div>
              <button type="submit" class="btn" @mouseenter="handleButtonHover" @mouseleave="handleButtonLeave">发送</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} {{ personalInfo.name }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 全局样式 */
:root {
  --primary-color: #646cff;
  --primary-hover: #535bf2;
  --secondary-color: #42b883;
  --background-color: #242424;
  --card-background: #2d2d2d;
  --text-color: rgba(255, 255, 255, 0.87);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --border-color: #3d3d3d;
  --section-padding: 6rem 0;
}

/* 通用组件样式 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: var(--section-padding);
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

/* 英雄区域样式 */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  z-index: 1;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-weight: 500;
}

.hero-bio {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* 关于我区域样式 */
.about {
  background-color: var(--background-color);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: var(--text-color);
}

.skills h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.skill-item {
  background-color: var(--card-background);
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

/* 项目展示区域样式 */
.projects {
  background-color: var(--card-background);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.project-card {
  background-color: var(--background-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.project-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: white;
}

.project-content p {
  margin-bottom: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.project-technologies {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tech-badge {
  background-color: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* 联系方式区域样式 */
.contact {
  background-color: var(--background-color);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.contact-info p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.social-links {
  margin-top: 2rem;
  display: flex;
  gap: 1.5rem;
}

.social-link {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-link:hover {
  color: var(--primary-color);
}

.contact-form h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-color);
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* 页脚样式 */
.footer {
  background-color: var(--card-background);
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid var(--border-color);
}

.footer p {
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .about-content,
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-bio {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
