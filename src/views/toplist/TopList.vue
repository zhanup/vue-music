<template>
  <Loading :is-show="loading" />
  <Scroll class="toplist" ref="scroll" :bounce="false">
    <h2 class="toplist-title">官方榜单</h2>
    <OfficialList :data="list" @img-load="imgLoad" />
    <h2 class="toplist-title">全球榜单</h2>
    <GlobalList :data="list" @img-load="imgLoad" />
  </Scroll>
</template>
, effect
<script setup>
import { ref, onMounted, computed } from 'vue'
import Loading from '@/components/loading/Loading.vue'
import Scroll from '@/components/scroll/Scroll.vue'
import OfficialList from './components/OfficialList'
import GlobalList from './components/GlobalList'
import { getToplistDetail } from '@/api'

const scroll = ref()
const list = ref([])

const loading = computed(() => {
  return list.value.length > 0 ? false : true
})

const imgLoad = () => {
  scroll.value?.refresh()
}

onMounted(async () => {
  const res = await getToplistDetail()
  list.value = res.list
})
</script>

<style scoped lang="scss">
.toplist {
  height: 100%;
  overflow: hidden;

  .toplist-title {
    position: relative;
    width: 100%;
    line-height: 44px;
    font-size: 15px;
    text-indent: 10px;
  }
}
</style>
