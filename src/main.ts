import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import "@/assets/main.css"

if (import.meta.env.DEV) {
  import('eruda').then((eruda) => {
    eruda.default.init();
  });
}

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.mount('#app')
