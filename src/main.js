import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "./components/common/toast";
//图片懒加载
import VueLazyLoad from "vue-lazyload";

// 引入fastclick，解决移动端300ms延迟
import FastClick from "fastclick";
FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  //这里可对lazyload做一些设置
  //注意js中加载图像的方式
  loading: require("./assets/img/common/placeholder.png")
});

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
