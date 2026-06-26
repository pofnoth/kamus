<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  htmlAttrs: {
    lang: 'id'
  }
})
</script>

<template>
   <router-view />
</template>

<style scoped></style>
