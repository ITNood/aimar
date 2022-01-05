import http from '../Http'
import useHttpApi from './useHttpApi'

const getBaseUrl = (url) => {
  if (process.env.NODE_ENV === 'production') {
    return 'http://10.17.10.192:8082'
  }
  if (useHttpApi.includes(url)) {
    return '/http'
  }
  return '/api'
}

class api {
  async post(url, params) {
    //请求。页面中.then执行成功时的操作。
    return await http.post(`${getBaseUrl(url)}${url}`, params)
  }
  async get(url, params) {
    //请求。页面中.then执行成功时的操作。
    return await http.get(`${getBaseUrl(url)}${url}`, params)
  }
  async put(url, params) {
    //请求。页面中.then执行成功时的操作。
    return await http.put(`${getBaseUrl(url)}${url}`, params)
  }

}
export default new api()