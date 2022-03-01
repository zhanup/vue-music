<template>
  <div class="layout">
    <LayoutNavBar @left-click="isOpen = true" />
    <TabControl />
    <div class="main">
      <router-view />
    </div>
  </div>
  <SideBar v-model:isOpen="isOpen" />
</template>

<script setup>
import { ref } from 'vue'
import LayoutNavBar from './components/LayoutNavBar.vue'
import SideBar from './components/SideBar.vue'
import TabControl from './components/TabControl.vue'

const isOpen = ref(false)
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .main {
    flex: 1;
    overflow: hidden;
  }
}
</style>
