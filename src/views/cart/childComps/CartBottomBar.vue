<template>
  <div class="cart-bottom-bar">
    <div class="cart-check-all" @click="checkAllClick">
      <cart-check-botton :isChecked="isAllChecked"></cart-check-botton>
      <div>全选</div>
    </div>
    <div class="cart-total-price">合计:￥{{ cartTotalPrice }}</div>
    <div class="cart-check-out" @click="checkOutClick">
      结算{{ checkedLength | checkedLengthFilter }}
    </div>
  </div>
</template>
 
<script>
import CartCheckBotton from './CartCheckBotton.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  components: { CartCheckBotton },
  name: "CartBottomBar",
  methods: {
    //全选
    checkAllClick() {
      let oldIsAllChick = this.isAllChecked;
      this.cartList.forEach(item => item.checked = !oldIsAllChick);
    },
    //结算
    checkOutClick() {
      if (this.checkedLength == 0) {
        this.$toast.show("请选择商品")
        return;
      }
      //结算操作
      this.$toast.show("结算操作");
    }
  },
  computed: {
    //mapGetters的不同写法
    ...mapGetters({
      isAllChecked: "isCartAllChecked",
      checkedLength: "cartCheckedLength"
    }),
    ...mapGetters([
      "cartTotalPrice"
    ]),
    ...mapState(["cartList"])

    //普通的取出vuex内容的方法
    // isAllChecked() {
    //   return this.$store.getters.isCartAllChecked;
    // },
    // cartTotalPrice() {
    //   return this.$store.getters.cartTotalPrice;
    // }
  },
  filters: {
    checkedLengthFilter(value) {
      return value == 0 ? '' : `(${value})`
    }
  }
}
</script>
 
<style scoped>
.cart-bottom-bar {
  display: flex;
  justify-content: flex-end;

  /* 没有内容时无高度 */
  line-height: 49px;
  height: 49px;
  /* 内容居中 */
  text-align: center;

  /* 背景颜色 */
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
  /* 设置阴影 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
  z-index: 10;
}

.cart-check-all {
  flex: 1;
  display: flex;
  margin-left: 10px;
}

.cart-total-price {
  font-size: 14px;
}

.cart-check-out {
  width: 100px;
  margin: 5px 10px;
  /* 49-5-5(margin-top,margin-bottom) */
  line-height: 39px;
  text-align: center;
  background-color: rgb(255, 174, 0);
  color: #333;
  border-radius: 20px;
}
</style>