import { ADD_GOOD_COUNT, ADD_GOOD_TO_CART } from "./mutation_types";

export const actions = {
  addGoodToCart(context, goodInfo) {
    return new Promise((resolve, reject) => {
      let goodItem;
      if (context.state.cartList.length > 0) {
        goodItem = context.state.cartList.find(
          good => good.item.id == goodInfo.id
        );
      }
      if (goodItem !== undefined) {
        //增加对应商品的数量
        context.commit(ADD_GOOD_COUNT, goodItem);
        resolve("商品数量增加成功");
      } else {
        goodItem = {
          item: goodInfo,
          count: 1,
          checked: true //是否选中
        };
        //向购物车添加商品
        context.commit(ADD_GOOD_TO_CART, goodItem);
        resolve("商品添加成功");
      }
    });
  }
};
