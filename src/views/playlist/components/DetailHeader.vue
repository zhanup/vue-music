<template>
  <div class="u-plhead">
    <!-- 歌单背景和信息 -->
    <div
      class="plhead_bg"
      :style="{ backgroundImage: `url(${data.coverImgUrl})` }"
    />
    <div class="plhead_wrap">
      <div class="plhead_fl lsthd_fl">
        <img class="u-img" :src="data.coverImgUrl" />
        <div class="lsthd_icon">歌单</div>
        <i class="u-earp lsthd_num">{{ formatPlayCount(data.playCount) }}</i>
      </div>
      <div class="plhead_fr">
        <div class="f-thide2 f-brk lsthd_title">{{ data.name }}</div>
        <div class="lsthd_auth f-thide">
          <div class="u-avatar lsthd_ava">
            <img class="u-img" :src="data.avatarUrl" />
            <div class="ava-icon ava-icon-daren"></div>
          </div>
          {{ data.nickname }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPlayCount } from '@/utils'

defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped lang="scss">
.lsthd_fl::after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 18px;
  z-index: 2;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2)
  );
}

.u-plhead {
  position: relative;
  padding: 30px 10px 30px 15px;
  overflow: hidden;

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

    .lsthd_title {
      padding-top: 1px;
      font-size: 17px;
      line-height: 1.3;
      color: #fefefe;
      height: 44px;
      display: -webkit-box;
    }

    .lsthd_auth {
      display: block;
      position: relative;
      color: hsla(0, 0%, 100%, 0.7);
    }

    .lsthd_ava {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 15px;
    }

    .u-img {
      border-radius: 50%;
    }

    .ava-icon {
      display: inline-block;
      position: absolute;
      right: -10rpx;
      bottom: 0;
      width: 12px;
      height: 12px;
      background-image: url(https://s3.music.126.net/mobile-new/img/usericn_2x.png?6423c0681bfb3358d5c684c9b998e412=);
      background-position: -40px 0;
      background-repeat: no-repeat;
      background-size: 75px auto;
    }
  }
}
</style>
