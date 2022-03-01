<template>
  <div class="u-plhead">
    <!-- 歌单背景和信息 -->
    <div
      class="plhead_bg"
      :style="{ backgroundImage: `url(${data.picUrl})` }"
    />
    <div class="plhead_wrap">
      <div class="plhead_fl lsthd_fl">
        <span class="amhed_flbg"></span>
        <img class="u-img" :src="data.picUrl" />
        <span class="lsthd_icon">专辑</span>
      </div>
      <div class="plhead_fr amhed_fr">
        <h2 class="f-thide2 f-brk amhed_tl">{{ data.name }}</h2>
        <div class="amhed_cnt f-thide">
          歌手：<span class="amhed_singer">{{ data.artist?.name }}</span>
        </div>
        <div class="amhed_time">发行时间：{{ formatTime(data.publishTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD')
}
</script>

<style scoped lang="scss">
.u-plhead {
  position: relative;
  padding: 30px 10px 30px 15px;
  overflow: hidden;
  line-height: 1.5;

  .plhead_bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      content: ' ';
      background-color: rgba(0, 0, 0, 0.25);
    }
  }

  .plhead_wrap {
    display: flex;
    position: relative;
    z-index: 2;
  }

  .plhead_fl {
    position: relative;
    width: 126px;
    height: 126px;
    background-color: #e2e2e3;

    .u-img {
      width: 126px;
      height: 126px;
    }

    .lsthd_icon {
      position: absolute;
      z-index: 3;
      top: 10px;
      left: 0;
      padding: 0 8px;
      height: 17px;
      color: #fff;
      font-size: 9px;
      text-align: center;
      line-height: 17px;
      background-color: rgba(217, 48, 48, 0.8);
      border-top-right-radius: 34rpx;
      border-bottom-right-radius: 34rpx;
    }

    .lsthd_num {
      position: absolute;
      right: 3px;
      top: 0;
      z-index: 3;
      padding-left: 15px;
      color: #fff;
      font-size: 12px;
      font-style: normal;
      background-position: 0;
      background-repeat: no-repeat;
      background-size: 11px 10px;
      text-shadow: 1px 0 0 rgb(0 0 0 / 15%);
    }
  }

  .plhead_fr {
    flex: 1 1 auto;
    width: 1%;
    margin-left: 16px;
    padding-top: 3px;

    .u-img {
      border-radius: 50%;
    }
  }

  .amhed_flbg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    height: 100%;
    padding-left: 115%;
    background: url(//s3.music.126.net/mobile-new/img/album@2x.png?4d5d63fbc459c8e2f7dddead07514fba=)
      100% no-repeat;
    background-size: contain;
  }

  .amhed_fr {
    margin-left: 26px;
    color: hsla(0, 0%, 100%, 0.5);
  }

  .amhed_tl {
    padding-top: 10px;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.3;
    color: #fefefe;
  }

  .amhed_cnt {
    margin-top: 22px;
    font-size: 14px;
  }

  .amhed_singer {
    color: #fff;
  }

  .amhed_time {
    margin-top: 5px;
    font-size: 12px;
  }
}
</style>
