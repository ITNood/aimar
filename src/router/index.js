// import {
//   path
// } from 'chromedriver'
import Vue from 'vue'
import Router from 'vue-router'
// import { component } from 'vue/types/umd'
const layout = () => import('@/components/layout')
// 登录页
const reload = () => import('@/components/reLoad')
const main = () => import('@/views/index')
const repairHistory = () => import('../views/repairhistory')
const integrated = () => import('../views/integrated')
const searchResult = () => import('../views/searchResult')
const failureScheme = () => import('../views/failureScheme')
const failureSchemeone = () => import('../views/failureSchemeone')
const faultDescription = () => import('../views/faultDescription')
const keyword = () => import('../views/keyword')
const faultCode = () => import('../views/faultCode')
const deOrder = () => import('../views/deOrder')
const task = () => import('../views/task')
const componentReplacement = () => import('../views/componentReplacement')
const reportDownload = () => import('../views/reportDownload')
const test = () => import('../views/test')

const data = () => import('@/views/data')

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
// 固定的路由表
export const fixedRouter = [
  {
    path: '',
    component: reload,
    hidden: true
  },
  {
    path: '',
    component: layout, //整体页面的布局(包含左侧菜单跟主内容区域)
    children: [{
      component: main,
      path: 'main',
      meta: {
        title: '控制台', //菜单名称
        roles: ['user', 'admin'], //当前菜单哪些角色可以看到
        icon: 'icon-dianyingziyuan' //菜单左侧的icon图标
      }
    }]
  },
  {
    path: '',
    component: layout,
    children: [{
      component: repairHistory,
      path: 'repairHistory',
      meta: {
        title: '维修记录查询',
        icon: 'icon-search',
        roles: ['user', 'admin'],
      }
    }]
  },
  {
    path: '',
    component: layout,
    children: [{
      component: failureScheme,
      path: 'failureScheme',
      meta: {
        title: '排故方案推荐',
        icon: 'icon-paigufangan',
        roles: ['user', 'admin'],
      }
    }],
    hidden: true,
  },

  {
    path: '',
    component: layout,
    children: [{
      component: componentReplacement,
      path: 'componentReplacement',
      meta: {
        title: '部件更换推荐',
        icon: 'icon-cc',
        roles: ['user', 'admin'],
      }
    }]
  },

  {
    path: '',
    component: layout,
    children: [{
      component: integrated,
      path: 'integrated',
      meta: {
        title: '综合筛选',
        roles: ['user', 'admin'],
      }
    }],
    hidden: true
  },
  {
    path: '',
    component: layout,
    children: [{
      component: searchResult,
      path: 'searchResult',
      meta: {
        title: '搜索结果',
        roles: ['user', 'admin'],
      }
    }],
    hidden: true
  },
  {
    path: '',
    component: layout,
    children: [{
      path: 'faultDescription',
      component: faultDescription,
      meta: {
        title: '故障描述',
        roles: ['user', 'admin'],
      }
    }],
    hidden: true
  },
  {
    path: '',
    component: layout,
    children: [{
      component: keyword,
      path: 'keyword',
      meta: {
        title: '关键词组',
        roles: ['user', 'admin'],
      }
    }],
    hidden: true
  },
  {
    path: '',
    component: layout,
    children: [{
      path: 'faultCode',
      component: faultCode,
      meta: {
        title: '故障代码',
        roles: ['user', 'admin'],
      }
    }],
    hidden: true
  },
  {
    path: '',
    component: layout,
    children: [{
      path: 'deOrder',
      component: deOrder,
      meta: {
        title: 'DE单号',
        roles: ['user', 'admin'],
      }
    }],
    hidden: true
  },
  {
    path: '',
    component: layout,
    children: [{
      path: 'reportDownload',
      component: reportDownload,
      meta: {
        title: '报告下载中心',
        icon: 'icon-download',
        roles: ['user', 'admin'],
      }
    }],
  },

]
// 需要权限判断展示的路由
export const permissionRouter = [

]

export default new Router({
  mode: 'hash',
  routes: fixedRouter

})

