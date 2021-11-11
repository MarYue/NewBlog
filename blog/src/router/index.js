import Vue from 'vue'
import Router from 'vue-router'
import { fmtRoutesList } from './tools'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

let routes = []
// 读取所有js文件
const requireModule = require.context('.', false, /^((?!(index|tools)).)+\.js$/)
requireModule.keys().forEach(fileName => {
  routes = routes.concat(requireModule(fileName).default)
})

const router = new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }), // 切换路由后回到顶部
  routes: [
    { path: '*', redirect: '/Download', hidden: true }
  ].concat(fmtRoutesList(routes))
})

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
