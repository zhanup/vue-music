<template>
  <div class="remd_ul">
    <router-link
      class="remd_li"
      v-for="item in data"
      :key="item.id"
      :to="'/playlist/' + item.id"
    >
      <div class="remd_img">
        <img class="u-img" v-lazy="item.coverImgUrl" />
        <div class="u-earp remd_lnum">{{ formatPlayCount(item.playCount) }}</div>
      </div>
      <span class="remd_text f-thide2">{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { formatPlayCount } from '@/utils'
defineProps(['data'])
</script>

<style scoped lang="scss">
.remd_ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px 3px 0 3px;
}

.remd_li {
  width: 49%;
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
</style>
