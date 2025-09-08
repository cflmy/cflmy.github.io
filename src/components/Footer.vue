<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          © {{ currentYear }} 个人网站. All rights reserved.
        </div>
        <div class="beian-info">
          备案号：<a href="http://beian.miit.gov.cn" target="_blank">[备案号]</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentYear = ref<number>(new Date().getFullYear())

onMounted(() => {
  currentYear.value = new Date().getFullYear()
})
</script>

<style scoped>
.footer {
  width: 100%;
  height: 100vh;
  background-color: var(--card-background);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.copyright {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.beian-info {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.beian-info a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.beian-info a:hover {
  color: var(--primary-color);
}
</style>