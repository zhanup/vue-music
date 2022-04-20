<template>
  <div class="container">
    <router-view />
  </div>
  <Player v-if="showPlayer" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import Player from './components/player/Player.vue'

const store = useStore()
const { showPlayer } = storeToRefs(store)
</script>

<style scoped>
.container {
  flex: 1;
  overflow: hidden;
}
</style>
