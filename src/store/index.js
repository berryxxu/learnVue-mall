import Vuex from "vuex";
import Vue from "vue";

import { actions } from "./actions.js";
import { mutations } from "./mutations.js";

Vue.use(Vuex);

//用于测试购物车列表的数据（避免每次添加）
import testCartData from "./testCart.js";

const store = new Vuex.Store({
  state: {
    cartList: testCartData
  },
  mutations,
  actions,
  getters: {
    cartLength(state) {
      if (!state.cartList) return 0;
      return state.cartList.length;
    },
    isCartAllChecked(state) {
      if (!state.cartList || state.cartList.length === 0) return false;

      return state.cartList.findIndex(item => item.checked == false) == -1;
    },
    cartCheckedLength(state) {
      if (!state.cartList || state.cartList.length === 0) return 0;
      return state.cartList.reduce((preCount, item) => {
        return item.checked ? (preCount += 1) : preCount;
      }, 0);
    },
    cartTotalPrice(state) {
      if (!state.cartList || state.cartList.length === 0) return 0;

      return state.cartList
        .reduce(
          (preValue, item) =>
            !item.checked ? preValue : (preValue += +item.price * item.count),
          0
        )
        .toFixed(2);
    }
  }
});

export default store;
