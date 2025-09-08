<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { personalInfo } from '../data/personalInfo'

// 引用
const contactRef = ref<HTMLElement | null>(null)

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

// 页面加载动画和初始化
onMounted(() => {
  // 为各个区域设置进入动画
  setupSectionAnimation(contactRef, 1.0)
})
</script>

<template>
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
</template>

<style scoped>
/* 通用组件样式 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
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

/* 联系方式区域样式 */
.contact {
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
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

/* 响应式设计 */
@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>