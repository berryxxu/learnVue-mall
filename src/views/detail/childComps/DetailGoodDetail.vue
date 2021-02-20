<template>
  <div class="good-detail" v-if="Object.keys(goodDetail).length != 0">
    <div class="detail-desc">
      <div class="start"></div>
      <div class="desc">{{ goodDetail.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="detail-key">{{ goodDetail.detailImage[0].key }}</div>
    <div class="detail-list">
      <img
        v-for="(item, index) in goodDetail.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>
 
<script>
export default {
  name: "DetailGoodDetail",
  data() {
    return {
      // loadCounter: 0,
      // imageListLength: 0
    }
  },
  props: {
    goodDetail: {
      type: Object,
      default: {}
    }
  },
  methods: {
    imgLoad() {
      //方式1：判断：在所有图片都加载结束后，仅执行一次回调即可。
      //问题：图片很多的时候，不到全部加载完成，滚动都无法生效，使得页面有卡顿。
      // if (++this.loadCounter == this.imageListLength) {
      //   this.$emit('imagesLoad');
      // }

      // 方式2: 直接传递事件，在Detail里对refresh做防抖。这样可以保证图片加载的同时也能滚动。
      this.$emit('imagesLoad')
    }
  },
  //监听数据的改变
  watch: {
    //用于imageLoad方式1的长度判定
    // goodDetail() {
    //   //在goodDetail改变的时候，设定图片列表长度
    //   this.imageListLength = this.goodDetail.detailImage[0].list.length;
    // }
  },
}
</script>
 
<style scoped>
.goods-detail {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.detail-desc {
  padding: 0 15px;
}

.detail-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

/* 用于展示介绍信息左上角和右下角的线条 */
.detail-desc .start,
.detail-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.detail-desc .start {
  float: left;
}

.detail-desc .end {
  float: right;
}

/* 展示左上角和右下角横线两端的黑色方块 */
.detail-desc .start::before,
.detail-desc .end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: black;
  bottom: 0;
}

.detail-desc .end::after {
  right: 0;
}

.detail-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.detail-list img {
  width: 100%;
}
</style>