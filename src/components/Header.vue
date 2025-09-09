<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { personalInfo } from '../data/personalInfo'

// 引用
const heroRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const bioRef = ref<HTMLElement | null>(null)
const buttonsRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 打字机效果变量
let titleIndex = 0
const fullTitle = `你好，我是 ${personalInfo.name}`
let typingInterval: number | null = null

// 创建粒子背景
function createParticleBackground() {
  if (!heroRef.value || !canvasRef.value) return
  
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
  
  // 粒子配置
  interface Particle {
    x: number
    y: number
    radius: number
    color: string
    velocityX: number
    velocityY: number
  }
  
  const particles: Particle[] = []
  const particleCount = 80
  const connectionDistance = 120
  
  // 初始化粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.1})`,
      velocityX: (Math.random() - 0.5) * 0.5,
      velocityY: (Math.random() - 0.5) * 0.5
    })
  }
  
  // 动画循环
  function animate() {
    if (!ctx) return
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 更新并绘制每个粒子
    particles.forEach((particle, index) => {
      // 更新位置
      particle.x += particle.velocityX
      particle.y += particle.velocityY
      
      // 边界检测
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.velocityX *= -1
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.velocityY *= -1
      }
      
      // 绘制粒子
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
      
      // 连接附近的粒子
      for (let j = index + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x
        const dy = particles[j].y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < connectionDistance) {
          const opacity = 0.8 - (distance / connectionDistance) * 0.8
          
          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 108, 255, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    })
    
    requestAnimationFrame(animate)
  }
  
  animate()
}

// 按钮悬停动画
function handleButtonHover(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  button.style.transform = 'translateY(-3px)'
  button.style.boxShadow = '0 5px 15px rgba(100, 108, 255, 0.4)'
}

// 按钮离开动画
function handleButtonLeave(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  button.style.transform = 'translateY(0)'
  button.style.boxShadow = 'none'
}

// 页面加载动画和初始化
onMounted(() => {
  // 应用英雄区域动画
  setTimeout(() => {
    if (heroRef.value) {
      heroRef.value.style.opacity = '1'
      heroRef.value.style.transition = 'opacity 1.2s ease'
    }
  }, 100) // 小延迟确保DOM已完全加载
  
  // 创建粒子背景
  createParticleBackground()
  
  // 标题打字机效果
  if (titleRef.value) {
    titleRef.value.textContent = ''
    
    typingInterval = window.setInterval(() => {
      if (titleIndex < fullTitle.length) {
        titleRef.value!.textContent += fullTitle[titleIndex]
        titleIndex++
      } else {
        if (typingInterval) {
          clearInterval(typingInterval)
          typingInterval = null
          
          // 打字机完成后，依次显示其他元素
          setTimeout(() => {
            if (subtitleRef.value) {
              subtitleRef.value.classList.add('visible')
            }
            
            setTimeout(() => {
              if (bioRef.value) {
                bioRef.value.classList.add('visible')
              }
              
              setTimeout(() => {
                if (buttonsRef.value) {
                  buttonsRef.value.classList.add('visible')
                }
              }, 300)
            }, 300)
          }, 500)
        }
      }
    }, 100)
  }
})
</script>

<template>
  <!-- 英雄区域 -->
  <header 
    ref="heroRef"
    class="hero"
  >
    <!-- 粒子背景画布 -->
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
    
    <div class="hero-content">
      <h1 class="hero-title" ref="titleRef">
        <!-- 内容将通过打字机效果动态填充 -->
      </h1>
      <h2 class="hero-subtitle" ref="subtitleRef" :data-text="personalInfo.title">
        {{ personalInfo.title }}
      </h2>
      <p class="hero-bio" ref="bioRef">
        {{ personalInfo.bio }}
      </p>
      <div class="hero-buttons" ref="buttonsRef">
        <a href="#projects" class="btn" @mouseenter="handleButtonHover" @mouseleave="handleButtonLeave">查看作品</a>
        <a href="#contact" class="btn btn-secondary" @mouseenter="handleButtonHover" @mouseleave="handleButtonLeave">联系我</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 英雄区域样式 */
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  position: relative;
  opacity: 0;
  overflow: hidden;
}

/* 粒子背景画布 */
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  z-index: 1;
  padding: 2rem;
}

/* 标题样式 - 打字机效果 */
.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.2;
  font-weight: 700;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.hero-title::after {
  content: '|';
  position: absolute;
  right: -15px;
  color: var(--primary-color);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

/* 副标题样式 - 渐变和淡入效果 */
.hero-subtitle {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-weight: 500;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.hero-subtitle::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #8e94f2, #d4d6ff, var(--primary-color));
  background-size: 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  animation: gradient 8s linear infinite;
  transition: opacity 0.3s ease;
}

.hero-subtitle:hover::before {
  opacity: 1;
}

@keyframes gradient {
  0% { background-position: 0%; }
  100% { background-position: 300%; }
}

/* 简介样式 - 淡入和微妙动画 */
.hero-bio {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: var(--text-secondary);
  line-height: 1.6;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

/* 按钮容器样式 - 渐入动画 */
.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

/* 显示动画类 */
.hero-subtitle.visible,
.hero-bio.visible,
.hero-buttons.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 按钮样式增强 */
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
  z-index: 1;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s ease;
  z-index: -1;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(100, 108, 255, 0.4);
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-hover);
}

/* 响应式设计 */
@media (max-width: 992px) {
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
}
</style>