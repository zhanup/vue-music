<template>
  <Scroll
    class="search"
    ref="scroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
  >
    <!-- 搜索框 -->
    <search-input
      v-model="searchText"
      @input="handleInput"
      @clear="handleClear"
    />

    <!-- 搜索建议 -->
    <search-suggest
      v-show="mode === 2"
      :list="suggestList"
      :search-text="searchText"
      @search="handleSuggestSearch"
    />

    <!-- 热词搜索、搜索历史 -->
    <search-help
      v-show="mode === 1"
      :hots="hots"
      :history="history"
      @search="handleHotSearch"
      @item-click="handleHistorySearch"
    />

    <!-- 搜索结果，歌手、专辑、单曲 -->
    <search-result v-show="mode === 3" :songs="songs" :match-data="matchData" />
  </Scroll>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import Scroll from '@/components/scroll/Scroll.vue'
import SearchInput from './components/SearchInput.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchHelp from './components/SearchHelp.vue'
import SearchResult from './components/SearchResult.vue'
import { getSearchSuggest, getSearchHot, searchSongs, searchMultimatch } from '@/api'

// mode的值 1：默认  2：显示搜索建议  3：显示搜索结果
const mode = ref(1)
const scroll = ref(null)
const searchText = ref('')
const suggestList = ref([])
const hots = ref([])
const history = ref([])
const songs = ref([])
const hasMore = ref(true)
const matchData = ref({})
const pageNum = ref(1)
let timer = -1

// 重新计算scroll高度
const refresh = () => {
  nextTick(() => {
    scroll.value?.refresh()
  })
}

// 上拉结束，为下一次上拉做准备
const finishPullUp = () => {
  scroll.value?.finishPullUp()
}

const getHotWord = async () => {
  const { result } = await getSearchHot()
  hots.value = result.hots
  refresh()
}

// 获取搜索建议
const getSuggest = async (keyword) => {
  const res = await getSearchSuggest(keyword)
  suggestList.value = res.result.allMatch
}

// 搜索
const getSongs = async (keyword) => {
  const { result } = await searchSongs(keyword, pageNum.value)
  songs.value = result.songs
  hasMore.value = result.hasMore
  refresh()
}

// 多重匹配
const getMultimatch = async (keyword) => {
  const {
    result: { album, artist, playlist }
  } = await searchMultimatch(keyword)
  matchData.value = {
    album: album ? album : [],
    artist: artist ? artist : [],
    playlist: playlist ? playlist : []
  }
  refresh()
}

// 处理input组件事件
const handleInput = (event) => {
  const { value } = event.target

  if (!value.trim()) {
    return
  }

  mode.value = 2

  // 防抖
  clearTimeout(timer)
  timer = setTimeout(() => {
    getSuggest(value)
  }, 500)
}

// 重置状态
const handleClear = () => {
  searchText.value = ''
  pageNum.value = 1
  refresh()
}

// 从热词搜索
const handleHotSearch = (keyword) => {
  if (!history.value.includes(keyword)) {
    history.value.unshift(keyword)
  }
  searchText.value = keyword
  songs.value = []

  getSongs(keyword)
  getMultimatch(keyword)
  mode.value = 3
}

// 从历史列表中搜索
const handleHistorySearch = (keyword) => {
  searchText.value = keyword
  getSongs(keyword)
  getMultimatch(keyword)
  mode.value = 3
}

// 从搜索建议中搜索
const handleSuggestSearch = (keyword) => {
  if (!history.value.includes(keyword)) {
    history.value.unshift(keyword)
  }
  searchText.value = keyword

  getSongs(keyword)
  getMultimatch(keyword)
  mode.value = 3
}

// 加载更多歌曲
const loadMore = async () => {
  if (!hasMore.value || mode.value !== 3) {
    return
  }

  pageNum.value += 1
  const { result } = await searchSongs(searchText.value, pageNum.value)

  songs.value = [...songs.value, ...result.songs]
  hasMore.value = result.hasMore
  refresh()
  finishPullUp()
}

// 监听searchText，如果searchText为空，mode设置为1
watch(searchText, () => {
  if (searchText.value === '') {
    mode.value = 1
  }
})

// history 发生改变，保存到localStorage
watch(
  () => [...history.value],
  () => {
    localStorage.setItem('history', JSON.stringify(history.value))
  }
)

onMounted(() => {
  getHotWord()
  if (localStorage.getItem('history')) {
    history.value = JSON.parse(localStorage.getItem('history'))
    refresh()
  }
})
</script>

<style scoped>
.search {
  height: 100%;
  overflow: hidden;
}
</style>
