<template>
  <div class="player-min" @click="emit('pmClick')">
    <div class="pm-img">
      <img :src="currentMusic.image" alt="" />
    </div>
    <div class="pm-info">
      <h2>{{ currentMusic.name }}</h2>
      <p>{{ currentMusic.singer }}</p>
    </div>
    <div class="pm-play" :class="isPlay ? '' : 'pause'" @click.stop="emit('play')"></div>
    <div class="pm-list" @click.stop="handleOpen"></div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'

defineProps(['isPlay'])
const emit = defineEmits(['play', 'open', 'pmClick'])
const store = useStore()
const { currentMusic } = storeToRefs(store)

const handleOpen = () => {
  emit('open', true)
}
</script>

<style scoped lang="scss">
.player-min {
  position: relative;
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: #fff;

  &::before {
    content: '';
    height: 0;
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    border-top: 1px solid #ebedf0;
  }

  .pm-img {
    width: 44px;
    height: 44px;
    margin-right: 8px;
    border-radius: 4px;
    overflow: hidden;
  }

  .pm-info {
    flex: 1;
    line-height: 1;

    h2 {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 5px;
    }

    p {
      font-size: 12px;
      color: #888;
    }
  }

  .pm-play {
    width: 30px;
    height: 30px;
    margin-right: 15px;
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('@/assets/player/min-play.png');

    &.pause {
      background-image: url('@/assets/player/min-pause.png');
    }
  }

  .pm-list {
    width: 32px;
    height: 32px;
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('@/assets/player/min-list.png');
  }
}
</style>
