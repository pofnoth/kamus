import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogList from '@/views/BlogList.vue'

// 1. Fetch all markdown files lazily
const markdownPosts = import.meta.glob('../posts/*.md')

// 2. Map them into Vue Router route objects
const blogRoutes: RouteRecordRaw[] = Object.keys(markdownPosts).map((filePath) => {
  // Extract filename without extension (e.g., '../posts/my-post.md' -> 'my-post')
  const match = filePath.match(/\/([^/]+)\.md$/)
  const slug = match ? match[1] : filePath
  
  return {
    path: `/blog/${slug}`,
    name: slug as string,
    component: markdownPosts[filePath] as () => Promise<any>
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
  ]
})

export default router