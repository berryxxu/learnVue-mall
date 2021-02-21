/**
 * 以插件的形式包装Toast组件
 */
import Toast from "./Toast";

const toastPlugin = {
  //main.js 里 Vue.use(toast)会调用这里的install方法
  install(Vue) {
    //1.创建组件构造器
    const toastConstructor = Vue.extend(Toast);

    //2.根据组件构造器，创建组件对象
    //3.将组件对象挂载到一个div元素上--实践发现$mount里无需传递参数
    // const toast = new toastConstructor().$mount(document.createElement("div"));
    const toast = new toastConstructor().$mount();

    //4.将DOM元素添加到文档
    document.body.appendChild(toast.$el);

    //5.将组件对象添加到Vue实例的原型上
    Vue.prototype.$toast = toast;
  }
};

export default toastPlugin;
