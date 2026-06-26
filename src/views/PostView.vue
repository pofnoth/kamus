<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router'
import { computed } from "vue"
import { posts } from "virtual:blog-posts"

const route = useRoute()

const currentSlug = computed(() => {
  return route.path.split('/').pop()
})

const postData = computed(() => {
  return posts.find(post => post.slug === currentSlug.value)
})

const visibleTags = computed(() => {
  if (!postData.value || !postData.value.tags) return []
  // Filter akan membuang tag 'headline' (tidak peduli huruf besar/kecil)
  return postData.value.tags.filter(tag => tag.toLowerCase() !== 'headline')
})

</script>

<template>
  <Navbar/>
  <div class="container">

    <main class="post-wrapper">

      <article class="card blueprint-prose">
        
        <header class="post-header" v-if="postData">
          <h1 class="post-title">{{ postData.title }}</h1>
            <div class="post-tags" v-if="visibleTags.length > 0">
              <span 
                v-for="tag in visibleTags" 
                :key="tag" 
                class="tag-badge"
              >
                #{{ tag }}
              </span>
            </div>
        </header>

        <div class="markdown-content">
          <router-view />
        </div>

      </article>
<!-- Tunggu ada gunanya
      <nav class="post-pagination">
        <button class="nav-btn">Previous</button>
        <button class="nav-btn">Next</button>
      </nav>
-->
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* 1. Layout Dasar Halaman Post */
.post-wrapper {
  /* Kita perlebar sedikit wadah utamanya agar teks tidak tercekik */
  max-width: 54rem; 
  margin: 0 auto;
}

.blueprint-prose {
  margin-bottom: 2rem;
  /* Kita pecah padding-nya. 
    Atas-bawah: cukup lega (2rem - 3rem).
    Kiri-kanan: kita tekan menjadi lebih tipis (1rem di HP, maksimal 2rem di Desktop)
  */
  padding: clamp(2rem, 5vw, 3rem) clamp(0, 3vw, 2rem); 
}

.post-pagination {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  border: 2px solid var(--border-color);
  background-color: var(--surface);
  box-shadow: var(--shadow-solid);
}

.nav-btn {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-family: 'Architects Daughter', cursive;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-main);
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-btn:first-child {
  border-right: 2px solid var(--border-color);
}

.nav-btn:hover {
  background-color: var(--grid-color);
  color: var(--accent);
}

/* Styling Khusus Judul dari Frontmatter */
.post-header {
  padding-bottom: 1.5rem;
  border-bottom: 2px dashed var(--grid-color);
}

.post-title {
  font-family: 'Architects Daughter', cursive, sans-serif;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  line-height: 1.1;
  margin-bottom: 1rem;
  /* Stabilo Neon Effect */
  display: inline;
  background-image: linear-gradient(transparent 60%, rgba(255, 51, 102, 0.2) 60%);
}

:global([data-theme="dark"]) .post-title {
  background-image: linear-gradient(transparent 60%, rgba(0, 255, 204, 0.2) 60%);
}

/* Styling Tags Brutalism */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.tag-badge {
  font-family: 'Architects Daughter', cursive, sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--bg-color);
  background-color: var(--text-main);
  padding: 0.2rem 0.75rem;
  border: 1px solid var(--border-color);
  box-shadow: 2px 2px 0px var(--border-color);
  letter-spacing: 1px;
}

/* =========================================
   2. ISOLASI CSS MARKDOWN (SANGAT KRUSIAL)
   Ini menargetkan tag HTML murni yang dihasilkan oleh file .md
========================================= */

/* Mengamankan efek stabilo pada Heading (H1) */
.markdown-content :deep(h1) {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.2;
  margin-bottom: 1.5rem;
  /* Membuat background gradient agar tidak menutupi seluruh blok */
  display: inline;
  background-image: linear-gradient(transparent 60%, rgba(255, 51, 102, 0.2) 60%);
}

.post-title, .markdown-content :deep(h1) {
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone; 
}

:global([data-theme="dark"]) .markdown-content :deep(h1) {
  background-image: linear-gradient(transparent 60%, rgba(0, 255, 204, 0.2) 60%);
}

.markdown-content :deep(h2), 
.markdown-content :deep(h3) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.markdown-content :deep(p) {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

/* Mendesain Gambar Kucing agar menjadi bagian dari Schematic (Bukan sekadar gambar) */
.markdown-content :deep(img) {
  display: block;
  max-width: 100%;
  border: 2px solid var(--border-color);
  /* Bayangan solid warna aksen sesuai mockup */
  box-shadow: 6px 6px 0px var(--accent); 
  margin: 2.5rem auto;
  background-color: var(--bg-color);
  padding: 0.5rem; /* Memberikan efek bingkai polaroid kasar */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.markdown-content :deep(img:hover) {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px var(--accent);
}

/* Merombak List (Bullet Points) menjadi Kotak-Kotak Brutalism */
.markdown-content :deep(ul) {
  list-style: none; /* Bunuh bullet bawaan browser */
  padding: 0;
  margin: 2rem 0;
}

.markdown-content :deep(ul li) {
  border: 2px solid var(--border-color);
  background-color: var(--bg-color); /* Menggunakan warna grid background, bukan warna card */
  padding: 0.75rem 1.2rem;
  margin-bottom: 0.75rem;
  box-shadow: 2px 2px 0px var(--border-color);
  font-weight: bold;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

/* Menciptakan bullet point mekanik kustom */
.markdown-content :deep(ul li::before) {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-top: 0.4rem;
  background-color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: 50%; /* Satu-satunya elemen yang boleh melengkung */
  flex-shrink: 0;
}

/* Tabel (Jika kamu memakai markdown table) */
.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  border: 2px solid var(--border-color);
}

.markdown-content :deep(th), 
.markdown-content :deep(td) {
  border: 2px solid var(--border-color);
  padding: 0.75rem;
  text-align: left;
}

.markdown-content :deep(th) {
  background-color: var(--grid-color);
  font-family: 'Architects Daughter', cursive;
}
</style>