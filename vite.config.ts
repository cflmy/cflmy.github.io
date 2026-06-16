import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

/** Cloudflare Rocket Loader 会破坏 type="module" 与动态 import，需显式排除 */
function cloudflareRocketLoaderCompat(): Plugin {
  const guard = '<script data-cfasync="false">window._cf_async=false</script>';
  return {
    name: 'cloudflare-rocket-loader-compat',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        let out = html.replace(/<script(?![^>]*\bdata-cfasync=)/g, '<script data-cfasync="false"');
        if (!out.includes('window._cf_async=false')) {
          out = out.replace('<head>', `<head>\n  ${guard}`);
        }
        return out;
      },
    },
  };
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), cloudflareRocketLoaderCompat()],
  base: '/',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
