<template>
  <DetailLayout
    class="playlist"
    ref="layout"
    title="歌单列表"
    :loading="loading"
    :pull-up-load="true"
    @pullingUp="loadMore"
  >
    <playlist-content :data="playlists" />
  </DetailLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DetailLayout from '@/layouts/detailLayout'
import PlaylistContent from './components/PlaylistContent'
import { getPlaylist } from '@/api'

const layout = ref(null)
const playlists = ref([])
const total = ref(0)
const pageNum = ref(1)

const loading = computed(() => {
  return playlists.value.length > 0 ? false : true
})

const _getPlaylist = async () => {
  const res = await getPlaylist(pageNum.value)

  playlists.value = [...playlists.value, ...res.playlists]
  total.value = res.total
  layout.value?.refresh()
}

const loadMore = async () => {
  if (playlists.value.length === total.value) {
    return
  }

  pageNum.value += 1
  await _getPlaylist()
  layout.value?.finishPullUp()
}

onMounted(() => {
  _getPlaylist()
})
</script>

<style scoped lang="scss">
.playlist {
  &:deep(.navbar) > .center  {
    text-align: center;
  }
}
</style>
