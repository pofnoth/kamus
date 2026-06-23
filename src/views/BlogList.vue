<script setup lang="ts">
import { posts } from 'virtual:blog-posts'
import { formatDate } from "@/utils/time.ts"

// Sort posts by date descending
const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
</script>

<template>
  <div class="blog-container">
    <header>
      <router-link to="/" class="back-link">← Back</router-link>
      <h1>Writing</h1>
    </header>

    <main class="blog-list">
      <div v-if="sortedPosts.length === 0" class="empty">
        No posts yet.
      </div>
      <small>{{ posts }}</small>
      <article v-for="post in sortedPosts" :key="post.slug" class="post-item">
        <router-link :to="`/blog/${post.slug}`">
          <div class="post-meta">{{ formatDate(post.date) }}</div>
          <h2 class="post-title">{{ post.title }}</h2>
        </router-link>
      </article>
    </main>
  </div>
</template>

<style scoped>
.blog-container {
  max-width: 650px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #333;
}

header {
  margin-bottom: 40px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.back-link:hover {
  color: #000;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.post-item a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-meta {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 4px;
}

.post-title {
  font-size: 1.25rem;
  margin: 0;
  font-weight: 500;
  transition: color 0.2s ease;
}

.post-item:hover .post-title {
  color: #0070f3;
}

.empty {
  color: #666;
  font-style: italic;
}

@media (max-width: 600px) {
  .blog-container {
    padding: 20px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .post-title {
    font-size: 1.1rem;
  }
}
</style>
