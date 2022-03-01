<template>
  <div class="navbar">
    <div class="left" @click="leftClick">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['leftClick'])

const leftClick = () => {
  emit('leftClick')
}
</script>

<style scoped lang="scss">
.navbar {
  height: 52px;
  line-height: 52px;
  text-align: center;
  color: #fff;
  background-color: #d43c33;
  font-size: 16px;
  display: flex;

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
}
</style>
