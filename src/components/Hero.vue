<template>
  <header class="hero">
    <h1>Halo👋, Namaku kamus<br><span>The Pioneer Of Nothing</span></h1>
    <div class="hero-desc">
       Aku menuangkan tulisanku kedalam 3 kategori:
       <ul>
          <li>ibarat: Sebagai wadah mengolah fantasi, rima, dan hal-hal abstrak nan puitis.</li>
          <li>sudut bias: Menyentuh topik serius terkait cara pandang dunia, moralitas, serta kesimpulan buah pikirku.</li>
          <li>manusiawi: Menampung segala hal yang hingga kini belum aku temukan jawaban akhirnya.</li>
       </ul>
    </div>
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
.hero-desc { font-size: clamp(1.25rem, 2vw, 1.5rem); color: var(--text-muted); max-width: 42rem; }
</style>