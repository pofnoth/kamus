<script setup>
// Eagerly fetch to access frontmatter immediately
const postsContext = import.meta.glob('../posts/*.md', { eager: true })

const posts = Object.entries(postsContext).map(([path, module]) => {
  const slug = path.match(/\/([^/]+)\.md$/)[1]
  return {
    slug,
    // module.frontmatter is automatically provided by unplugin-vue-markdown
    title: module.frontmatter?.title || slug,
    date: module.frontmatter?.date || 'No Date'
  }
})
</script>

<template>
  <div class="blog-index">
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <router-link :to="`/blog/${post.slug}`">
          {{ post.title }} — {{ post.date }}
        </router-link>
      </li>
    </ul>
  </div>
</template>