<template>
  <div class="m_newcomm">
    <div class="m-talk">
      <div class="m-comments">
        <h4 class="cmt_title">最新评论({{ total }})</h4>
        <comment-list :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CommentList from '@/components/commentList/CommentList.vue'

const props = defineProps(['data', 'total'])

// 过滤评论列表所需数据
const comments = computed(() => {
  return props.data.map((item) => ({
    commentId: item.commentId,
    content: item.content,
    user: {
      avatarUrl: item.user.avatarUrl,
      nickname: item.user.nickname
    },
    timeStr: item.timeStr
  }))
})
</script>

<style scoped lang="scss">
.m_newcomm {
  position: relative;
  margin-top: 20px;
}
.m-comments {
  word-wrap: break-word;
  word-break: break-word;

  .cmt_title {
    margin: 0;
    padding: 0 10px;
    height: 23px;
    line-height: 23px;
    color: #666;
    font-size: 12px;
    font-weight: 400;
    background: rgba(0, 0, 0, 0.05);
  }
}
</style>
