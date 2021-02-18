/* 将首页所需要的各个请求封装到该文件中,可在此进行统一管理 */

import { request } from "./request"

//获取首页展示数据：轮播图+推荐
export function getHomeMultiData() {
  return request({
    url: "/home/multidata"
  })
}

//获取首页的商品列表。传入类型和页码
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}