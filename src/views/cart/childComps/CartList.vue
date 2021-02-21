<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(good, index) in this.$store.state.cartList"
      :key="index"
      :item="good"
    ></cart-list-item>
  </div>
</template>
 
<script>
import CartListItem from './CartListItem'

export default {
  components: { CartListItem },
  name: "CartList",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {},

  created() {
  }
}
</script>
 
<style scoped>
.cart-list {
  font-size: 14px;
}
</style>