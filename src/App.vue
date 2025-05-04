<script setup lang="ts">
import { ping } from './api'

onMounted(() => {
  ping()
})
</script>

<template>
  <header>
    <div class="wrapper">HELLO WORLD</div>
  </header>

  <RouterView />
</template>
