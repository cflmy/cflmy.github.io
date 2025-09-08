<script setup lang="ts">
// 导入所有组件
import Header from './components/Header.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
</script>

<template>
  <div id="app">
    <!-- 导入的组件 -->
    <Header />
    <About />
    <Projects />
    <Contact />
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
}
</style>
