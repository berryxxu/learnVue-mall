<template>
  <div class="good-detail" v-if="Object.keys(goodDetail).length != 0">
    <div>
      <div class="start"></div>
      <div clas="desc">{{ goodDetail.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ goodDetail.detailImage[0].key }}</div>
    <div class="image-list">
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
      loadCounter: 0,
      imageListLength: 0
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
      //判断：在所有图片都加载结束后，仅执行一次回调即可。
      if (++this.loadCounter == this.imageListLength) {
        this.$emit('imagesLoad');
      }
    }
  },
  //监听数据的改变
  watch: {
    goodDetail() {
      //在goodDetail改变的时候，设定图片列表长度
      this.imageListLength = this.goodDetail.detailImage[0].list.length;
    }
  },
}
</script>
 
<style scoped>
</style>