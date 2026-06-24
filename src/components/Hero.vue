<template>
  <header class="hero">
    <h1>Refleksi Skematik untuk <br><span>Digital Pioneer</span></h1>
    <p>Tempat mendokumentasikan pemikiran, eksperimen, dan langkah-langkah dalam membangun ekosistem web yang bersih dan efisien.</p>
  </header>
</template>

<style scoped>
.hero { padding: 3rem 0; margin-bottom: 3rem; }
.hero h1 { font-size: clamp(3rem, 6vw + 1rem, 5rem); line-height: 1.1; margin-bottom: 1.5rem; }
.hero h1 span {
  color: var(--accent);
  background-image: linear-gradient(transparent 60%, rgba(255, 51, 102, 0.2) 60%);
}
:global([data-theme="dark"]) .hero h1 span {
  background-image: linear-gradient(transparent 60%, rgba(0, 255, 204, 0.2) 60%);
}
.hero p { font-size: clamp(1.25rem, 2vw, 1.5rem); color: var(--text-muted); max-width: 42rem; }
</style>