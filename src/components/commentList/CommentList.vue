<template>
  <div class="cmt_list">
    <div class="cmt_item" v-for="item in comments" :key="item.commentId">
      <div class="cmt_head">
        <img :src="item.user.avatarUrl" alt />
      </div>
      <div class="cmt_wrap f-bd f-bd-btm">
        <div class="cmt_header">
          <div class="cmt_meta">
            <span class="cmt_user">
              <span class="nickname">{{ item.user.nickname }}</span>
            </span>
            <div class="cmt_time">
              <span>{{ item.timeStr }}</span>
            </div>
          </div>
          <div class="cmt_like">
            <span class="cmt_likearea">
              <i class="cmt_likeicn">
                <svg
                  class="u-svg u-svg-unzancmt"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                >
                  <path
                    fill="#999"
                    d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"
                  />
                </svg>
              </i>
            </span>
          </div>
        </div>
        <div class="cmt_content">
          <span class="cmt_text">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comments: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.cmt_list {
  .cmt_item {
    padding-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;

    .cmt_head {
      margin: 0 10px;
      flex: none;
      height: 35px;

      img {
        display: block;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }

    .cmt_wrap {
      padding-right: 10px;
      padding-bottom: 11px;
      padding-left: 0;
      flex: auto;
      width: 0;

      .cmt_header {
        display: flex;
        flex-direction: row;
      }

      .cmt_meta {
        flex: auto;
        width: 0;
        font-size: 0;
      }

      .cmt_user {
        max-width: 100%;
        display: inline-flex;
        align-items: center;

        .nickname {
          font-size: 14px;
          color: #666;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: auto;
        }
      }

      .cmt_time {
        font-size: 9px;
        color: #999;
      }

      .cmt_like {
        width: 65px;
        height: 22px;
        line-height: 22px;
        font-size: 11px;
        color: #999;
        flex: none;
        text-align: right;

        .cmt_likearea {
          display: inline-block;
          min-width: 30px;
          padding-left: 5px;
        }

        .cmt_likeicn {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-left: 6px;
          line-height: 0;
          vertical-align: middle;
          cursor: pointer;
        }
      }

      .cmt_content {
        position: relative;
        color: #333;
        font-size: 15px;
        line-height: 22px;
        margin-top: 5px;
      }
    }
  }
}
</style>
