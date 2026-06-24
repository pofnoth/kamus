<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="card">
    <span class="card-tag">Headline</span>
    <h2>{{ post.title }}</h2>
    <p v-if="post.excerpt">{{ post.excerpt }}</p>
    <p v-else>Sebuah catatan arsitektur dari Kamus.dev...</p>
    
    <router-link :to="`/blog/${post.slug}`" class="card-link">
      Baca selengkapnya &rarr;
    </router-link>
  </article>
</template>

<style scoped>
.card {
  background-color: var(--surface);
  border: 2px solid var(--border-color);
  padding: clamp(1.25rem, 5vw, 2rem); 
  box-shadow: var(--shadow-solid);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}
.card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px var(--accent);
  border-color: var(--accent);
}
.card-tag {
  font-size: 0.875rem;
  color: var(--bg-color);
  background-color: var(--text-main);
  padding: 0.2rem 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: inline-block;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border-color);
}
.card h2 {
  font-size: clamp(1.4rem, 4vw, 1.8rem); 
  margin-bottom: 1rem;
  line-height: 1.2;
}
.card p { color: var(--text-muted); margin-bottom: 1.5rem; }
.card-link { font-weight: 700; font-size: 1.2rem; color: var(--text-main); display: inline-flex; align-items: center; gap: 0.5rem; }
.card-link:hover { color: var(--accent); }
</style>