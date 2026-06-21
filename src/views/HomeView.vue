<template>
  <main class="home-container">
    <div class="content">
      <h1>Kamus</h1>
      <p class="tagline">Pioneer Of Nothing</p>
      <nav>
        <router-link to="/blog" class="nav-link">Read Blog</router-link>
      </nav>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #fff;
  color: #000;
}

.content {
  text-align: center;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -1px;
}

.tagline {
  font-size: 1.2rem;
  color: #666;
  margin-top: 8px;
  margin-bottom: 32px;
}

.nav-link {
  display: inline-block;
  padding: 10px 24px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }
}
</style>