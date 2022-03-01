<template>
  <NavBar>
    <span>叮咚音乐</span>
    <template #left>
      <div>
        <v-icon class="icon" name="menu" />
      </div>
    </template>
  </NavBar>
</template>

<script setup>
import NavBar from '@/components/navbar/NavBar.vue'
</script>

<style scoped lang="scss">
.icon {
  display: block;
  font-size: 24px;
}
</style>
