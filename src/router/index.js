// 定义router对象  导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  routes: [{
    path: '/login',
    // name的作用给当前路由规则取名  $router.push('/login')  或者 $router.push({name:'login'})
    name: 'login',
    component: Login
  }, {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      name: 'welcome',
      component: Welcome
    }]
  }, // 处理404
  {
    path: '*',
    name: '404',
    component: NotFound
  }
  ]
})

export default router
