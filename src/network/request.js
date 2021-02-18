import axios from 'axios'

//不返回default，而是返回实例，这样可以在有新的请求配置时增加新的实例
export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  })

  //2.配置axios的拦截器
  //请求拦截
  instance.interceptors.request.use(config => {
    //对config信息进行修改
    //可在此添加loading等
    //有些请求需要验证身份或用户信息
    return config;
  }, err => {
    //可进行请求超时的处理
  })

  //响应拦截
  instance.interceptors.response.use(response => {
    //响应成功时
    //过滤返回的config，status等信息，只返回数据。
    //这里必须有返回值，否则请求不到数据
    return response.data
  }, err => {
    //响应失败时
    //处理失败
  })

  //3.发送请求(返回的就是一个Promise)
  return instance(config)
}
