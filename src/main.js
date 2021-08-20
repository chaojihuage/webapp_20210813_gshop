import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import './mock/mockServer' // 加载mockServer即可
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters' // 加载过滤器
Vue.config.productionTip = false
Vue.component(Button.name, Button) // <mt-button>
Vue.use(VueLazyload, {
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 使用上vue-router
  render: h => h(App),
  store // 使用上vuex
})
