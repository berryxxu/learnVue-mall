/* 首页的轮播图 */
<template>
  <div>    
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name:"HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type: Array,
      required: true,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>