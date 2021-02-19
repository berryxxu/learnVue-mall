/** 
商品列表
**/
<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :goodsItem="item"
      :key="index"
      class="item"
    >
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodListItem.vue'
export default {
  components: { GoodsListItem },
  name: "GoodList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  /* 设置每个项目两侧的间隔相等 */
  justify-content: space-around;
  padding: 5px;
}
</style>