import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouterInstance } from './router'
import "@/assets/main.css"

if (import.meta.env.DEV) {
  import('eruda').then((eruda) => {
    eruda.default.init();
  });
}

export async function createApp() {
  const app = createSSRApp(App)
  const router = createRouterInstance()

  // Dynamically import client/server head creator based on environment
  const createHead = typeof window !== 'undefined'
    ? (await import('@unhead/vue/client')).createHead
    : (await import('@unhead/vue/server')).createHead

  const head = createHead()

  app.use(router)
  app.use(head)

  return { app, router, head }
}

if (typeof window !== 'undefined') {
  createApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount('#app')
    })
  })
}
