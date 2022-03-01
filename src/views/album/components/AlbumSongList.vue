<template>
  <div class="pylst_list">
    <h3 class="u-smtitle">歌曲列表</h3>
    <song-list :data="songList" @item-click="itemClick" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import SongList from '@/components/songList/SongList.vue'

const props = defineProps(['songs'])
const store = useStore()

const itemClick = (index) => {
  store.setAllPlay(playList.value, index)
}

// 歌曲列表数据
const songList = computed(() => {
  return props.songs.map((item) => ({
    id: item.id,
    name: item.name,
    artists: item.ar,
    alias: item.al
  }))
})

// 播放列表数据
const playList = computed(() => {
  return props.songs.map((item) => ({
    id: item.id,
    name: item.name,
    singer: item.ar[0].name,
    album: item.al.name,
    image: item.al.picUrl,
    duration: item.dt,
    url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
  }))
})
</script>
