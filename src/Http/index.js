import axios from 'axios'
import { Loading, Message } from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'
// import encodeURI from "urlencode";
Vue.use(Router)
// 创建axios实例
const Axios = axios.create({
  baseURL: '/',
  timeout: 10000,//超时请求
  maxRedirects: 1,
  headers: { "Content-Type": 'application/json' },
})
// var load;
//拦截所有api请求，重新获取token
Axios.interceptors.request.use(
  config => {
    // load = Loading.service({ fullscreen: true, text: 'Loading...' })
    const token = localStorage.getItem('Token')
    // const lang = localStorage.getItem('lang')
    if (token) {
      config.headers.Token = token
      // config.headers.lang = lang
    }
    return config
  },
  err => {
    // load.close()
    return Promise.reject(err)
  }
)

// 拦截所有的 api 响应，可以实现自动弹窗报错
Axios.interceptors.response.use(
  response => {
    // load.close()
    if (response.data.code === 500) {//退出登录
      this.$message.error(response.data.msg)
      localStorage.removeItem('Token')
      this.$router.push('/')
    } else if (response.data.code === 400) {//返回错误
      this.$message.error(response.data.msg)
      return Promise.resolve(response.data)
    } else if (response.data.code === 200 || response.data.code === '200') {//code===200返回数据
      return Promise.resolve(response.data);
    }
  },
  error => {
    // load.close()
    if (error === 'cancelled locally') {
      return Promise.reject(error);
    }
    if (error.message === 'timeout of 5000ms exceeded') {
      Message({
        message: '接口请求超时!', type: 'error', duration: 3 * 1000
      });
      return Promise.reject(error);
    }
    if (error.response.code === 429) {
      Message({
        message: '您的请求频率太快啦!', type: 'info', duration: 3 * 1000
      });
      return Promise.reject(error);
    }
    Message({
      message: '接口或网络异常，请稍后再试!', type: 'error', duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

export default Axios;


