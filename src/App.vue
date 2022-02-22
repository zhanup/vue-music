<template>
  <div class="home">
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const msg = ref('Hello Word!')
</script>

<style scoped lang="scss">
</style>