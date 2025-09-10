<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'
import { personalInfo } from '../data/personalInfo'

// 引用
const projectsRef = ref<HTMLElement | null>(null)
const projectRefs = ref<(Element | ComponentPublicInstance | null)[]>([])
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isInView = ref(false)

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

// 创建几何背景效果
function createGeometricBackground() {
  if (!projectsRef.value || !canvasRef.value) return
  
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // 设置画布尺寸
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // 几何图形配置
  interface Shape {
    x: number
    y: number
    size: number
    rotation: number
    speed: number
    type: 'circle' | 'square' | 'triangle'
    color: string
  }
  
  const shapes: Shape[] = []
  const shapeCount = 20
  
  // 初始化几何图形
  for (let i = 0; i < shapeCount; i++) {
    const type = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
    shapes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.2,
      type,
      color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.15 + 0.05})`
    })
  }
  
  // 动画循环
  function animate() {
    if (!ctx) return
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 更新并绘制每个图形
    shapes.forEach(shape => {
      // 更新位置和旋转
      shape.x += shape.speed * 2
      shape.y += shape.speed
      shape.rotation += shape.speed * 0.1
      
      // 边界检测
      if (shape.x < -shape.size) shape.x = canvas.width + shape.size
      if (shape.x > canvas.width + shape.size) shape.x = -shape.size
      if (shape.y < -shape.size) shape.y = canvas.height + shape.size
      if (shape.y > canvas.height + shape.size) shape.y = -shape.size
      
      // 绘制图形
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)
      ctx.fillStyle = shape.color
      
      if (shape.type === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (shape.type === 'square') {
        ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
      } else if (shape.type === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(0, -shape.size / 2)
        ctx.lineTo(shape.size / 2, shape.size / 2)
        ctx.lineTo(-shape.size / 2, shape.size / 2)
        ctx.closePath()
        ctx.fill()
      }
      
      ctx.restore()
    })
    
    requestAnimationFrame(animate)
  }
  
  animate()
}

// 按钮悬停动画 - 脉冲效果
function handleButtonHover(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  button.style.transform = 'translateY(-3px) scale(1.05)'
  button.style.boxShadow = '0 8px 25px rgba(100, 108, 255, 0.4)'
  button.style.transition = 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
  
  // 添加脉冲效果
  const pulse = document.createElement('span')
  pulse.className = 'button-pulse'
  const rect = button.getBoundingClientRect()
  pulse.style.width = pulse.style.height = `${Math.max(rect.width, rect.height)}px`
  pulse.style.left = `${event.clientX - rect.left - Math.max(rect.width, rect.height) / 2}px`
  pulse.style.top = `${event.clientY - rect.top - Math.max(rect.width, rect.height) / 2}px`
  button.appendChild(pulse)
  
  // 移除脉冲元素
  setTimeout(() => {
    if (button.contains(pulse)) {
      button.removeChild(pulse)
    }
  }, 600)
}

// 按钮离开动画
function handleButtonLeave(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  button.style.transform = 'translateY(0) scale(1)'
  button.style.boxShadow = '0 4px 12px rgba(100, 108, 255, 0.2)'
}

// 项目卡片悬停动画 - 增强的3D效果
function handleProjectHover(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // 计算旋转角度
  const rotateX = ((y / rect.height) - 0.5) * 5
  const rotateY = ((x / rect.width) - 0.5) * -5
  
  card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  card.style.boxShadow = '0 25px 40px rgba(0, 0, 0, 0.3)'
  card.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
  
  // 图片放大效果
  const image = card.querySelector('.project-image img') as HTMLElement
  if (image) {
    image.style.transform = 'scale(1.1)'
    image.style.transition = 'transform 0.7s ease'
  }
  
  // 技术标签动画
  const badges = card.querySelectorAll('.tech-badge') as NodeListOf<HTMLElement>
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.style.transform = 'translateY(0) scale(1)'
      badge.style.opacity = '1'
    }, index * 50)
  })
}

// 项目卡片离开动画
function handleProjectLeave(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement
  card.style.transform = 'translateY(0) rotateX(0) rotateY(0)'
  card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)'
  
  // 图片恢复效果
  const image = card.querySelector('.project-image img') as HTMLElement
  if (image) {
    image.style.transform = 'scale(1)'
  }
  
  // 技术标签恢复
  const badges = card.querySelectorAll('.tech-badge') as NodeListOf<HTMLElement>
  badges.forEach(badge => {
    badge.style.transform = 'translateY(5px) scale(0.95)'
    badge.style.opacity = '0.8'
  })
}

// 技术标签悬停动画
function handleTechBadgeHover(event: MouseEvent) {
  const badge = event.currentTarget as HTMLElement
  badge.style.transform = 'scale(1.15) translateY(-2px)'
  badge.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
  badge.style.color = '#646cff'
  badge.style.boxShadow = '0 3px 10px rgba(100, 108, 255, 0.3)'
  badge.style.transition = 'all 0.3s ease'
}

// 技术标签离开动画
function handleTechBadgeLeave(event: MouseEvent) {
  const badge = event.currentTarget as HTMLElement
  badge.style.transform = 'scale(1) translateY(0)'
  badge.style.backgroundColor = 'var(--primary-color)'
  badge.style.color = 'white'
  badge.style.boxShadow = 'none'
}

// 检查元素是否在视口中
function checkInView() {
  if (!projectsRef.value) return
  
  const rect = projectsRef.value.getBoundingClientRect()
  // 更宽松的可见性检测条件
  const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0
  
  if (isVisible && !isInView.value) {
    isInView.value = true
    triggerAnimations()
  }
}

// 触发所有动画
function triggerAnimations() {
  // 为各个区域设置进入动画
  setupSectionAnimation(projectsRef, 0.3)
  
  // 为项目卡片设置交错动画
  setTimeout(() => {
    projectRefs.value.forEach((el: Element | ComponentPublicInstance | null, index: number) => {
      if (el) {
        setTimeout(() => {
          const htmlEl = el as HTMLElement
          htmlEl.style.opacity = '1'
          htmlEl.style.transform = 'translateY(0)'
          
          // 为卡片中的技术标签设置初始状态
          const badges = htmlEl.querySelectorAll('.tech-badge') as NodeListOf<HTMLElement>
          badges.forEach(badge => {
            badge.style.transform = 'translateY(5px) scale(0.95)'
            badge.style.opacity = '0.8'
            badge.style.transition = 'all 0.3s ease'
          })
          
          // 为卡片添加点击波纹效果
          htmlEl.addEventListener('click', (e) => {
            const ripple = document.createElement('span')
            ripple.className = 'project-ripple'
            const rect = htmlEl.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            
            ripple.style.width = ripple.style.height = '10px'
            ripple.style.left = `${x}px`
            ripple.style.top = `${y}px`
            htmlEl.appendChild(ripple)
            
            setTimeout(() => {
              if (htmlEl.contains(ripple)) {
                htmlEl.removeChild(ripple)
              }
            }, 800)
          })
        }, index * 250)
      }
    })
  }, 500)
}

// 页面加载动画和初始化
onMounted(() => {
  // 创建几何背景
  nextTick(() => {
    createGeometricBackground()
  })
  
  // 设置项目卡片初始样式
  projectRefs.value.forEach((el: Element | ComponentPublicInstance | null) => {
    if (el) {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'translateY(50px) rotateX(10deg)'
      htmlEl.style.transition = 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease'
    }
  })
  
  // 添加滚动监听
  window.addEventListener('scroll', checkInView)
  
  // 初始检查 - 直接触发动画，确保内容总是可见
  isInView.value = true;
  triggerAnimations();
});</script>

<template>
  <!-- 项目展示区域 -->
  <section 
    id="projects" 
    ref="projectsRef"
    class="section projects"
  >
    <!-- 几何背景画布 -->
    <canvas ref="canvasRef" class="geometric-canvas"></canvas>
    
    <div class="container">
      <h2 class="section-title projects-title">
        <span class="title-text">我的作品</span>
        <span class="title-decoration"></span>
      </h2>
      <div class="projects-grid" :class="{
        'projects-grid-two': personalInfo.projects.length === 2,
        'projects-grid-multi': personalInfo.projects.length > 2
      }">
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
            <div class="project-overlay">
              <span class="project-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 5L5 12M12 5L19 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-technologies">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-badge"
                @mouseenter="handleTechBadgeHover($event)"
                @mouseleave="handleTechBadgeLeave($event)"
              >
                {{ tech }}
              </span>
            </div>
            <button class="btn btn-sm project-button" @mouseenter="handleButtonHover" @mouseleave="handleButtonLeave">查看详情</button>
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
  position: relative;
  overflow: hidden;
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

/* 按钮脉冲效果 */
.button-pulse {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: pulse-animation 0.6s ease-out;
  pointer-events: none;
  z-index: 0;
}

@keyframes pulse-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* 项目展示区域样式 */
.projects {
  width: 100%;
  min-height: 100vh;
  background-color: var(--card-background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

/* 几何背景画布 */
.geometric-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* 标题样式 */
.projects-title {
  position: relative;
  margin-bottom: 3.5rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
}

.title-text {
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #ffffff, #a0a0a0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  padding: 0 1rem;
}

.title-decoration {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 0.5rem;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  border-radius: 0.25rem;
  z-index: 1;
}

/* 项目网格 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3rem;
  perspective: 1000px;
  justify-items: center;
}

/* 两个项目时的布局 - 调整间隙确保对称 */
.projects-grid-two {
  grid-template-columns: repeat(2, 350px);
  gap: 4rem; /* 通过控制间隙调整布局 */
  justify-content: center;
}

/* 三个以上项目时的布局 - 紧凑间隙 */
.projects-grid-multi {
  gap: 2rem; /* 更紧凑的间隙 */
  grid-template-columns: repeat(auto-fill, 350px);
  justify-content: center;
}

/* 项目卡片样式 - 固定大小确保一致性 */
.project-card {
  background-color: var(--background-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  cursor: pointer;
  width: 350px; /* 固定宽度确保所有项目大小一致 */
  display: flex;
  flex-direction: column;
}

/* 项目图片区域 */
.project-image {
  position: relative;
  overflow: hidden;
  height: 220px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

/* 图片悬停覆盖层 */
.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7));
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2rem;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-icon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 50%;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease 0.2s;
}

.project-card:hover .project-icon {
  transform: translateY(0);
  opacity: 1;
}

/* 项目内容区域 */
.project-content {
  padding: 2rem;
  position: relative;
  z-index: 2;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
  transition: transform 0.3s ease;
  min-height: 3rem;
}

.project-card:hover .project-title {
  transform: translateX(5px);
}

.project-description {
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  flex-grow: 1;
}

/* 技术标签样式 */
.project-technologies {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tech-badge {
  background-color: var(--primary-color);
  color: white;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

/* 项目按钮 */
.project-button {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.project-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  z-index: -1;
}

.project-button:hover::before {
  left: 100%;
}

/* 卡片点击波纹效果 */
.project-ripple {
  position: absolute;
  background-color: rgba(100, 108, 255, 0.3);
  border-radius: 50%;
  transform: scale(0);
  animation: ripple-animation 0.8s ease-out;
  pointer-events: none;
  z-index: 0;
}

@keyframes ripple-animation {
  to {
    transform: scale(50);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .projects {
    padding: 3rem 0;
  }
  
  .projects-title {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
  
  /* 响应式网格布局 - 确保在小屏幕上保持对称性 */
  .projects-grid,
  .projects-grid-two,
  .projects-grid-multi {
    grid-template-columns: 1fr;
    gap: 2rem;
    justify-content: center;
    max-width: 350px;
    margin: 0 auto;
  }
  
  /* 在小屏幕上保持固定大小 */
  .project-card {
    width: 100%;
    max-width: 350px;
  }
  
  .project-image {
    height: 200px;
  }
  
  .project-content {
    padding: 1.5rem;
  }
}
</style>