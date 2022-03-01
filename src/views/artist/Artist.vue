<template>
  <DetailLayout class="artist" ref="layout" title="歌手" :loading="loading">
    <artist-header :artist="artist" :fans-cnt="fansCnt" />
    <h2 class="artt">歌手简介</h2>
    <artist-intro :data="artist" @full="fullChange" />
    <h2 class="artt mgt8">热门单曲</h2>
    <song-list class="songs" :data="songList" @item-click="itemClick" />
  </DetailLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import DetailLayout from '@/layouts/detailLayout'
import ArtistHeader from './components/ArtistHeader.vue'
import ArtistIntro from './components/ArtistIntro.vue'
import SongList from '@/components/songList/SongList.vue'
import { getArtistDetail, getArtistMusic, getArtistFollowCount } from '@/api'
import { isEmptyObject } from '@/utils'

const route = useRoute()
const store = useStore()
const layout = ref(null)
const artist = ref({})
const fansCnt = ref(0)
const hotSongs = ref([])

const loading = computed(() => {
  if (!isEmptyObject(artist.value) && hotSongs.value.length > 0) {
    return false
  }
  return true
})

// 点击歌曲列表
const itemClick = (index) => {
  store.setAllPlay(playList.value, index)
}

// 歌曲列表数据
const songList = computed(() => {
  return hotSongs.value.map((item) => ({
    id: item.id,
    name: item.name,
    artists: item.ar,
    alias: item.al
  }))
})

// 播放列表数据
const playList = computed(() => {
  return hotSongs.value.map((item) => ({
    id: item.id,
    name: item.name,
    singer: item.ar[0].name,
    album: item.al.name,
    image: item.al.picUrl,
    duration: item.dt,
    url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
  }))
})

// 控制歌手介绍展开
const fullChange = () => {
  layout.value?.refresh()
}

onMounted(async () => {
  const id = route.params.id
  const res = await Promise.all([
    getArtistDetail(id),
    getArtistMusic(id),
    getArtistFollowCount(id)
  ])

  artist.value = res[0].data.artist
  hotSongs.value = res[1].hotSongs
  fansCnt.value = res[2].data.fansCnt

  layout.value?.refresh()
})
</script>

<style scoped lang="scss">
.artist {
  background-color: #fcfcfd;
}

.artt {
  position: relative;
  font-size: 18px;
  z-index: 2;
  margin-top: -5px;
  padding: 15px;
  background: #fff;
  font-weight: 700;
}

.mgt8 {
  margin-top: 8px;
}

.songs {
  background-color: #fff;
}
</style>
