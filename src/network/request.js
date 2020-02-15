import axios from 'axios'
//解决跨域sessionId问题
axios.defaults.withCredentials = true
export function request(config) {
  // 1 创建axios实例
  const instance = axios.create({
    baseURL: "http://47.113.92.137",
    timeout: 20000,
    //解决跨域session问题
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
  // 2 axios拦截器
  // 2.1 请求拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config

  }, err => {
    console.log(err);
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
