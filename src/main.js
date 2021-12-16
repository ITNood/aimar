import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './static/style/style.scss'
import './static/iconfont/iconfont.css'
import '@/utils/global'//全局
import axios from "axios";
// 控制路由表的js文件
import '@/permission.js'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
