import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import fs from 'node:fs'
import path from 'node:path'

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
        this.addWatchFile(postsDir)
        const files = fs.readdirSync(postsDir)
        const posts = files
          .filter(file => file.endsWith('.md'))
          .map(file => {
            const filePath = path.join(postsDir, file)
            const content = fs.readFileSync(filePath, 'utf-8')
            const slug = file.replace(/\.md$/, '')

            // Simple frontmatter parser
            const frontmatterMatch = content.match(/^---([\s\S]*?)---/)
            const metadata = { slug, title: slug, date: 'No Date' }

            if (frontmatterMatch) {
              const lines = frontmatterMatch[1].split('\n')
              lines.forEach(line => {
                const [key, ...valueParts] = line.split(':')
                if (key && valueParts.length > 0) {
                  const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
                  const cleanKey = key.trim()
                  if (cleanKey === 'title') metadata.title = value
                  if (cleanKey === 'date') metadata.date = value
                }
              })
            }

            return metadata
          })

        return `export const posts = ${JSON.stringify(posts)}`
      }
    }
  }
}

export default defineConfig({
  base: '/kamus/',
  plugins: [
    Markdown({
      headEnabled: true // Enables parsing YAML frontmatter
    }),
    vue({
      include: [/\.vue$/, /\.md$/], // Tell Vue to process markdown
    }),
    blogPostsPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})