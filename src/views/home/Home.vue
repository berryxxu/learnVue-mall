<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">商城首页</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '样式']"></tab-control>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from "./childComps/FeatureView"


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultiData, getHomeGoods} from "network/home"

export default {
  components: {
    NavBar,
    TabControl,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      //记录数据
        banners : [], //轮播图数据
        recommends: [],//推荐项数据
        //商品列表, 默认请求第一页数据
        goods:{
          'pop' :{page:0, list:[]}, //流行
          'new' :{page:0, list:[]}, //新款
          'sell' :{page:0, list:[]} //精选
        }
      }
  },
  created(){
    // 1.获取首页的多个数据(轮播图，推荐项)
    this.getHomeMultiData()

    //2.获取首页商品数据（流行，新款，精选）
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods:{
    //获取轮播图，推荐项
    getHomeMultiData(){
      getHomeMultiData().then(res => {
        //存储获得的数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    ///获取商品数据
    getHomeGoods(type){
      //请求对应type的当前页码的，下一页的数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res =>{
        //数组数据的拼接(解构赋值)
        this.goods[type].list.push(...res.data.list);
        //页码加1
        this.goods[type].page = page;
      });
    }
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