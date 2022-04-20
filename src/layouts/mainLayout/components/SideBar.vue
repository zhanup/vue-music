<template>
  <div class="sidebar" :class="isOpen ? 'open' : ''">
    <div class="sidebar-hd">
      <div class="avatar"></div>
      <div class="userInfo">
        <p>叮咚音乐</p>
        <p>懂你的音乐播放器</p>
      </div>
    </div>
  </div>
  <div v-show="isOpen" class="overlay" @click="update"></div>
</template>

<script setup>
defineProps(['isOpen'])
const emit = defineEmits(['update:isOpen'])

const update = () => {
  emit('update:isOpen', false)
}
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  width: 80%;
  background-color: #fff;
  transform: translate3d(-100%, 0, 0);
  transition: transform 0.2s ease-out;

  &.open {
    transform: translate3d(0, 0, 0);
  }
}

.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  opacity: 0.4;
  background-color: rgb(0, 0, 0);
}

.sidebar-hd {
  height: 30vh;
  padding-top: 15vh;
  background:url('@/assets/images/bg.jpg') no-repeat 50%;
  background-size: cover;
  display: flex;

  .avatar {
    width: 80px;
    height: 80px;
    background: url('@/assets/images/profile.jpg') no-repeat 50%;
    background-size: cover;
    border-radius: 40px;
    margin: 0 24px;
  }

  .userInfo {
    color: #eee;

    p {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
