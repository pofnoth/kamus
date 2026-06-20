import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// 1. Fetch all markdown files lazily
const markdownPosts = import.meta.glob('../posts/*.md')

// 2. Map them into Vue Router route objects
const blogRoutes = Object.keys(markdownPosts).map((filePath) => {
  // Extract filename without extension (e.g., '../posts/my-post.md' -> 'my-post')
  const slug = filePath.match(/\/([^/]+)\.md$/)[1] 
  
  return {
    path: `/blog/${slug}`,
    name: slug,
    component: markdownPosts[filePath]
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
    // 3. Inject the automated routes
    ...blogRoutes 
  ]
})

export default router