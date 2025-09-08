<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'
import { personalInfo } from '../data/personalInfo'

// 引用
const aboutRef = ref<HTMLElement | null>(null)
const skillRefs = ref<(Element | ComponentPublicInstance | null)[]>([])

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
  
  // 为各个区域设置进入动画
  setupSectionAnimation(aboutRef, 0.6)
  
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
})
</script>

<template>
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
</template>

<style scoped>
/* 通用组件样式 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 关于我区域样式 */
.about {
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
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

/* 响应式设计 */
@media (max-width: 992px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>