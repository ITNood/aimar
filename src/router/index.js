// import {
//   path
// } from 'chromedriver'
import Vue from 'vue'
import Router from 'vue-router'
const layout = () => import('@/components/layout')
// 登录页
const reload = () => import('@/components/reLoad')

const main = () => import('@/views/index')
const repairHistory = () => import('../views/repairhistory')
const data = () => import('@/views/data')

Vue.use(Router)
// 固定的路由表
export const fixedRouter = [{
  path: '',
  component: reload,
  hidden: true
},
{
  path: '',
  component: layout, //整体页面的布局(包含左侧菜单跟主内容区域)
  children: [{
    path: 'main',
    component: main,
    meta: {
      title: '总控制台', //菜单名称
      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
      icon: 'icon-dianyingziyuan' //菜单左侧的icon图标
    }
  }]
},
{
  path: '',
  component: layout,
  children: [{
    path: 'repairHistory',
    component: repairHistory,
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
    path: 'data',
    component: data,
    meta: {
      title: '排故方案推荐',
      icon: 'icon-paigufangan',
      roles: ['user', 'admin'],
    }
  }]
},
{
  path: '',
  component: layout,
  children: [{
    path: 'data',
    component: data,
    meta: {
      title: '维修方案输出',
      icon: 'icon-weixiu',
      roles: ['user', 'admin'],
    }
  }]
},
{
  path: '',
  component: layout,
  children: [{
    path: 'data',
    component: data,
    meta: {
      title: '部件流转追溯',
      icon: 'icon-zhuisu',
      roles: ['user', 'admin'],
    }
  }]
},
{
  path: '',
  component: layout,
  children: [{
    path: 'data',
    component: data,
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
    path: 'data',
    component: data,
    meta: {
      title: '领料方案输出',
      icon: 'icon-lingliao',
      roles: ['user', 'admin'],
    }
  }]
},
{
  path: '',
  component: layout,
  children: [{
    path: 'data',
    component: data,
    meta: {
      title: '任务中心',
      icon: 'icon-renwu',
      roles: ['user', 'admin'],
    }
  }]
},
]
// 需要权限判断展示的路由
export const permissionRouter = [

]

export default new Router({
  mode: 'hash',
  routes: fixedRouter

})
