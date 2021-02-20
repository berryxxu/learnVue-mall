<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @itemClick="navItemClick"
      ref="detailnav"
    ></detail-nav-bar>
    <scroll
      class="detail-scroll"
      ref="scroller"
      @scrolled="contentScroll"
      :probeType="3"
    >
      <detail-swiper :list="swiperImgList" ref="detailswiper"></detail-swiper>
      <detail-base-info :baseInfo="baseInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-good-detail
        :goodDetail="goodDetail"
        @imagesLoad="detailImagesLoad"
      ></detail-good-detail>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="detailparam"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="detailcomment"
      ></detail-comment-info>
      <good-list :goods="recommendList" ref="detailrecommend"></good-list>
    </scroll>
    <back-top @click.native="clickBackTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCartClick="addCartClick"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodDetail from "./childComps/DetailGoodDetail"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'

import { getDetailData, getRecommendData, GoodBaseInfo, GoodShopInfo, GoodsParam } from "network/detail.js"
import { debounce } from "common/utils";
import { imgLoadListenerMixin, backTopMixin } from "common/mixin.js"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodDetail,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList,
    Scroll
  },
  mixins: [imgLoadListenerMixin, backTopMixin],
  data() {
    return {
      id: null,
      swiperImgList: [],
      baseInfo: {},
      shopInfo: {},
      goodDetail: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      navElementRefs: ["detailswiper", "detailparam", "detailcomment", "detailrecommend"],
      navElementYList: [], //记录导航栏对应要跳转的位置
      recordNavPositions: null, //记录位置的方法
      currentIndex: 0
    }
  },
  created() {
    this.id = this.$route.query.id;
    this._initData();

    this.recordNavPositions = debounce(() => {
      this.navElementYList = [];
      for (let elementRef of this.navElementRefs) {
        this.navElementYList.push(this.$refs[elementRef].$el.offsetTop);
      }
      //添加一个方便位置判断的最大值
      this.navElementYList.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {
    //事件总线监听，防抖。推荐商品-图片加载完毕后，更新scroll（mixin）
  },
  destroyed() {
    //移除事件监听（mixin)
  },
  methods: {
    //获取数据
    _initData() {
      //商品数据
      getDetailData(this.id)
        .then(res => {
          const data = res.result;
          this.swiperImgList = data.itemInfo.topImages;

          //设置baseInfo-商品基础信息
          this.baseInfo = new GoodBaseInfo(data.itemInfo, data.columns, data.shopInfo.services);

          //设置店铺信息shopInfo
          this.shopInfo = new GoodShopInfo(data.shopInfo);

          //设置商品详情goodInfo
          this.goodDetail = data.detailInfo;

          //设置商品参数goodParam
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          //设置商品评论(评论数大于1时)
          if (data.rate.cRate != 0) {
            this.commentInfo = data.rate.list[0];
          }
        })

      //推荐信息
      getRecommendData()
        .then(res => {
          this.recommendList = res.data.list;
        });
    },

    //在详情图片全部加载完毕后更新Scroll
    detailImagesLoad() {
      //刷新Scroll的（mixin的防抖）
      this.refreshScroll();

      //记录导航要跳转的位置
      this.recordNavPositions();
    },


    /**
     * 事件监听相关
     */

    //导航栏点击跳转事件
    navItemClick(index) {
      //方法1：使用scrollToElement实现
      // const navElement = this.$refs[this.navElementRefs[index]].$el;
      // this.$refs.scroller.scrollToElement(navElement, 100);

      //方法2：使用记录的y和scrollTo来实现
      this.$refs.scroller.scrollTo(0, -this.navElementYList[index], 100);
      this.currentIndex = index;
    },

    //页面滚动监听。
    contentScroll(position) {

      //1.判断backtop是否显示(mixin)
      this.updateIsShowBackTop(position);

      //2.动态设定导航栏选中的项

      //获取y值(注意y是负值)
      const y = -position.y;
      //todo:有时候没有评论
      //将y和各主题的offsetTop对比，设置主题选中
      const length = this.navElementYList.length;
      let top, bottom;
      for (let i = 0; i < length - 1; i++) {
        top = +this.navElementYList[i];
        bottom = +this.navElementYList[i + 1]
        //（优化：创建时，手动给列表添加了一个末项作为最大值。若没有的话需区别对待最后一项）
        // if ((this.currentIndex != i) && (i < length - 1 ? (y <= top && y > bottom) : y <= top)) {
        if ((this.currentIndex != i) && (y >= top && y < bottom)) {
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = i;
          break;
        }
      }
    },

    //添加到购物车
    addCartClick() {
      console.log('click-addcart')
      //购物车商品信息
      const goodObj = {
        id: this.id,
        desc: this.goodDetail.desc,
        price: this.baseInfo.newPrice,
        title: this.baseInfo.title,
        img: this.swiperImgList[0]
      }
      this.$store.dispatch("addGoodToCart", goodObj)
        .then(result => {
          //todo : show toast
          console.log(result);
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
  z-index: 11;
  background-color: #fff;
}

.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: var(--color-background);
}

.detail-scroll {
  position: relative;
  height: calc(100% - 44px - 58px);
}
</style>