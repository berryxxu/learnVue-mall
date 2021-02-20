<template>
  <div class="detail-comment" v-if="Object.keys(commentInfo).length != 0">
    <div class="comment-top">
      <div class="comment-name">用户评价</div>
      <div class="comment-more">更多</div>
    </div>
    <div class="comment-detail">
      <div class="user-info">
        <img :src="commentInfo.user.avatar" alt="" />
        <span class="username">{{ commentInfo.user.uname }}</span>
      </div>
      <div class="comment-detail">{{ commentInfo.content }}</div>
      <div class="order-info">
        <div class="order-time">{{ commentInfo.created | dateShow }}</div>
        <div class="order-style">{{ commentInfo.style }}</div>
      </div>
      <div class="shop-reply" v-if="commentInfo.explain != null">
        {{ commentInfo.explain }}
      </div>
      <div class="order-img" v-if="commentInfo.images != null">
        <img
          :src="item"
          alt=""
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
 
<script>
import { formatDate } from "common/utils.js";

export default {
  name: "DetailCommentInfo",
  data() {
    return {
    }
  },
  props: {
    commentInfo: {}
  },
  methods: {},
  filters: {
    dateShow(value) {
      let date = new Date(value * 1000);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  created() {
  }
}
</script>
 
<style scoped>
.detail-comment {
  font-size: 14px;
  padding: 15px 20px;
}

.comment-top {
  padding: 5px 0px 10px 0px;
  font-size: 15px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  display: flex;
  justify-content: space-between;
}

.user-info {
  padding: 10px 0;
  display: flex;
  line-height: 50px;
}

.user-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info .username {
  margin-left: 20px;
}

.comment-detail {
  line-height: 23px;
  color: #666;
}

.order-info {
  margin-top: 10px;
  color: #666;
  display: flex;
}
.order-style {
  margin-left: 20px;
}

.shop-reply {
  border-top: 0.1px solid rgba(128, 128, 128, 0.4);
  padding: 10px 0;
  color: gray;
  line-height: 23px;
}

.order-img {
}

.order-img img {
  margin-right: 5px;
  height: 60px;
  /* width: auto; */
}
</style>