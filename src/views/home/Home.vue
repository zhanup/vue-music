<template>
  <Loading :is-show="loading" />
  <Scroll class="recommend" ref="scroll" :bounce="false">
    <div class="remd_tl">
      <h2>推荐歌单</h2>
      <router-link to="/playlist" class="more">
        更多<v-icon class="icon" name="right" />
      </router-link>
    </div>

    <div class="remd_songs">
      <div class="remd_ul">
        <router-link
          class="remd_li"
          v-for="item in personalized"
          :key="item.id"
          :to="'/playlist/' + item.id"
        >
          <div class="remd_img">
            <img class="u-img" :src="item.picUrl" />
            <div class="u-earp remd_lnum">
              {{ formatPlayCount(item.playCount) }}
            </div>
          </div>
          <span class="remd_text f-thide2">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </Scroll>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import Loading from '@/components/loading/Loading.vue'
import Scroll from '@/components/scroll/Scroll.vue'
import { getPersonalized } from '@/api'
import { formatPlayCount } from '@/utils'

const personalized = ref([])
const scroll = ref(null)

const loading = computed(() => {
  return personalized.value.length > 0 ? false : true
})

const refresh = () => {
  nextTick(() => {
    scroll.value.refresh()
  })
}

const _getPersonalized = async () => {
  const res = await getPersonalized()
  personalized.value = res.result

  refresh()
}

onMounted(() => {
  _getPersonalized()
})
</script>

<style scoped lang="scss">
.recommend {
  height: 100%;
  overflow: hidden;
}

.remd_tl {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  line-height: 44px;

  h2 {
    font-size: 15px;
    font-weight: 700;
  }

  a {
    font-size: 13px;
    color: #999;

    .icon {
      font-size: 13px;
    }
  }
}

.remd_songs {
  padding-left: 4px;
  padding-right: 4px;

  .remd_ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .remd_li {
    width: 33%;
    margin-bottom: 16px;
  }

  .remd_img {
    position: relative;
    padding-bottom: 100%;

    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 20px;
      z-index: 2;
      background-image: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
    }

    img {
      border-radius: 4px;
    }
  }

  .u-img {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .remd_lnum {
    position: absolute;
    right: 5px;
    top: 2px;
    z-index: 3;
    color: #fff;
    font-size: 12px;
    padding-left: 13px;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 11px 10px;
  }

  .remd_text {
    padding: 6px 2px 0 6px;
    font-size: 13px;
    min-height: 15px;
    line-height: 1.2;
  }
}
</style>
