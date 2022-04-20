<template>
  <div class="musicList" :class="isOpen ? 'open' : ''">
    <div class="ml-mask" @click="handleOpen"></div>
    <div class="ml-wrap">
      <div class="ml-header">
        <span>当前歌曲数：{{ musicLength }}</span>
        <div class="ml-del" @click="clear"></div>
      </div>
      <Scroll class="ml-list" ref="bscroll">
        <div
          class="ml-item"
          :class="item.id === currentMusic.id ? 'active' : ''"
          v-for="(item, index) in playList"
          :key="item.id"
        >
          <h3 class="ml-item_title f-thide" @click="addPlay(index)">
            {{ item.name }} - <span class="singer">{{ item.singer }}</span>
          </h3>
          <div class="ml-item_del" @click="deleteItem(index)"></div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import Scroll from '@/components/scroll/Scroll.vue'

defineProps(['isOpen'])
const emit = defineEmits(['open'])
const store = useStore()
const { musicLength, playList, currentMusic } = storeToRefs(store)
const bscroll = ref()

const handleOpen = () => {
  emit('open', false)
}

// 播放新歌曲
const addPlay = (index) => {
  store.addPlay(playList.value[index])
}

// 从列表删除歌曲
const deleteItem = (index) => {
  store.deleteItem(index)
}

// 清除播放列表
const clear = () => {
  store.clearAllPlay()
}

watch(musicLength, () => {
  nextTick(() => {
    bscroll.value?.refresh()
  })
})
</script>

<style scoped lang="scss">
.musicList {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  transform: translate3d(0, 100%, 0);
  transition: all 0.2s ease-out;

  &.open {
    transform: translateZ(0);

    .ml-mask {
      opacity: 1;
    }
  }

  .ml-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.1s ease-out 0.1s;
  }

  .ml-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 60vh;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    background-color: #f3f4f6;
    display: flex;
    flex-direction: column;
  }

  .ml-header {
    line-height: 52px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ml-del {
      width: 24px;
      height: 24px;
      background-position: 50%;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('@/assets/images/list-all-del.png');
    }
  }

  .ml-list {
    flex: 1;
    overflow: hidden;
  }

  .ml-item {
    display: flex;
    align-items: center;
    line-height: 48px;
    margin-left: 10px;

    &.active {
      color: #d43c33;

      .singer {
        color: #d43c33;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }

    .ml-item_title {
      flex: 1;
      font-weight: 400;
      font-size: 14px;
    }

    .singer {
      font-size: 12px;
      color: #888;
    }

    .ml-item_del {
      width: 36px;
      height: 36px;
      background-position: 50%;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('@/assets/images/list-del.png');
    }
  }
}
</style>
