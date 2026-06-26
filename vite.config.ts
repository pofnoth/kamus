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
            
            const raw_md = fs.readFileSync(filePath, 'utf-8')
            const slug = file.replace(/\.md$/, '')
            
            // Ekstraksi YAML frontmatter menggunakan gray-matter
            const { data, content } = matter(raw_md)
            
            let autoExcerpt = undefined;
            
            if (data.tags && data.tags.includes('headline')) {
              // Mesin hanya akan melakukan komputasi string berat ini jika syarat di atas terpenuhi
              autoExcerpt = content
                // Membunuh SELURUH BARIS yang diawali dengan '#' (membuang judul beserta teksnya)
                .replace(/^#+.*$/gm, '') 
                // Hapus sintaks link Markdown [teks](url)
                .replace(/\[.*?\]\(.*?\)/g, '') 
                // Hapus tag HTML mentah
                .replace(/<[^>]*>?/gm, '') 
                // Hapus sisa simbol Markdown (bold, italic, strikethrough, inline code)
                .replace(/[*_~`]/g, '') 
                // Ratakan semua baris baru (enter) menjadi satu spasi
                .replace(/\n+/g, ' ') 
                // Bersihkan spasi kosong di awal/akhir
                .trim()
                // Potong 150 karakter
                .substring(0, 150) + '...';
            }
            
            return {
              slug,
              title: data.title || slug,
              date: data.date || 'No Date',
              excerpt: data.desc || autoExcerpt,
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
  base: '/',
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
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})