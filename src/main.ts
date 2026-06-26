import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import "@/assets/main.css"

if (import.meta.env.DEV) {
  import('eruda').then((eruda) => {
    eruda.default.init();
  });
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL
  },
  ({ app, router, head, isClient }) => {
    // app.use(router) // vite-ssg handles router
    // app.use(head) // vite-ssg handles head
  }
)
