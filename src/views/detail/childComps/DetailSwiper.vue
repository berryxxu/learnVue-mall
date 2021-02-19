<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="imagelink in list" :key="imagelink">
      <img :src="imagelink" alt="" />
    </swiper-item>
  </swiper>
</template>
 
<script>
import { Swiper, SwiperItem } from "components/common/swiper"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
    }
  },
  props: {
    list: {
      type: Array,
      default() { return [] }
    }
  },

  methods: {},

  created() {
  }
}
</script>
 
<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>