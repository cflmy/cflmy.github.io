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
  
  // 调试：检查页面各部分
  const sections = document.querySelectorAll('.section')
  console.log('Found sections:', sections.length)
  
  // 检查组件是否正确加载
  setTimeout(() => {
    const headerElement = document.querySelector('header')
    const aboutElement = document.getElementById('about')
    const projectsElement = document.getElementById('projects')
    const contactElement = document.getElementById('contact')
    const footerElement = document.querySelector('footer')
    
    console.log('Header element:', headerElement)
    console.log('About element:', aboutElement)
    console.log('Projects element:', projectsElement)
    console.log('Contact element:', contactElement)
    console.log('Footer element:', footerElement)
  }, 1000)
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

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
  overflow-x: hidden;
}

/* fullpage容器样式 */
.fullpage-container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
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
