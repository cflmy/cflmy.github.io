import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/tool/:id', name: 'tool', component: () => import('@/views/ToolView.vue') },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
