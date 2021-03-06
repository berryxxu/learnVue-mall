<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">商城首页</div>
    </nav-bar>
    <!-- 吸顶（用两个tabbar实现） -->
    <tab-control
      :titles="['流行', '新款', '样式']"
      @tabClicked="tabClicked"
      class="tab-control-out"
      ref="tabControlOut"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroller"
      :probe-type="3"
      :pull-up-load="true"
      @scrolled="onContentScroll"
      @pullingUpEnd="onPullUpEnd"
    >
      <home-swiper
        :banners="banners"
        @swiperLoaded="swiperLoaded"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '样式']"
        @tabClicked="tabClicked"
        ref="tabControlIn"
      ></tab-control>
      <good-list :goods="showGoodsList"></good-list>
    </scroll>
    <back-top @click.native="clickBackTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from "./childComps/FeatureView"

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'

import { getHomeMultiData, getHomeGoods } from "network/home"

import { imgLoadListenerMixin, backTopMixin } from "common/mixin.js"

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    Scroll,
    GoodList,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  mixins: [imgLoadListenerMixin, backTopMixin],
  data() {
    return {
      //记录数据
      banners: [], //轮播图数据
      recommends: [],//推荐项数据
      //商品列表, 默认请求第一页数据
      goods: {
        'pop': { page: 0, list: [] }, //流行
        'new': { page: 0, list: [] }, //新款
        'sell': { page: 0, list: [] } //精选
      },
      //当前选中的商品类型
      currentType: 'pop',
      //tabbar固定
      isTabFixed: false,
      tabbarOffset: 0,
      scrollY: 0,
    }
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.获取首页的多个数据(轮播图，推荐项)
    this.getHomeMultiData()

    //2.获取首页商品数据（流行，新款，精选）
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    //创建事件监听(mixin)
  },
  destroyed() {
    //在页面销毁时，移除事件监听(mixin)
  },
  activated() {
    //keep-alive时页面跳转，若better-scroll位置有误，可在此重新设定scroll的位置
    // this.$refs.scroller.scrollTo(0, this.saveY, 1)

    //（有keep-alive，第一次挂载时mounted,activated都会触发，因而这里先移除mounted的监听）
    this.$bus.$off('goodImgLoad', this.goodImgLoadListener)

    //在keep-alive状态下，页面返回时，重新设置事件监听(无keep-alive时，才设置在mounted中)
    this.$bus.$on('goodImgLoad', this.goodImgLoadListener)

    //刷新Scroll的（mixin--防抖）
    this.refreshScroll();
  },
  deactivated() {
    //在keep-alive状态下，页面跳转时，移除事件监听--?移除未成功
    this.$bus.$off('goodImgLoad', this.goodImgLoadListener)

    //keep-alive时页面跳转，若better-scroll位置有误，可在此记录scroll的位置
    // this.saveY = this.$refs.scroller.getScrollY();
  },
  methods: {
    /**
     * 事件监听相关
     **/
    //tabbar 切换商品类型
    tabClicked(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      //统一两个tabbar的选项
      this.$refs.tabControlIn.currentIndex = index;
      this.$refs.tabControlOut.currentIndex = index;
    },

    //监听滚动--控制回到顶部部件的显示
    onContentScroll(position) {
      //判断backtop是否显示(mixin)
      this.updateIsShowBackTop(position);

      //tabbar是否吸顶（用两个tabbar实现,当滚动距离大于tabbar的offsetTop时，展示外部的tabbar）
      this.isTabFixed = (-position.y) > this.tabbarOffset;
    },

    //上拉加载更多
    onPullUpEnd() {
      this.getHomeGoods(this.currentType);
    },

    swiperLoaded() {
      //用$el获取组件对应的DOM元素，记录内部tabbar的offsetTop
      this.tabbarOffset = this.$refs.tabControlIn.$el.offsetTop;
    },


    /** 数据获取相关 */
    //获取轮播图，推荐项
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        //存储获得的数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    ///获取商品数据
    getHomeGoods(type) {
      //请求对应type的当前页码的，下一页的数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //数组数据的拼接(解构赋值)
        this.goods[type].list.push(...res.data.list);
        //页码加1
        this.goods[type].page = page;
        //开启下次可上拉
        this.$refs.scroller.finishPullUp();
      });
    },


  }
}
</script>

<style scoped>
#home {
  /* 固定顶部导航栏的方法1 */
  /* padding-top: 44px; */

  /* 1vh是当前屏幕可见高度的1%，1vm为屏幕可见宽度的1% */
  height: 100vh;
  position: relative;
}

.home-nav {
  /* 固定顶部导航栏的方法1 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;

  background-color: var(--color-tint);
  color: white;
}

/* 用Scroll组件外部的tabBar来实现吸顶效果 */
.tab-control-out {
  position: relative;
  top: 44px;
  z-index: 10;
}

/* bscroll滚动区域设置2--固定位置，设置top和bottom */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* bscroll滚动区域设置1--计算高度calc */
/* .content { */
/* 44+49=93 */
/* height: calc(100% - 93px); */
/* overflow: hidden; */
/* margin-top: 44px; */
/* } */
</style>