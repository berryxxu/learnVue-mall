import VueRouter from "vue-router"
import Vue from 'vue'

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")


// 1.安装插件
Vue.use(VueRouter);

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    name: "home",
    path: '/home',
    component: Home
  },
  {
    name: "category",
    path: '/category',
    component: Category
  },
  {
    name: "cart",
    path: '/cart',
    component: Cart
  },
  {
    name: "profile",
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

// 3.导出router
export default router;