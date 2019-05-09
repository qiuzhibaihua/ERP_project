import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { StaticRouterMap } from '../../router/index'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    RouterList: [] // 动态路由
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    set_router: (state, RouterList) => {
      state.RouterList = RouterList
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data.data
            // cookie存储token
            setToken(data.token)
            // vuex存储token 用户名 头像
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            localStorage.setItem('SET_NAME',data.name)
            localStorage.setItem('SET_AVATAR',data.avatar)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 动态设置路由 此为设置设置途径
    setRouterList({ commit }, routerList) {
      commit('set_router', StaticRouterMap.concat(routerList)) // 进行路由拼接并存储
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            commit('set_router', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
