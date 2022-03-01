<template>
  <DetailLayout
    title="专辑"
    ref="layout"
    :loading="loading"
    :pull-up-load="true"
    @pullingUp="loadMore"
  >
    <album-header :data="album" />
    <album-intro
      v-if="album.description"
      :data="album"
      @open="openChange"
    />
    <album-song-list :songs="songs" />
    <album-comment :total="total" :data="comments" />
  </DetailLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import DetailLayout from '@/layouts/detailLayout'
import AlbumHeader from './components/AlbumHeader.vue'
import AlbumIntro from './components/AlbumIntro.vue'
import AlbumSongList from './components/AlbumSongList.vue'
import AlbumComment from './components/AlbumComment.vue'
import { getAlbum, getAlbumComment } from '@/api'
import { isEmptyObject } from '@/utils'

const route = useRoute()
const layout = ref(null)
const album = ref({})
const songs = ref([])
const comments = ref([])
const total = ref(0)
const currentPage = ref(1)

const loading = computed(() => {
  if (!isEmptyObject(album.value) && comments.value.length > 0) {
    return false
  }
  return true
})

// 歌单描述，展开和收起的变化
const openChange = () => {
  layout.value?.refresh()
}

// 获取专辑信息
const _getAlbum = async () => {
  const id = route.params.id
  const res = await getAlbum(id)

  album.value = res.album
  songs.value = res.songs
}

// 获取专辑评论
const _getAlbumComment = async () => {
  const id = route.params.id
  const res = await getAlbumComment(id, currentPage.value)
  
  total.value = res.total
  comments.value = [...comments.value, ...res.comments]
  layout.value?.refresh()
}

// 加载更多评论
const loadMore = async () => {
  if (comments.value.length === total.value) {
    return
  }
  currentPage.value += 1
  await _getAlbumComment()
  layout.value?.finishPullUp()
}

onMounted(() => {
  _getAlbum()
  _getAlbumComment()
})
</script>

<style scoped lang="scss">
.album {
  height: 100%;

  .content {
    height: calc(100% - 52px);
    overflow: hidden;
  }
}
</style>
