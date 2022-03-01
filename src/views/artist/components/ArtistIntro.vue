<template>
  <div class="artist-intro">
    <p :class="isFull ? '' : 'f-thide3'" style="color: #666">
      {{ data?.briefDesc }}
    </p>
    <p class="fake-node">
      {{ data?.briefDesc }}
    </p>
    <div class="full" @click="fullChange">
      {{ isFull ? '收起' : '完整歌手介绍' }}
      <i class="arrow" :class="isFull ? 'arrow-up' : ''"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['data'])
const emit = defineEmits(['full'])
const isFull = ref(false)

const fullChange = () => {
  isFull.value = !isFull.value
  emit('full', isFull.value)
}
</script>

<style scoped lang="scss">
.artist-intro {
  background: #fff;
  padding: 0 16px 18px;

  .fake-node {
    position: fixed;
    top: -500px;
    left: -500px;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .full {
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-top: 25px;
  }

  .arrow {
    display: inline-block;
    position: relative;
    width: 9px;
    height: 9px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQlJREFUSA3tlLENwjAQRYOgQAIJUUCFqNiCDrEAA9BQsRcdK9CkYQFooGGALAH/B4FOxknOsTvupJc4Tu5ecmBnmYV1wDqQqANdUWeN8R4MwV3Mpxh2UGQDduAJHlJM6QgswBhcQIqgdAtWoA9m4CTF/FJKGXOQQv6RLsuq70OO002K2V7KKGXEyn3SM+oeWVyKec32ppBXSQ+oz9/4R8y5WHmjtEocI1dJ68Rt5GppkzhEHiTViDXyYKlWXCe/4iY3B7lOuWS+/14m+4Jvqw3flxVInooCKimfd9exqOEdukttIJ5SS5kTKmaOK+dckJQJbcTMo7wHJiAH3AbLHQlnC+uAdeBPOvACKa4/+5yXgRgAAAAASUVORK5CYII=);
    background-size: contain;
    background-repeat: no-repeat;
    left: 4px;
    top: 0;

    &.arrow-up {
      transform: rotate(180deg);
      width: 12px;
      height: 12px;
      top: 2px;
    }
  }
}
</style>
