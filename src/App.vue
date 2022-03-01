<template>
  <div class="wrapper">
    <div class="content">
      <router-view />
    </div>
    <Player v-if="showPlayer" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import Player from './components/player/Player.vue'

const store = useStore()
const { showPlayer } = storeToRefs(store)
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
