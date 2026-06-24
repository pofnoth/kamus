import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogList from '@/views/BlogList.vue'
import PostView from '@/views/PostView.vue' // Import baju layout kita

// 1. Fetch all markdown files lazily
const markdownPosts = import.meta.glob('../posts/*.md')

// 2. Map them into Vue Router route objects
const blogRoutes: RouteRecordRaw[] = Object.keys(markdownPosts).map((filePath) => {
  const match = filePath.match(/\/([^/]+)\.md$/)
  const slug = match ? match[1] : filePath
  
  return {
    path: `/blog/${slug}`,
    name: slug as string,
    // KUNCI ARSITEKTUR: Jadikan PostView sebagai komponen utama
    component: PostView, 
    // Lalu masukkan file .md sebagai 'child' yang akan dirender di dalamnya
    children: [
      {
        path: '', // Path kosong berarti ia langsung dirender saat /blog/slug diakses
        name: `${slug}-content`,
        component: markdownPosts[filePath] as () => Promise<any>
      }
    ]
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog',
      name: 'blog-list',
      component: BlogList
    },
    // 3. Inject the automated routes
    ...blogRoutes 
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 } // Otomatis scroll ke atas saat pindah artikel
  }
})

export default router