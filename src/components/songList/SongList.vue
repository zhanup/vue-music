<template>
  <div class="m-sglst">
    <div
      class="m-sgitem"
      v-for="(item, index) in data"
      :key="item.index"
      @click="itemClick(index, item.id)"
    >
      <div class="sgfl" v-if="showIndex">{{ index + 1 }}</div>

      <div class="sgfr">
        <div class="sgchfl">
          <!-- 歌曲名 -->
          <div class="f-thide sgtl">
            {{ item.name }}
            <span class="sgalia" v-if="item.alias.alia?.length > 0">
              ({{ alia(item.alias.alia) }})
            </span>
          </div>

          <!-- 歌曲信息 -->
          <div class="f-thide sginfo">
            {{ artist(item.artists) }} - {{ item.name }}
          </div>
        </div>
        <div class="sgchfr">
          <div class="sgchply"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => []
  },
  showIndex: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['itemClick'])

const alia = (alias) => {
  return alias.join('/')
}

const artist = (artists) => {
  return artists.map((item) => item.name).join(' / ')
}

const itemClick = (index, id) => {
  emit('itemClick', index, id)
}
</script>

<style scoped lang="scss">
.m-sglst {
  position: relative;
  line-height: 1.5;

  .m-sgitem {
    padding-left: 10px;
    display: flex;

    &:last-child {
      .sgfr::after {
        border-bottom: 0 !important;
      }
    }

    .sgfl {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      font-size: 17px;
      margin-left: -10px;
    }

    .sgfr {
      flex: 1 1 auto;
      display: flex;
      position: relative;

      &::after {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }

    .sgchfl {
      flex: 1 1 auto;
      width: 0;
      padding: 6px 0;
    }

    .sgchfr {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
    }

    .sgtl {
      font-size: 17px;
    }

    .sginfo {
      font-size: 12px;
      color: #888;
    }

    .sgalia {
      color: #888;
      margin-left: 4px;
    }

    .sgchply {
      background-image: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=);
      background-repeat: no-repeat;
      background-size: 166px 97px;
      display: inline-block;
      width: 22px;
      height: 22px;
      background-position: -24px 0;
    }
  }
}
</style>
