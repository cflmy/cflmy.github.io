<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'
import { personalInfo } from '../data/personalInfo'

// 引用
const projectsRef = ref<HTMLElement | null>(null)
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

// 页面加载动画和初始化
onMounted(() => {
  // 设置项目卡片初始样式
  projectRefs.value.forEach((el: Element | ComponentPublicInstance | null) => {
    if (el) {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'translateY(30px)'
      htmlEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease'
    }
  })
  
  // 为各个区域设置进入动画
  setupSectionAnimation(projectsRef, 0.8)
  
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
</template>

<style scoped>
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

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>