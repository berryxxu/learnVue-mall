<template>
  <div class="cart-list-item">
    <cart-check-botton
      :isChecked="item.checked"
      ref="checkBtn"
      @click.native="checkBtnClick"
    ></cart-check-botton>
    <div class="item-image">
      <img :src="item.img" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-desc">{{ item.desc }}</div>
      <div class="info-bottom">
        <span class="item-price">￥{{ item.price }}</span>
        <span class="item-count">×{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>
 
<script>
import CartCheckBotton from './CartCheckBotton'
export default {
  components: { CartCheckBotton },
  name: "CartListItem",
  data() {
    return {
    }
  },
  props: {
    item: {}
  },
  methods: {
    checkBtnClick() {
      this.item.checked = !this.item.checked;
    },

    infoClick() {
      this.$router.push({
        url: '/detail',
        query: {
          iid: this.item.iid
        }
      })
    }
  },

  created() {
  }
}
</script>
 
<style scoped>
.cart-list-item {
  width: 100%;
  height: 100px;

  display: flex;
  padding: 5px;
  /* padding-left: 0; */

  border-bottom: 1px solid rgba(128, 128, 128, 0.4);
}

.item-image {
  padding: 5px;
}

.item-image img {
  display: block;
  width: 70px;
  height: 100%;
  border-radius: 6px;
}

.item-info {
  font-size: 16px;
  color: #333;
  padding: 5px 5px;
  margin-right: 5px;
  position: relative;
  overflow: hidden;
}

.item-info .item-title,
.item-info .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info .item-desc {
  font-size: 13px;
  color: #666;
  margin-top: 10px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 5px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.info-bottom .item-count {
  /* right: 0; */
  float: right;
}
</style>

