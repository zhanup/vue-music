<template>
<i class="icon iconfont" :class="icon"></i>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const icon = computed(() => {
  return [`icon-${props.name}`]
})
</script>