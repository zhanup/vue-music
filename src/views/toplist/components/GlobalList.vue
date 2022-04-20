<template>
  <div class="column-list">
    <router-link
      class="column-item"
      v-for="item in list"
      :key="item.id"
      :to="'/playlist/' + item.id"
    >
      <div class="item-hd">
        <img v-lazy="item.coverImgUrl" alt="" @load="imgLoad" />
        <p>{{ item.updateFrequency }}</p>
      </div>
      <div class="column-bd f-thide">{{ item.name }}</div>
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
    .filter((v) => v.ToplistType === undefined)
    .map((v) => ({
      id: v.id,
      name: v.name,
      coverImgUrl: v.coverImgUrl,
      description: v.description,
      updateFrequency: v.updateFrequency
    }))
})
</script>

<style scoped lang="scss">
.column-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 5px;
}

.column-item {
  width: 120px;
  margin-bottom: 16px;

  .item-hd {
    position: relative;

    img {
      width: 100%;
      border-radius: 4px;
    }

    p {
      position: absolute;
      bottom: 5px;
      left: 5px;
      color: #fff;
      font-size: 12px;
    }
  }

  .column-bd {
    padding: 0 5px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
