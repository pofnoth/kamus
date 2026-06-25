<script setup>
import { ref, onMounted } from 'vue'

const currentTheme = ref('light')
const isMenuOpen = ref(false)

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  localStorage.setItem('kamus-theme', currentTheme.value)
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
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
  <header class="navbar-wrapper">
    <div class="nav-content">
      <span class="logo">POFNOTH_</span>
      
      <button class="burger-btn" :class="{ 'is-open': isMenuOpen }" @click="toggleMenu" aria-label="Toggle Menu">
        <div class="burger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>

    <div class="nav-menu" :class="{ 'is-open': isMenuOpen }">
      <router-link to="/" @click="isMenuOpen = false">Beranda</router-link>
      <router-link to="/blog" @click="isMenuOpen = false">Tulisan</router-link>
      
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
    </div>
  </header>
</template>

<style scoped>
/* =========================================
   STRUKTUR WRAPPER MOBILE
   ========================================= */
.navbar-wrapper {
  position: relative;
  margin-bottom: 3rem;
  z-index: 100;
  /* Memastikan font tulisan tangan turun ke menu */
  font-family: inherit; 
}

/* KOTAK NAVBAR (Mengembalikan desain solid dari Image 2) */
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border-bottom: 2px solid var(--text-main, #000);
  padding: 1rem 1.25rem;
}

.logo { 
  font-size: 1.5rem; 
  font-weight: 700; 
  text-transform: uppercase; 
  letter-spacing: 2px; 
}

/* =========================================
   ANIMASI BURGER MENU (MENJADI 'X')
   ========================================= */
.burger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger-icon {
  width: 24px;
  height: 18px;
  position: relative;
}

.burger-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: var(--text-main, #000);
  border-radius: 2px;
  left: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Posisi awal garis burger */
.burger-icon span:nth-child(1) { top: 0; }
.burger-icon span:nth-child(2) { top: 50%; transform: translateY(-50%); }
.burger-icon span:nth-child(3) { bottom: 0; }

/* Posisi akhir (Membentuk X) saat is-open */
.burger-btn.is-open .burger-icon span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}
.burger-btn.is-open .burger-icon span:nth-child(2) {
  opacity: 0;
  transform: translateY(-50%) translateX(10px);
}
.burger-btn.is-open .burger-icon span:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* =========================================
   DROPDOWN PANEL (MENYATU DENGAN KOTAK ATAS)
   ========================================= */
.nav-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--surface, #fff);
  border: 2px solid var(--text-main, #000);
  border-top: none; /* Kunci agar terlihat seperti 1 laci yang sama */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  /* Animasi Slide-down */
  opacity: 0;
  transform: translateY(-15px);
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-menu.is-open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.nav-menu a {
  text-decoration: none;
  color: var(--text-main, #000);
  font-weight: 600;
  font-size: 1.25rem;
  transition: opacity 0.2s;
}

.nav-menu a:hover { opacity: 0.6; }

/* Tombol Tema */
.theme-toggle {
  background: transparent;
  color: var(--text-main, #000);
  border: 2px solid var(--text-main, #000);
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  box-shadow: 3px 3px 0px var(--text-main, #000);
  transition: transform 0.1s, box-shadow 0.1s;
}

.theme-toggle:active { 
  transform: translate(3px, 3px); 
  box-shadow: 0px 0px 0px var(--text-main, #000); 
}

/* =========================================
   BREAKPOINT: LAYAR LEBAR (Tablet & PC)
   ========================================= */
@media (min-width: 768px) {
  .navbar-wrapper {
    /* Jadikan wrapper sebagai kotak utamanya di desktop */
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--surface, #fff);
    border-bottom: 2px solid var(--text-main, #000);
    padding: 0.75rem 1.5rem;
  }

  /* Matikan border pada content karena wrapper sudah memilikinya */
  .nav-content {
    border: none;
    padding: 0;
    background: transparent;
  }

  .burger-btn { display: none; }

  /* Ubah dropdown menjadi barisan horizontal */
  .nav-menu {
    position: static;
    flex-direction: row;
    background: transparent;
    border: none;
    padding: 0;
    opacity: 1;
    visibility: visible;
    transform: none;
    gap: 2.5rem;
  }
}
</style>