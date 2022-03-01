<template>
  <div class="tab-control">
    <router-link
      class="nav-item"
      v-for="item in tabs"
      :key="item.id"
      :to="item.path"
    >
      <div class="tabtxt">
        <span>{{ item.title }}</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ref([
  { id: 1, title: '推荐', path: '/home' },
  { id: 2, title: '排行榜', path: '/toplist' },
  { id: 3, title: '搜索', path: '/search' }
])
</script>

<style scoped lang="scss">
.tab-control {
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  display: flex;
  align-items: center;

  &::after {
    position: absolute;
    z-index: 2;
    content: "";
    top: 0;
    left: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .nav-item {
    flex: 1;
    text-align: center;
    display: block;
    height: 100%;
    text-align: center;
    cursor: pointer;
  }

  .tabtxt {
    position: relative;
    display: inline-block;
    max-width: 100%;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    color: #333;
    font-size: 15px;
    line-height: 40px;
  }
}

.router-link-exact-active {
  .tabtxt {
    color: #dd001b;
  }

  .tabtxt:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    z-index: 3;
    width: 100%;
    height: 4px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background: #dd001b;
  }
}
</style>
