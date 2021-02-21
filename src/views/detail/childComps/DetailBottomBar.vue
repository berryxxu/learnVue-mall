<template>
  <div class="detail-bottom-bar">
    <div class="bottom-left">
      <div class="service" @click="serviceClick">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon" @click="shopClick"></i>
        <span>店铺</span>
      </div>
      <div class="collect" @click="collectClick">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <div class="cart" @click="addCartClick">加入购物车</div>
      <div class="buy" @click="checkOutClick">购买</div>
    </div>
    <!-- <sport-ball ref="fall" class="sport-ball"></sport-ball> -->
  </div>
</template>
 
<script>
export default {
  name: "",
  data() {
    return {
    }
  },

  methods: {
    addCartClick() {
      this.$emit('addCartClick')
    },
    checkOutClick() {
      this.$emit('checkOutClick')
    },
    serviceClick() {
      this.$emit('serviceClick')
    },
    shopClick() {
      this.$emit('shopClick')
    },
    collectClick() {
      this.$emit('collectClick')
    }
  },

  created() {
  }
}
</script>
 
<style scoped>
.detail-bottom-bar {
  height: 58px;
  background-color: #fff;
  display: flex;
  text-align: center;
  box-shadow: 0 -0.3px 0.3px gray;

  /* 底部固定做法1 */
  position: relative;
  z-index: 10;

  /* 底部固定做法2 */
  /* position: fixed;
  left: 0;
  right: 0;
  bottom: 0; */
}

.bottom-left,
.bottom-right {
  display: flex;
  flex: 1;
}
.bottom-left > div {
  flex: 1;
  border-right: 0.5px solid rgba(128, 128, 128, 0.2);
}
.bottom-left span {
  font-size: 13px;
}
.bottom-left .icon {
  display: block;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
}

.service .icon {
  background-position: 0 -54px;
}
.shop .icon {
  background-position: 0 -98px;
}

.bottom-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bottom-right > div {
  flex: 1;
}

.cart {
  background-color: rgb(255, 174, 0);
  color: #333;
}

.buy {
  background-color: var(--color-tint);
  color: white;
}
</style>