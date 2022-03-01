<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted } from 'vue'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

const props = defineProps({
  pullUpLoad: {
    type: Boolean,
    default: false
  },
  probeType: {
    type: Number,
    default: 0
  },
  bounce: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['pullingUp', 'scroll'])

const { pullUpLoad, probeType, bounce } = toRefs(props)
const wrapper = ref()
const scroll = ref({})

// 初始化 BetterScroll
const initScroll = () => {
  if (!wrapper.value) {
    return
  }
  scroll.value = new BScroll(wrapper.value, {
    click: true,
    pullUpLoad: pullUpLoad.value,
    probeType: probeType.value,
    bounce: bounce.value
  })

  if (probeType.value === 2 || probeType.value === 3) {
    scroll.value.on('scroll', (position) => {
      emit('scroll', position)
    })
  }

  if (pullUpLoad.value) {
    scroll.value.on('pullingUp', () => {
      emit('pullingUp')
    })
  }
}

// 重新计算 BetterScroll
const refresh = () => {
  scroll.value?.refresh()
}

// 结束上拉加载行为
const finishPullUp = () => {
  scroll.value?.finishPullUp()
}

// 滚动到指定位置
const scrollTo = (x, y) => {
  scroll.value?.scrollTo(x, y)
}

onMounted(() => {
  initScroll()
})

defineExpose({
  refresh,
  finishPullUp,
  scrollTo
})
</script>
