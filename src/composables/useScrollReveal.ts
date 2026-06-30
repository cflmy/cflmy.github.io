import { onMounted, onUnmounted } from 'vue';

/** 滚动进入视口时渐显，参考专题页「滚动进入幻境」 */
export function useScrollReveal(root: () => HTMLElement | null) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const el = root();
    if (!el) return;

    const targets = el.querySelectorAll('.reveal');
    if (!targets.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((node) => observer!.observe(node));
  });

  onUnmounted(() => observer?.disconnect());
}
