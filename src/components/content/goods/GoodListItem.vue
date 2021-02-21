<template>
  <div class="goods-item" @click="itemClicked">
    <img :src="showImg" alt="" @load="imgLoad" />
    <div class="goods-info">
      <div class="title">{{ goodsItem.title }}</div>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('goodImgLoad')
    },
    itemClicked() {
      this.$router.push({
        path: '/detail',
        query: {
          iid: this.goodsItem.iid
        }
      })
    }
  },
  computed: {
    //首页中图像在show.img里，详情页推荐列表在image里
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
.goods-item {
  width: 48%;
}

.goods-item img {
  width: 100%;
  /* 四角设为圆角 */
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  padding: 5px;
  margin-bottom: 5px;
}

/* 设置商品标题 */
.goods-info .title {
  /* 设置文字超出部分为...(单行) */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 商品价格颜色 */
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
  padding-right: 10px;
}

/* 收藏数字设置相对定位，为了给伪元素定位 */
.goods-info .collect {
  position: relative;
}

/* 收藏数字前的图标设置：伪元素 */
.goods-info .collect::before {
  content: '';
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  /* background: url('~assets/img/common/collect.svg'); */
  /* background-size: cover; */
  /* 直接设置到content中无法控制图片大小 */
  /* content: url(~assets/img/common/collect.svg); */
  /* display:inline-block; */
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
}
</style>