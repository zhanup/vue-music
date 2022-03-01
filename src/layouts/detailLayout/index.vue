<template>
  <div class="layout">
    <Loading :is-show="loading" />
    <LayoutNavBar :title="title" />
    <Scroll
      class="content"
      ref="scroll"
      :pull-up-load="pullUpLoad"
      @pulling-up="pullingUp"
    >
      <slot></slot>
    </Scroll>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import Loading from '@/components/loading/Loading.vue'
import LayoutNavBar from './components/LayoutNavBar.vue'
import Scroll from '@/components/scroll/Scroll.vue'

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  loading: {
    type: Boolean,
    default: true
  },
  pullUpLoad: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['pullingUp'])
const scroll = ref(null)

const pullingUp = () => {
  props.pullUpLoad && emit('pullingUp')
}

// 重新计算 BetterScroll
const refresh = () => {
  nextTick(() => {
    scroll.value?.refresh()
  })
}

// 结束上拉加载行为
const finishPullUp = () => {
  scroll.value?.finishPullUp()
}

defineExpose({
  refresh,
  finishPullUp
})
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
  
  .content {
    height: calc(100% - 52px);
    overflow: hidden;
  }
}
</style>
