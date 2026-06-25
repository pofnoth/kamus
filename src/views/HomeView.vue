<script setup>
import { computed } from 'vue'
import { posts } from 'virtual:blog-posts'
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import PostCard from '@/components/PostCard.vue'
import Footer from '@/components/Footer.vue'

// Logika Data
const headlinePosts = computed(() => {
  return posts
    .filter(post => post.tags?.includes('headline'))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)
})
</script>

<template>
  <Navbar />
  <div class="container">
    <main>
      <Hero />

      <section class="grid-posts">
        <PostCard 
          v-for="post in headlinePosts" 
          :key="post.slug" 
          :post="post" 
        />
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.grid-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1.25rem, 4vw, 2.5rem); 
  margin-bottom: 4rem;
}
</style>