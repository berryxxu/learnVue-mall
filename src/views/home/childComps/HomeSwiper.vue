/* 首页的轮播图 */
<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoaded: false
    }
  },
  methods: {
    imgLoad() {
      if (!this.isLoaded) {
        //向主页发生图像加载完成的事件，用于记录tabbar顶部固定的定位。
        this.$emit('swiperLoaded');
        this.isLoaded = true;
      }
    }
  }
}
</script>

<style scoped>
</style>