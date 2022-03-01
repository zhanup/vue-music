<template>
  <div class="album_intro">
    <div class="u-intro">
      <div class="f-brk" :class="isOpen ? '' : 'f-thide3'" v-html="intro"></div>
      <span
        class="intro_arrow"
        :class="isOpen ? 'u-arowup' : 'u-arowdown'"
        @click="openChange"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['data'])
const emit = defineEmits(['open'])
const isOpen = ref(false)

const openChange = () => {
  isOpen.value = !isOpen.value
  emit('open', isOpen.value)
}

const intro = computed(() => {
  let html = ''

  props.data.description.split('\n').forEach((item) => {
    html += `<span><i>${item}</i><br /></span>`
  })

  return html
})

</script>

<style scoped lang="scss">
.album_intro {
  padding: 10px 10px 0 15px;
}

.u-intro {
  position: relative;
  padding-bottom: 18px;
  line-height: 19px;
  color: #666;

  .intro_arrow {
    position: absolute;
    bottom: 3px;
    right: 0;
    z-index: 3;
    width: 15px;
    height: 15px;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 12px auto;
  }
}
</style>
