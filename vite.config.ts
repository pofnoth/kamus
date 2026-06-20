import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

export default defineConfig({
  base: '/kamus/',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // Tell Vue to process markdown
    }),
    Markdown({
      headEnabled: true // Enables parsing YAML frontmatter
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})