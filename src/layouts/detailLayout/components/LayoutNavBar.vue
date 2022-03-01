<template>
  <NavBar class="navbar">
    <div class="f-thide">{{ title }}</div>
    <template #left>
      <div class="back" @click="backClick">
        <v-icon class="icon" name="arrowleft" />
      </div>
    </template>
  </NavBar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NavBar from '@/components/navbar/NavBar.vue'

defineProps(['title'])
const router = useRouter()

const backClick = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.navbar {
  &:deep(.center) {
    text-align: left;
  }

  .icon {
    display: block;
    font-size: 24px;
  }
}
</style>
