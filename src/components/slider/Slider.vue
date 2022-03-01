<template>
  <div class="slider" ref="slider" @click="onClick">
    <div class="slider-track"></div>
    <div class="slider-fill" :style="{ width: offsetX + '%' }"></div>
    <div
      class="slider-thumb"
      :style="{ left: offsetX + '%' }"
      @touchstart="start"
      @touchmove="move"
      @touchend="end"
    ></div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps(['percent'])
const emit = defineEmits(['drag-start', 'drag-end'])
const slider = ref(null)
const offsetX = ref('0')
const status = ref(false)
const { percent } = toRefs(props)

// 点击滑块，滑动准备
const start = (event) => {
  status.value = true
  emit('drag-start', event)
}

// 滑块移动
const move = (event) => {
  if (!status.value) return

  const startX = slider.value.offsetLeft
  const endX = event.touches[0].clientX
  const sliderWidth = slider.value.clientWidth

  let offsetWidth = endX - startX
  if (endX <= startX) {
    offsetWidth = 0
  } else if (endX >= sliderWidth + startX) {
    offsetWidth = sliderWidth
  }
  offsetX.value = ((offsetWidth / sliderWidth) * 100).toFixed(1)
}

// 滑块滑动结束
const end = () => {
  // console.log('end')
  status.value = false
  emit('drag-end', offsetX.value)
}

// 点击轨道
const onClick = (event) => {
  event.stopPropagation()
  // console.log('click')
  const startX = slider.value.offsetLeft
  const endX = event.clientX
  const sliderWidth = slider.value.clientWidth
  offsetX.value = (((endX - startX) / sliderWidth) * 100).toFixed(1)
  emit('drag-end', offsetX.value)
}

watch([status, percent], (newValues, prevValues) => {
  if (!newValues[0] && newValues[1] !== prevValues[1]) {
    offsetX.value = props.percent
  }
})


</script>

<style scoped lang="scss">
.slider {
  position: relative;
  width: 100%;
  height: 24px;
  user-select: none;

  .slider-track,
  .slider-fill {
    position: absolute;
    height: 2px;
    left: 0;
    top: 50%;
    margin-top: -1px;
  }

  .slider-track {
    right: 0;
    background-color: #bdbdbd;
  }

  .slider-fill {
    width: 100%;
    background-color: #d43c33;
  }

  .slider-thumb {
    position: absolute;
    top: 50%;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background-color: #d43c33;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
