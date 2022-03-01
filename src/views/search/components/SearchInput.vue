<template>
  <form class="m-input f-bd f-bd-btm">
    <div class="inputcover">
      <i class="u-svg u-svg-srch"></i>
      <input
        v-model="value"
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        @input="emit('input', $event)"
        @focus="emit('focus')"
        @blur="emit('blur')"
      />
    </div>
    <div class="close" v-show="modelValue" @click="handleClear">
      <i class="u-svg u-svg-empty"></i>
    </div>
  </form>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits([
  'update:modelValue',
  'input',
  'focus',
  'blur',
  'clear'
])
const { modelValue } = toRefs(props)

const value = computed({
  get() {
    return modelValue.value
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const handleClear = () => {
  emit('clear')
}
</script>

<style scoped lang="scss">
.m-input {
  padding: 15px 10px;
  position: relative;

  input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0);
    font-size: 14px;
    color: #333;

    &::-webkit-input-placeholder {
      color: #c9c9c9;
    }
  }

  .inputcover {
    position: relative;
    display: block;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
  }

  .u-svg-srch {
    position: absolute;
    left: 0;
    top: 9px;
    margin: 0 8px;
  }

  .close {
    position: absolute;
    z-index: 6;
    right: 12px;
    top: 15px;
    width: 30px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    display: inline-block;
  }
}
</style>
