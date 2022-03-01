<template>
  <div class="m-default">
    <!-- 热门搜索 -->
    <div class="m-hotlist">
      <div class="title">热门搜索</div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in hots"
          :key="index"
          @click="handleSearch(item.first)"
        >
          {{ item.first }}
        </div>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="m-history">
      <div class="list">
        <div class="item" v-for="(item, index) in history" :key="index">
          <i class="u-svg u-svg-histy"></i>
          <div class="histyr f-bd f-bd-btm" @click="itemClick(item)">
            <span class="link f-thide">{{ item }}</span>
            <div class="close" @click.stop="removeHistory(index)">
              <i class="u-svg u-svg-close"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['hots', 'history', 'update:history'])
const emit = defineEmits(['search', 'itemClick'])

const handleSearch = (keyword) => {
  emit('search', keyword)
}

const itemClick = (keyword) => {
  emit('itemClick', keyword)
}

const removeHistory = (index) => {
  props.history.splice(index, 1)
}
</script>

<style scoped lang="scss">
.m-hotlist {
  padding: 15px 10px 0;

  .title {
    font-size: 12px;
    line-height: 12px;
    color: #666;
    font-weight: 400;
  }

  .list {
    margin: 10px 0 7px;
  }

  .item {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 14px;
    font-size: 14px;
    color: #333;
    position: relative;

    &:after {
      position: absolute;
      z-index: 2;
      content: '';
      top: 0;
      left: 0;
      pointer-events: none;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      transform-origin: top left;
      border: 1px solid #d3d4da;
      border-radius: 32px;
    }
  }
}

.m-history {
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
  }

  .u-svg-histy {
    margin: 0 10px;
  }

  .histyr {
    flex: 1;
    width: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
  }

  .link {
    margin-right: 10px;
    flex: 1;
    width: 1%;
  }

  .close {
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    line-height: 31px;
  }

  .u-svg-close {
    margin-left: 2px;
  }
}
</style>
