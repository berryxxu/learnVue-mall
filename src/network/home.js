/* 将首页所需要的各个请求封装到该文件中,可在此进行统一管理 */

import { request } from "./request"

export function getHomeMultiData() {
  return request({
    url: "/home/multidata"
  })
}