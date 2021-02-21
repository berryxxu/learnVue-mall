<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength | isBlank }})</div>
    </nav-bar>
    <scroll class="cart-content" ref="scroller">
      <cart-list> </cart-list>
    </scroll>
    <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
    <!-- <toast></toast> -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import Scroll from "components/common/scroll/Scroll"
// import Toast from 'components/common/toast/Toast'

import { mapGetters } from "vuex"

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
    // Toast
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      cartLength: "cartLength"
    })
  },
  filters: {
    isBlank(value) {
      return value == 0 ? '空' : value;
    }
  },
  methods: {},

  created() {
  },
  activated() {
    this.$refs.scroller.refresh();
  }
}
</script>
 
<style scoped>
.cart {
  height: 100vh;
  position: relative;
}

.cart-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  background-color: var(--color-tint);
  color: white;
}

.cart-content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  /*  49px + 49px; */
  bottom: 98px;
  left: 0;
  right: 0;
  /* 有bug的固定方式 */
  /* height: calc(100% - 44px - 49px);
  margin-top: 44px; */
}

.cart-bottom-bar {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  z-index: 10;
}
</style>