<template>
  <div class="shop-info">
    <div class="shop-info-top">
      <img :src="shopInfo.logo" />
      <span class="shop-name">{{ shopInfo.name }}</span>
    </div>
    <div class="shop-info-middle">
      <div class="middle-item shop-info-left">
        <div class="info-cells">
          <div class="cells-count">{{ shopInfo.sells | sellCountFilter }}</div>
          <div class="cells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shopInfo.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>

      <div class="middle-item shop-info-right">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score">{{ item.score }}</td>
            <td>{{ item.isBetter ? '高' : '低' }}</td>
            <td></td>
          </tr>
          <tr></tr>
        </table>
      </div>
    </div>
    <div class="shop-info-bottom">
      <div class="shop-go" @click="shopDetail"></div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "DetailShopInfo",
  data() {
    return {
    }
  },
  props: {
    shopInfo: {}
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + '万';
    }
  },
  methods: {
    shopDetail() {
      //todo
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 20px 8px;
}

.shop-info-top {
  line-height: 50px;
  /* 元素垂直居中 */
  display: flex;
  align-items: center;
}

.shop-info-top img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-info-top .shop-name {
  font-size: 20px;
  margin-left: 10px;
  color: #999;
  /* vertical-align: center; */
}

.shop-info-middle {
  margin: 15px 20px;
  display: flex;
  align-items: center;
}

.shop-info-middle .middle-item {
  color: #333;
  flex: 1;
}

.shop-info-middle .shop-info-left {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-info-left .cells-count,
.shop-info-left .goods-count {
  font-size: 18px;
}

.shop-info-left .cells-text,
.shop-info-left .goods-text {
  margin-top: 10px;
  font-size: 13px;
}

.shop-info-middle .shop-info-right {
  font-size: 14px;
}

.shop-info-middle .shop-info-right table {
  width: 120px;
  margin-left: 30px;
}

.shop-info-right table td {
  padding: 5px 0;
}

.shop-info-right .score {
  color: #5ea732;
}
</style>