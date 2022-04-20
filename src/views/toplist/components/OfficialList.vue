<template>
  <div class="row-list">
    <router-link
      class="row-item"
      v-for="item in list"
      :key="item.id"
      :to="'/playlist/' + item.id"
    >
      <div class="item-hd">
        <img v-lazy="item.coverImgUrl" alt @load="imgLoad" />
        <p>{{ item.updateFrequency }}</p>
      </div>
      <div class="row-item-bd">
        <p v-for="(t, i) in item.tracks" :key="'tracks' + i">
          {{ i + 1 }}. {{ t.first }} <span>- {{ t.second }}</span>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['img-load'])

let timer = -1
const imgLoad = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    emit('img-load')
  }, 0)
}
const list = computed(() => {
  return props.data
    .filter((v) => v.ToplistType !== undefined)
    .map((v) => ({
      id: v.id,
      name: v.name,
      coverImgUrl: v.coverImgUrl,
      description: v.description,
      updateFrequency: v.updateFrequency,
      tracks: v.tracks,
      ToplistType: v.ToplistType
    }))
})
</script>

<style scoped lang="scss">
.row-item {
  position: relative;
  display: flex;
  margin: 0 10px 10px 10px;
  background-color: #f9f9f9;

  .item-hd {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
    }

    p {
      position: absolute;
      bottom: 3px;
      left: 5px;
      color: #fff;
      font-size: 12px;
    }
  }

  .row-item-bd {
    width: calc(100% - 100px);
    padding: 10px 10px 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
      line-height: 24px;
      font-size: 13px;
      word-break: keep-all;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      color: #888;
    }
  }
}
</style>
