<script setup lang="ts">
import { ping } from './api'

onMounted(() => {
  ping()
})
</script>

<template>
  <header>
    <div class="wrapper">HELLO WORLD v0.0.2</div>
  </header>

  <RouterView />
</template>
