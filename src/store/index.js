import Vuex from "vuex";
import Vue from "vue";

import { actions } from "./actions.js";
import { mutations } from "./mutations.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
  actions,
  getters: {
    cartLength(state) {
      return state.cartList.length;
    }
  }
});

export default store;
