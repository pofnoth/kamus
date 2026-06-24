<script setup>
   import { posts } from "virtual:blog-posts"
   import { computed } from "vue"
   
   const headlinePosts = computed(() => {
      return posts.filter(post => post.tags?.includes("headline"))
   })
</script>

<template>
  <main class="home-container">
    <div class="content">
      <h1>Kamus</h1>
      <p class="tagline">Pioneer Of Nothing</p>
      <nav>
        <router-link to="/blog" class="nav-link">Read Blog</router-link>
      </nav>
    </div>
    <div class="landing-page-posts">
       <h2>Artikel Terbaru</h2>
       <ul>
         <li v-for="post in headlinePosts" :key="post.slug">
           <router-link :to="`/blog/${post.slug}`" class="block mb-4">
             <h3 class="font-bold text-xl">{{ post.title }}</h3>
             
             <p class="text-gray-600 mt-1" v-if="post.excerpt">
               {{ post.excerpt }}
             </p>
           </router-link>
         </li>
       </ul>
     </div>
  </main>
</template>