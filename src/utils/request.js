import axios from 'axios'
import Vue from 'vue'
import store from '../store'
import { getToken } from '@/utils/auth'
const vm = new Vue()
// 创建axios实例
const service = axios.create({
  // todo
  baseURL: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/', // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // todo
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      vm.$message.error(res.message,5)
      // todo
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        vm.$message.error('Token过期,被登出')
        // 调用接口强制登出
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    vm.$message.error(error.message,5)
    return Promise.reject(error)
  }
)

export default service
