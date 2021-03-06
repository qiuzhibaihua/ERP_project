import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
// 引入图标
import '@/icons' // icon
import '@/permission' // permission control

// 引入antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
Vue.config.productionTip = false

import '@/styles/index.scss' // global css


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
