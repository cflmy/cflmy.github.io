<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { personalInfo } from '../data/personalInfo'

// 引用
const heroRef = ref<HTMLElement | null>(null)

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

// 页面加载动画和初始化
onMounted(() => {
  // 应用英雄区域动画
  if (heroRef.value) {
    heroRef.value.style.opacity = '1'
    heroRef.value.style.transition = 'opacity 1.2s ease'
  }
})
</script>

<template>
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

/* 通用组件样式 */
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