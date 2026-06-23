import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const blogPostsPlugin = (): Plugin => {
  const virtualModuleId = 'virtual:blog-posts'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  const postsDir = fileURLToPath(new URL('./src/posts', import.meta.url))

  return {
    name: 'blog-posts-plugin',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // Fallback jika folder posts tidak ditemukan
        if (!fs.existsSync(postsDir)) {
          return `export const posts = []`
        }

        const files = fs.readdirSync(postsDir)
        const posts = files
          .filter(file => file.endsWith('.md'))
          .map(file => {
            const filePath = path.join(postsDir, file)
            this.addWatchFile(filePath)
            
            const content = fs.readFileSync(filePath, 'utf-8')
            const slug = file.replace(/\.md$/, '')
            
            // Ekstraksi YAML frontmatter menggunakan gray-matter
            const { data } = matter(content)

            return {
              slug,
              title: data.title || slug,
              date: data.date || 'No Date',
              ...data 
            }
          })

        return `export const posts = ${JSON.stringify(posts)}`
      }
    },
    // Menangani Auto-Reload saat tahap development
    handleHotUpdate({ file, server }) {
      if (file.startsWith(postsDir) && file.endsWith('.md')) {
        const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
        
        if (virtualModule) {
          server.moduleGraph.invalidateModule(virtualModule)
          server.ws.send({
            type: 'full-reload',
            path: '*'
          })
        }
      }
    }
  }
}

export default defineConfig({
  base: '/kamus/',
  plugins: [
    Markdown({
      headEnabled: true
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    blogPostsPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})