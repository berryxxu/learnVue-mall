/**
 * Better-Scroll封装
 */
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      bscroll: null
    }
  },
  mounted() {
    //不可在created中获取DOM元素
    //若其他组件中也有class是wrapper的元素，所以用querySelector等获取元素有风险。
    // this.bscroll = new BScroll(document.querySelector(".wrapper"), {});
    //解决：使用ref绑定元素,这样即使其他组件有同名的ref，获取到的也都还是这里的元素

    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)

  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }

      // 1.创建BScroll对象
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true,
        mouseWheel: true,
        bounce: {
          top: false
        },
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      this.bscroll.on('scroll', position => {
        console.log(position);
      })

      // 3.监听上拉事件
      // this.bscroll.on('pullingUp', () => {

      // })
    },

    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },

    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped>
</style>