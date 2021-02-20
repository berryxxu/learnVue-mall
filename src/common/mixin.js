import { debounce } from "common/utils";

//图像监听功能的混入
export const imgLoadListenerMixin = {
  data() {
    return {
      goodImgLoadListener: null, //图像加载完成的监听事件
      refreshScroll: null //将Better-Scroll的刷新结合防抖
    };
  },
  mounted() {
    //此时img标签确实被挂载了，但图像还未渲染结束。
    //监听商品列表项图片的加载，更新scroll的高度,结合防抖
    this.refreshScroll = debounce(() => {
      this.$refs.scroller.refresh();
    }, 100);

    //保存监听函数
    this.goodImgLoadListener = () => {
      //加括号的话会执行该语句
      this.refreshScroll();
    };

    //设置监听
    this.$bus.$on("goodImgLoad", this.goodImgLoadListener);
  },

  destroyed() {
    //在页面销毁时，移除事件监听
    this.$bus.$off("goodImgLoad", this.goodImgLoadListener);
  }
};

import BackTop from "components/content/backTop/BackTop";

//回到顶部功能的混入
export const backTopMixin = {
  components: { BackTop },
  data() {
    return {
      //是否显示返回顶部
      isShowBackTop: false
    };
  },
  methods: {
    //更新是否显示backTop的属性
    updateIsShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    },

    //返回顶部
    clickBackTop() {
      //返回顶部
      this.$refs.scroller.scrollTo(0, 0, 500);
    }
  }
};
