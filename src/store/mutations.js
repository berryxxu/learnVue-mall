import { ADD_GOOD_COUNT, ADD_GOOD_TO_CART } from "./mutation_types";

export const mutations = {
  //增加对应商品的数量
  [ADD_GOOD_COUNT](state, goodItem) {
    goodItem.count++;
  },

  //向购物车添加商品
  [ADD_GOOD_TO_CART](state, goodItem) {
    state.cartList.push(goodItem);
  }
};
