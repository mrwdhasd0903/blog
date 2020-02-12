import axios from 'axios'
export function request(config) {
  // 1 创建axios实例
  const instance = axios.create({
    baseURL: "http://47.113.92.137",
    timeout: 20000
  })
  // 2 axios拦截器
  // 2.1 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 2.2 响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  // 3发送真正的网络请求
  return instance(config)
}
