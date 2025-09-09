<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'
import { personalInfo } from '../data/personalInfo'

// 引用
const aboutRef = ref<HTMLElement | null>(null)
const skillRefs = ref<(Element | ComponentPublicInstance | null)[]>([])
const titleRef = ref<HTMLElement | null>(null)
const textRefs = ref<(HTMLElement | null)[]>([null, null])
const typingTexts = [
  '我是一名拥有3年前端开发经验的工程师，热衷于创建美观、高效且用户友好的Web应用。我不断学习新技术，并将其应用到实际项目中。',
  '我擅长使用现代前端框架构建单页应用，并且对响应式设计和用户体验有深刻的理解。我喜欢与团队合作，共同解决复杂的技术挑战。'
]
const displayedTexts = ref(['', ''])
const isInView = ref(false)

// 创建背景粒子效果
function createParticles() {
  if (!aboutRef.value) return
  
  // 检查是否已有粒子画布
  let canvas = document.querySelector('#about-particles') as HTMLCanvasElement
  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.id = 'about-particles'
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    aboutRef.value.appendChild(canvas)
  }
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // 设置画布尺寸
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // 创建粒子
  const particles: {x: number, y: number, size: number, speedX: number, speedY: number, color: string}[] = []
  const particleCount = 50
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})`
    })
  }
  
  // 动画循环
  function animate() {
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(particle => {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
      
      // 移动粒子
      particle.x += particle.speedX
      particle.y += particle.speedY
      
      // 边界检测
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
    })
    
    // 连接附近的粒子
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x
        const dy = particles[a].y - particles[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100 && ctx) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 108, 255, ${0.2 * (1 - distance/100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(particles[b].x, particles[b].y)
          ctx.stroke()
        }
      }
    }
    
    requestAnimationFrame(animate)
  }
  
  animate()
}

// 打字机效果
function typeWriter(text: string, index: number, speed: number = 30) {
  if (displayedTexts.value[index].length < text.length) {
    displayedTexts.value[index] = text.substring(0, displayedTexts.value[index].length + 1)
    setTimeout(() => typeWriter(text, index, speed), speed)
  }
}

// 技能项悬停动画 - 3D效果
function handleSkillHover(event: MouseEvent) {
  const skillItem = event.currentTarget as HTMLElement
  skillItem.style.transform = 'scale(1.1) rotateY(15deg)'
  skillItem.style.boxShadow = '0 10px 25px rgba(100, 108, 255, 0.4)'
  skillItem.style.backgroundColor = '#646cff'
  skillItem.style.color = 'white'
}

// 技能项离开动画
function handleSkillLeave(event: MouseEvent) {
  const skillItem = event.currentTarget as HTMLElement
  skillItem.style.transform = 'scale(1) rotateY(0)'
  skillItem.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
  skillItem.style.backgroundColor = 'var(--card-background)'
  skillItem.style.color = 'var(--text-color)'
}

// 标题动画
function animateTitle() {
  if (!titleRef.value) return
  
  titleRef.value.style.transform = 'translateY(-50px)'
  titleRef.value.style.opacity = '0'
  titleRef.value.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease'
  
  setTimeout(() => {
    if (titleRef.value) {
      titleRef.value.style.transform = 'translateY(0)'
      titleRef.value.style.opacity = '1'
    }
  }, 300)
}

// 检查元素是否在视口中
function checkInView() {
  if (!aboutRef.value) return
  
  const rect = aboutRef.value.getBoundingClientRect()
  const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0
  
  if (isVisible && !isInView.value) {
    isInView.value = true
    triggerAnimations()
  }
}

// 触发所有动画
function triggerAnimations() {
  console.log('Triggering About section animations')
  
  // 标题动画
  animateTitle()
  
  // 文本打字机效果
  setTimeout(() => {
    try {
      typeWriter(typingTexts[0], 0)
      setTimeout(() => typeWriter(typingTexts[1], 1), 2000)
    } catch (error) {
      console.error('Error in typewriter effect:', error)
      // 降级处理，直接显示文本
      if (textRefs.value[0]) {
        textRefs.value[0].style.opacity = '1'
        textRefs.value[0].style.transform = 'translateX(0)'
        displayedTexts.value[0] = typingTexts[0]
      }
      if (textRefs.value[1]) {
        textRefs.value[1].style.opacity = '1'
        textRefs.value[1].style.transform = 'translateX(0)'
        displayedTexts.value[1] = typingTexts[1]
      }
    }
  }, 800)
  
  // 技能项交错动画
  setTimeout(() => {
    try {
      // 确保skillRefs和personalInfo.skills都有值
      if (skillRefs.value.length === 0 && personalInfo.skills && personalInfo.skills.length > 0) {
        console.warn('skillRefs is empty, trying alternative approach')
        // 备选方案：直接查找DOM元素
        const skillElements = document.querySelectorAll('.skill-item')
        skillElements.forEach((el, index) => {
          if (el instanceof HTMLElement) {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0) rotateY(0)'
            }, index * 150)
          }
        })
      } else {
        // 正常的交错动画
        skillRefs.value.forEach((el: Element | ComponentPublicInstance | null, index: number) => {
          if (el) {
            setTimeout(() => {
              const htmlEl = el as HTMLElement
              htmlEl.style.opacity = '1'
              htmlEl.style.transform = 'translateY(0) rotateY(0)'
            }, index * 150)
          }
        })
      }
    } catch (error) {
      console.error('Error in skills animation:', error)
      // 降级处理，直接显示所有技能项
      const skillElements = document.querySelectorAll('.skill-item')
      skillElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) rotateY(0)'
        }
      })
    }
  }, 1200)
}

// 页面加载动画和初始化
onMounted(() => {
  // 创建背景粒子
  createParticles()
  
  // 延迟设置初始样式，确保DOM已完全渲染
  setTimeout(() => {
    // 设置技能项初始样式
    skillRefs.value.forEach((el: Element | ComponentPublicInstance | null) => {
      if (el) {
        const htmlEl = el as HTMLElement
        htmlEl.style.opacity = '0'
        htmlEl.style.transform = 'translateY(30px) rotateY(30deg)'
        htmlEl.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }
    })
    
    // 设置文本初始样式
    textRefs.value.forEach(ref => {
      if (ref) {
        ref.style.opacity = '0'
        ref.style.transform = 'translateX(-20px)'
        ref.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      }
    })
    
    // 初始检查是否在视口
    checkInView()
    
    // 添加备用触发机制，确保动画总能触发
    setTimeout(() => {
      if (!isInView.value) {
        console.warn('About section not in view, triggering animations anyway')
        isInView.value = true
        triggerAnimations()
      }
    }, 2000)
  }, 100)
  
  // 监听滚动事件，实现滚动触发动画
  window.addEventListener('scroll', checkInView)
})

// 监听文本显示变化，更新样式
watch(displayedTexts, () => {
  textRefs.value.forEach((ref, index) => {
    if (ref && displayedTexts.value[index].length > 0) {
      ref.style.opacity = '1'
      ref.style.transform = 'translateX(0)'
    }
  })
})</script>

<template>
  <!-- 关于我区域 -->
  <section 
    id="about" 
    ref="aboutRef"
    class="section about"
  >
    <div class="container">
      <h2 class="section-title" ref="titleRef">
        关于我
      </h2>
      <div class="about-content">
        <div class="about-text">
          <p ref="el => textRefs[0] = el">{{ displayedTexts[0] }}<span class="cursor" v-if="displayedTexts[0].length < typingTexts[0].length">|</span></p>
          <p ref="el => textRefs[1] = el">{{ displayedTexts[1] }}<span class="cursor" v-if="displayedTexts[1].length < typingTexts[1].length">|</span></p>
        </div>
        <div class="skills">
          <h3 class="skills-title">技术栈</h3>
          <div class="skills-grid">
              <div 
                v-for="(skill, index) in personalInfo.skills" 
                :key="skill"
                :ref="el => skillRefs[index] = el"
                class="skill-item"
                @mouseenter="$event => handleSkillHover($event)"
                @mouseleave="$event => handleSkillLeave($event)"
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
  position: relative;
  z-index: 1;
}

/* 关于我区域样式 */
.about {
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 标题样式 */
.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #646cff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(100, 108, 255, 0.1);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.03);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 400;
}

/* 打字机光标样式 */
.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #646cff;
  animation: blink 1s infinite;
  vertical-align: text-bottom;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 技能区域样式 */
.skills h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--heading-color);
  position: relative;
  display: inline-block;
}

.skills h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #646cff, #a78bfa);
  border-radius: 2px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1.5rem;
}

/* 技能项3D样式 */
.skill-item {
  background-color: var(--card-background);
  padding: 1.2rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(100, 108, 255, 0.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  font-weight: 500;
  overflow: hidden;
}

/* 技能项悬停发光效果 */
.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(100, 108, 255, 0.2), transparent);
  transition: all 0.6s ease;
}

.skill-item:hover::before {
  left: 100%;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .about-content {
    padding: 1.5rem;
    gap: 2rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }
  
  .skill-item {
    padding: 1rem;
    font-size: 0.9rem;
  }
}
</style>;