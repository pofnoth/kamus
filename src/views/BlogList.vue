<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
import { posts } from 'virtual:blog-posts'
import { formatDate } from "@/utils/time.ts"

const allTags = computed(() => {
  const tagsSet = new Set<string>()
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      // Mengecualikan 'headline' agar tidak masuk ke daftar dropdown filter
      post.tags.forEach(tag => {
        if (tag.toLowerCase() !== 'headline') {
          tagsSet.add(tag)
        }
      })
    }
  })
  return Array.from(tagsSet).sort()
})

const activeTag = ref<string | null>(null)

const filteredPosts = computed(() => {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  if (!activeTag.value) return sorted
  return sorted.filter(post => post.tags && post.tags.includes(activeTag.value!))
})
</script>

<template>
  <Navbar/>
  <div class="blog-container container">

    <div class="tag-filter-wrapper">
      <select v-model="activeTag" class="tag-select" aria-label="Filter tulisan berdasarkan topik">
        <option :value="null">All Posts</option>
        <option v-for="tag in allTags" :key="tag" :value="tag">
          {{ tag }}
        </option>
      </select>
    </div>

    <main class="blog-list">
      <div v-if="filteredPosts.length === 0" class="empty">
        No posts found for this tag.
      </div>
      <article v-for="post in filteredPosts" :key="post.slug" class="card">
        <router-link :to="`/blog/${post.slug}`">
          <span class="card-date">{{ formatDate(post.date) }}</span>
          <h2>{{ post.title }}</h2>
          <div v-if="post.tags && post.tags.length > 0" class="card-tag">
             <span v-for="tag in post.tags" :key="tag">
                #{{ tag }}
             </span>
          </div>
          <div v-else class="card-tag">
             <span>
                #null
             </span>
          </div>
        </router-link>
      </article>
    </main>
  </div>
  <Footer/>
</template>

<style scoped>
.blog-container {
  margin-top: 2rem;
}

.tag-filter-wrapper {
  margin-bottom: 2rem;
  display: flex;
}

.tag-select {
  background-color: var(--surface);
  color: var(--text-main);
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  border: 2px solid var(--border-color);
  padding: 0.5rem 1rem;
  cursor: pointer;
  box-shadow: 3px 3px 0px var(--border-color);
  outline: none;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--border-color) 50%), 
                    linear-gradient(135deg, var(--border-color) 50%, transparent 50%);
  background-position: calc(100% - 1.25rem) calc(1.15rem), calc(100% - 0.85rem) calc(1.15rem);
  background-size: 8px 8px, 8px 8px;
  background-repeat: no-repeat;
  transition: all 0.1s ease;
  min-width: 200px;
}

.tag-select:focus {
  box-shadow: 3px 3px 0px var(--accent);
  border-color: var(--accent);
}

.tag-select option {
  background-color: var(--surface);
  color: var(--text-main);
  font-family: inherit;
}

.card {
  background-color: var(--surface);
  border: 2px solid var(--border-color);
  padding: 1.25rem; 
  box-shadow: var(--shadow-solid);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  margin-bottom: 1.5rem;
}

.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px var(--accent);
  border-color: var(--accent);
}

.card-date {
  font-size: 0.875rem;
  color: var(--bg-color);
  background-color: var(--text-main);
  padding: 0.2rem 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  border: 2px solid var(--border-color);
}

.card h2 {
  font-size: clamp(1.2rem, 2vw, 1.4rem); 
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.card-tag {
   color: var(--text-muted);
   text-decoration: underline;
   font-family: 'Architects Daughter', cursive, sans-serif;
}

.card:hover .card-tag {
   color: var(--accent);
}

.card-tag span {
   margin-right: .5rem;
}

.empty {
  text-align: center;
  padding: 3rem 0;
  font-style: italic;
  color: var(--text-muted);
}
</style>