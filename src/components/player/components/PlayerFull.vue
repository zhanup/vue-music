<template>
  <div class="player-full" v-show="isFull">
    <nav-bar class="pl-header">
      <template #left>
        <div class="back" @click="backClick">
          <v-icon name="down" class="icon" />
        </div>
      </template>
      <p class="name">{{ currentMusic.name }}</p>
      <p class="singer">{{ currentMusic.singer }}</p>
    </nav-bar>
    <div
      class="pl-content"
      ref="content"
      @touchstart="dragStatus = true"
      @touchend="dragStatus = false"
    >
      <ul class="lrc-list">
        <li
          class="lrc-item f-thide"
          :style="[index === curIndex ? { color: '#fff' } : {}]"
          v-for="(lrc, index) in lrcData[1]"
          :key="index"
        >
          {{ lrc }}
        </li>
      </ul>
    </div>
    <div class="pl-progress">
      <div class="pl-time">{{ formatTime(currentTime) }}</div>
      <Slider class="pl-slider" :percent="percent" @drag-end="dragEnd" />
      <div class="pl-time">{{ formatTime(currentMusic.duration / 1000) }}</div>
    </div>
    <div class="pl-btnBox">
      <div class="btn btn-mode_list"></div>
      <div class="btn btn-prev" @click="emit('prev')" />
      <div
        class="btn btn-play"
        :class="isPlay ? 'btn-play' : 'btn-pause'"
        @click="emit('play')"
      />
      <div class="btn btn-next" @click="emit('next')" />
      <div class="btn btn-list" @click="emit('open', true)" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import NavBar from '@/components/navbar/NavBar.vue'
import Slider from '@/components/slider/Slider.vue'
import dayjs from 'dayjs'

const props = defineProps(['isFull', 'isPlay', 'currentTime'])
const emit = defineEmits(['update:isFull', 'play', 'open', 'prev', 'next', 'drag-end'])
const store = useStore()
const { currentMusic, lyric } = storeToRefs(store)
const content = ref(null)
const dragStatus = ref(false)
const vh = document.body.clientHeight / 100

const backClick = () => {
  emit('update:isFull', false)
}

// 进度条百分比
const percent = computed(() => {
  return (
    ((props.currentTime * 1000) / currentMusic.value.duration) *
    100
  ).toFixed(1)
})

// 歌词数据，索引和内容
const lrcData = computed(() => {
  let lrcTime = []
  let lrcCon = []

  lyric.value
    .trim()
    .split('\n')
    .forEach((value) => {
      const index = value.indexOf(']')
      const t = value.slice(1, index).split(':')

      lrcTime.push(Number(t[0]) * 60 + Number(t[1]))
      lrcCon.push(value.slice(index + 1).trim())
    })

  return [lrcTime, lrcCon]
})

// 当前播放的歌词索引
const curIndex = computed(() => {
  let index = -1

  lrcData.value[0].forEach((v, i, a) => {
    if (props.currentTime >= v && props.currentTime < a[i + 1]) {
      index = i
    } else if (props.currentTime > a[a.length - 1]) {
      index = a.length - 1
    }
  })

  return index
})

const formatTime = (time) => {
  return dayjs(time * 1000).format('mm:ss')
}

// 进度条拖动结束
const dragEnd = (value) => {
  emit('drag-end', value)
}

// 如果页面返回，关闭全屏
const watchBack = () => {
  if (props.isFull) {
    emit('update:isFull', false)
  }
}

watch(curIndex, () => {
  // 拖动歌词是，停止滚动
  !dragStatus.value && content.value?.scrollTo({
    top: 5 * vh * curIndex.value,
    behavior: 'smooth'
  })
})

onMounted(() => {
  window.addEventListener('popstate', watchBack)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', watchBack)
})
</script>

<style scoped lang="scss">
.player-full {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: #333;
}

.pl-header {
  position: relative;
  z-index: 10;
  background-color: transparent !important;

  .icon {
    font-size: 24px;
  }

  .name {
    color: #fff;
    font-size: 14px;
    padding-top: 13px;
    line-height: 1;
  }

  .singer {
    color: #888;
    font-size: 12px;
    padding-top: 5px;
    line-height: 1;
  }
}

.pl-content {
  position: absolute;
  top: 80px;
  right: 0;
  bottom: 140px;
  left: 0;
  z-index: 10;
  overflow: scroll;

  .lrc-list {
    position: relative;
    top: 30vh;
    transition: all 0.2s;
    color: hsla(0, 0%, 100%, 0.6);
    padding: 0 20px;
    text-align: center;
  }

  .lrc-item {
    height: 5vh;
    line-height: 5vh;
  }
}

.pl-progress {
  position: absolute;
  left: 0;
  bottom: 84px;
  width: 100%;
  z-index: 10;
  padding: 0 10px;
  color: #fff;
  display: flex;
  align-items: center;

  .pl-slider {
    flex: 1;
    margin-right: 10px;
    margin-left: 15px;
  }
}

.pl-btnBox {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  padding: 4px 20px 20px;
  justify-content: space-between;

  .btn {
    width: 60px;
    height: 60px;
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .btn-mode_list {
    background-image: url('@/assets/images/mode-list.png');
  }

  .btn-prev {
    background-image: url('@/assets/images/prev.png');
  }

  .btn-next {
    background-image: url('@/assets/images/next.png');
  }

  .btn-play {
    background-image: url('@/assets/images/play.png');
  }

  .btn-pause {
    background-image: url('@/assets/images/pause.png');
  }

  .btn-list {
    background-image: url('@/assets/images/list.png');
  }
}
</style>
