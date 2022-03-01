<template>
  <div class="artist-hd">
    <img class="cover" :src="artist?.cover" />
    <div class="artist-info">
      <p class="name">{{ artist?.name }}</p>
      <p class="rank" v-if="artist.rank">{{ rank }}</p>
      <div class="simple">
        <p class="follow">
          <span class="fansCnt">
            粉丝<span class="count">{{ fans }}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatPlayCount as formatCount } from '@/utils'

const props = defineProps(['artist', 'fansCnt'])
const ranks = ['华语', '欧美', '韩语', '日语']

const rank = computed(() => {
  const rank = props.artist.rank
  return rank ? `歌手榜${ranks[rank.type - 1]}地区 No.${rank.rank}` : ''
})

const fans = computed(() => {
  return formatCount(props.fansCnt)
})

</script>

<style scoped lang="scss">
.artist-hd {
  position: relative;
  padding-top: 82.9%;

  &::after {
    content: '';
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .cover {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .artist-info {
    position: absolute;
    left: 16px;
    bottom: 30px;
    color: #fff;
    z-index: 2;

    .name {
      font-size: 20px;
      line-height: 20px;
    }

    .rank {
      margin-top: 15px;
      font-size: 13px;
    }

    .simple {
      margin-top: 15px;
      opacity: 0.8;
      font-size: 12px;
      line-height: 12px;
    }

    .follow {
      height: 12px;
      margin-top: 10px;
    }

    .fansCnt {
      font-size: 13px;
    }

    .count {
      margin-left: 4px;
    }
  }
}
</style>
