<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 移除vue-fullpage.js的导入，因为它与Vue 3可能存在兼容性问题

import Header from './components/Header.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

// 页面加载后执行
onMounted(() => {
  console.log('App.vue mounted successfully')
  
  // 获取所有section元素 - 移到顶层作用域
  const sections = document.querySelectorAll('.section') as NodeListOf<HTMLElement>
  console.log('Found sections:', sections.length)
  
  // 检查组件是否正确加载
  setTimeout(() => {
    const headerElement = document.querySelector('header') as HTMLElement | null
    const aboutElement = document.getElementById('about') as HTMLElement | null
    const projectsElement = document.getElementById('projects') as HTMLElement | null
    const contactElement = document.getElementById('contact') as HTMLElement | null
    const footerElement = document.querySelector('footer') as HTMLElement | null
    
    console.log('Header element:', headerElement)
    console.log('About element:', aboutElement)
    console.log('Projects element:', projectsElement)
    console.log('Contact element:', contactElement)
    console.log('Footer element:', footerElement)
  }, 1000)
  
  // 自定义滚动控制逻辑
  let currentIndex = 0
  let isScrolling = false
  const scrollThreshold = 50 // 滚动阈值
  const scrollTimeoutDuration = 800 // 滚动防抖延迟
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null
  
  // 获取fullpage容器
  const fullpageContainer = document.querySelector('.fullpage-container') as HTMLElement
  
  // 计算section高度数组
  const sectionOffsets: number[] = []
  const viewportHeight = window.innerHeight
  let cumulativeOffset = 0
  
  sections.forEach((section, index) => {
    sectionOffsets[index] = cumulativeOffset
    // 检查是否是半页高度的section
    const isHalfPage = section.classList.contains('section-half')
    cumulativeOffset += isHalfPage ? viewportHeight * 0.5 : viewportHeight
  })
  
  // 滚动到指定索引的section
  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return
    
    isScrolling = true
    currentIndex = index
    
    if (fullpageContainer) {
      // 直接使用计算好的偏移量进行滚动
      fullpageContainer.scrollTo({
        top: sectionOffsets[index],
        behavior: 'smooth'
      })
    }
    
    // 清除之前的定时器
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    
    // 设置新的定时器
    scrollTimeout = setTimeout(() => {
      isScrolling = false
    }, scrollTimeoutDuration)
  }
  
  // 同步currentIndex与实际滚动位置
  const syncCurrentIndex = () => {
    if (isScrolling || !fullpageContainer) return
    
    const scrollPosition = fullpageContainer.scrollTop
    
    // 找到当前滚动位置对应的section索引
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollPosition >= sectionOffsets[i] - 100) {
        if (i !== currentIndex) {
          currentIndex = i
        }
        break
      }
    }
  }
  
  // 处理鼠标滚轮事件
  document.addEventListener('wheel', (e) => {
    // 阻止默认滚轮行为，防止页面自动滚动
    e.preventDefault()
    
    if (isScrolling) return
    
    // 确定滚动方向和是否超过阈值
    const isScrollDown = e.deltaY > 0
    const shouldScroll = Math.abs(e.deltaY) > scrollThreshold
    
    if (!shouldScroll) return
    
    // 计算新的索引 - 一次最多切换一页
    let newIndex = currentIndex
    if (isScrollDown && currentIndex < sections.length - 1) {
      newIndex = currentIndex + 1
    } else if (!isScrollDown && currentIndex > 0) {
      newIndex = currentIndex - 1
    }
    
    // 滚动到新的section
    scrollToSection(newIndex)
  }, { passive: false })
  
  // 监听容器滚动事件，用于同步currentIndex
  if (fullpageContainer) {
    fullpageContainer.addEventListener('scroll', syncCurrentIndex, { passive: true })
  }
  
  // 监听窗口大小变化，重新计算section偏移量
  window.addEventListener('resize', () => {
    const newViewportHeight = window.innerHeight
    let newCumulativeOffset = 0
    
    sections.forEach((section, index) => {
      sectionOffsets[index] = newCumulativeOffset
      const isHalfPage = section.classList.contains('section-half')
      newCumulativeOffset += isHalfPage ? newViewportHeight * 0.5 : newViewportHeight
    })
    
    // 如果正在滚动中，重新滚动到当前section
    if (!isScrolling) {
      syncCurrentIndex()
    }
  }, { passive: true })
})

</script>

<template>
  <div id="app">
    <!-- 移除vue-fullpage组件，使用简单的div容器 -->
    <div class="fullpage-container">
      <!-- 每个section代表一个完整的页面 -->
      <div class="section">
        <Header />
      </div>
      <div class="section">
        <About />
      </div>
      <div class="section">
        <Projects />
      </div>
      <div class="section">
        <Contact />
      </div>
      <div class="section section-half">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS 变量定义 */
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

/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 全局平滑滚动 */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
  overflow-x: hidden;
  overflow-y: hidden; /* 移除页面滚动条 */
}

/* fullpage容器样式 */
  .fullpage-container {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    scroll-padding-top: 0;
    /* 隐藏滚动条但保持功能 */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* 隐藏WebKit浏览器的滚动条 */
  .fullpage-container::-webkit-scrollbar {
    display: none;
  }

/* 适配页面的样式 - 确保内容可见 */
.section {
  height: 100vh;
  scroll-snap-align: start;
  text-align: center;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background-color: var(--background-color);
}

/* 半页高度的section样式，用于Footer组件 */
.section-half {
  height: 50vh;
  scroll-snap-align: start;
  text-align: center;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background-color: var(--background-color);
}
</style>
