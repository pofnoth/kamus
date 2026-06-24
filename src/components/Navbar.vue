<script setup>
import { ref, onMounted } from 'vue'

const currentTheme = ref('light')

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  localStorage.setItem('kamus-theme', currentTheme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('kamus-theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})
</script>

<template>
  <nav class="navbar">
    <span class="logo">Kamus.dev_</span>
    <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle Theme">
      <svg v-if="currentTheme === 'light'" class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg v-else class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 3rem;
}
.logo { font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
.theme-toggle {
  background: var(--surface);
  color: var(--text-main);
  border: 2px solid var(--border-color);
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 0px var(--border-color);
  transition: all 0.1s ease;
}
.theme-toggle:active { transform: translate(2px, 2px); box-shadow: 0px 0px 0px var(--border-color); }
.theme-toggle svg { width: 24px; height: 24px; }
</style>