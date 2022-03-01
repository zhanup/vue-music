<template>
  <DetailLayout
    ref="layout"
    title="歌单"
    :loading="loading"
    :pull-up-load="true"
    @pulling-up="loadMore"
  >
    <detail-header :data="detail" />
    <song-list :data="songList" @item-click="itemClick" />
  </DetailLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import DetailLayout from '@/layouts/detailLayout'
import DetailHeader from './components/DetailHeader.vue'
import SongList from '@/components/songList/SongList.vue'
import { getPlaylistDetail, getSongDetail } from '@/api'

const route = useRoute()
const store = useStore()
const layout = ref(null)
const detail = ref({})
const songs = ref([])
const page = ref(1)
const trackIds = ref([])

const loading = computed(() => {
  if (songs.value.length > 0 && JSON.stringify(detail.value) !== '{}') {
    return false
  }
  return true
})

// 歌曲列表数据
const songList = computed(() => {
  return songs.value.map((item) => ({
    id: item.id,
    name: item.name,
    alias: item.alia,
    artists: item.ar
  }))
})

// 播放列表数据
const playList = computed(() => {
  return songs.value.map((item) => ({
    id: item.id,
    name: item.name,
    singer: item.ar[0].name,
    album: item.al.name,
    image: item.al.picUrl,
    duration: item.dt,
    url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
  }))
})

const _getPlaylistDetail = async () => {
  const id = route.params.id
  const { playlist } = await getPlaylistDetail(id)

  detail.value = {
    name: playlist.name,
    playCount: playlist.playCount,
    coverImgUrl: playlist.coverImgUrl,
    nickname: playlist.creator.nickname,
    avatarUrl: playlist.creator.avatarUrl
  }
  trackIds.value = playlist.trackIds
  _getSongDetail()
}

// 一次加载50条歌曲数据
const _getSongDetail = async () => {
  const ids = trackIds.value
    .slice((page.value - 1) * 50, page.value * 50)
    .map((item) => item.id)
    .join(',')
  const res = await getSongDetail(ids)

  songs.value = [...songs.value, ...res.songs]
  layout.value?.refresh()
}

// 加载更多
const loadMore = async () => {
  if (songs.value.length === trackIds.value.length) {
    return
  }

  page.value += 1
  await _getSongDetail()
  layout.value?.finishPullUp()
}

// 点击音乐，播放
const itemClick = (index) => {
  store.setAllPlay(playList.value, index)
}

onMounted(() => {
  _getPlaylistDetail()
})
</script>
