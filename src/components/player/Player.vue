<template>
  <div class="player">
    <player-full
      v-model:isFull="isFull"
      :is-play="isPlay"
      :current-time="currentTime"
      @play="play"
      @open="toggleShow"
      @prev="prevTrack"
      @next="nextTrack"
      @drag-end="dragEnd"
    />
    <player-mini
      :is-play="isPlay"
      @pm-click="isFull = !isFull"
      @play="play"
      @open="toggleShow"
    />
    <audio ref="audio" :src="currentMusic.url" />
    <music-list :is-open="showMusicList" @open="toggleShow" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import PlayerFull from './components/PlayerFull.vue'
import PlayerMini from './components/PlayerMini.vue'
import MusicList from './components/MusicList.vue'

const store = useStore()
const { currentIndex, currentMusic, playList } = storeToRefs(store)
const audio = ref()
const isFull = ref(false)
const isPlay = ref(false)
const showMusicList = ref(false)
const currentTime = ref(0)
let timer = null

// 开始播放
const canPlay = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    audio.value.play()
    isPlay.value = true
  }, 0)
}

// 播放和暂停
const play = () => {
  if (isPlay.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  isPlay.value = !isPlay.value
}

// 歌曲时间更新
const timeUpdate = () => {
  currentTime.value = audio.value?.currentTime || 0
}

// 上一曲
const prevTrack = () => {
  let index = currentIndex.value - 1
  if (index < 0) {
    index = playList.value.length - 1
  }
  store.setCurrentMusic(playList.value[index])
  store.currentIndex = index
}

// 下一曲
const nextTrack = () => {
  let index = currentIndex.value + 1
  if (index === store.playList.length) {
    index = 0
  }
  store.setCurrentMusic(playList.value[index])
  store.currentIndex = index
}

// 切换歌曲列表显示
const toggleShow = (open) => {
  showMusicList.value = open
}

// 进度条拖动结束
const dragEnd = (value) => {
  audio.value.currentTime = Number(value) / 100 * (currentMusic.value.duration / 1000)
}

onMounted(() => {
  audio.value.addEventListener('canplay', canPlay)
  audio.value.addEventListener('ended', nextTrack)
  audio.value.addEventListener('timeupdate', timeUpdate)
})

onBeforeUnmount(() => {
  audio.value.removeEventListener('canplay', canPlay)
  audio.value.removeEventListener('ended', nextTrack)
})
</script>

<style scoped lang="scss"></style>
