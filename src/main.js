import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "./components/common/toast";

Vue.config.productionTip = false;

//安装toast插件
Vue.use(toast);

//创建事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount("#app");
