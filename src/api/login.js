import request from '@/utils/request'
import axios from 'axios'

// 登录
export function login(username, password) {
  if (username === 'admin') {
    return axios.get('/static/json/login.json')
  }else {
    return axios.get('/static/json/login1.json')
  }
}

export function getRouter(roule) {
  // todo 调用测试的json文件
  if (roule === 'admin') {
    return axios.get('/static/json/router.json')
  } else {
    return axios.get('/static/json/router1.json')
  }
}
// 获取左侧菜单树
export function getMenu(roule) {
  if (roule === 'admin') {
    return axios.get('/static/json/router.json')
  } else {
    return axios.get('/static/json/router1.json')
  }
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
