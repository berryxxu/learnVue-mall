<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <detail-swiper :list="swiperImgList"></detail-swiper>
      <detail-base-info :baseInfo="baseInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-good-detail
        :goodDetail="goodDetail"
        @imagesLoad="detailImagesLoad"
      ></detail-good-detail>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodDetail from "./childComps/DetailGoodDetail"
import DetailParamInfo from "./childComps/DetailParamInfo"

import Scroll from 'components/common/scroll/Scroll'

import { getDetailData, GoodBaseInfo, GoodShopInfo, GoodsParam } from "network/detail.js"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodDetail,
    DetailParamInfo,
    Scroll
  },
  data() {
    return {
      id: null,
      swiperImgList: [],
      baseInfo: {},
      shopInfo: {},
      goodDetail: {},
      paramInfo: {}
    }
  },
  created() {
    this.id = this.$route.query.id;
    this._initData();
  },
  methods: {
    //获取数据
    _initData() {
      getDetailData(this.id).then(res => {
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
      })
    },

    //在详情图片全部加载完毕后更新Scroll
    detailImagesLoad() {
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}

.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: var(--color-background);
}

.detail-scroll {
  height: calc(100% - 44px);
}
</style>