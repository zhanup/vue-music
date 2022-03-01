<template>
  <div class="m-recom">
    <div class="title f-bd f-bd-btm f-thide">搜索"{{ searchText }}"</div>
    <div>
      <div
        class="recomitem"
        v-for="(item, index) in list"
        :key="index"
        @click="suggestSearch(item.keyword)"
      >
        <i class="u-svg u-svg-search"></i>
        <div class="text f-bd f-bd-btm f-thide">{{ item.keyword }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['list', 'searchText'])
const emit = defineEmits(['search'])

const suggestSearch = (keyword) => {
  emit('search', keyword)
}
</script>

<style scoped lang="scss">
.m-recom {
  height: 50px;
  margin-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  line-height: 50px;
  color: #507daf;

  .recomitem {
    display: flex;
    align-items: center;
    height: 45px;
    padding-left: 10px;
  }

  .u-svg-search {
    flex: 0 0 auto;
    margin-right: 7px;
  }

  .text {
    display: inline-block;
    flex: 1;
    width: 1%;
    padding-right: 10px;
    font-size: 15px;
    line-height: 45px;
    color: #333;
  }
}
</style>
