<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">商城首页</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from "./childComps/FeatureView"

import {getHomeMultiData} from "network/home"

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      //记录数据
        banners : [],
        recommends: []
      }
  },
  created(){
    // 获取首页的多个数据
    getHomeMultiData().then(res => {
      //存储获得的数据
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
.home{
  /* 固定顶部导航栏的方法1 */
  padding-top:44px;
}

.home-nav{
  /* 固定顶部导航栏的方法1 */
  position:fixed;
  top : 0;
  left:0;
  right:0;
  z-index:9;
  background-color: var(--color-tint);
  color:white;
}
</style>