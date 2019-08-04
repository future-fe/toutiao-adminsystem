// 定义router对象  导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  routes: [{
    path: '/login',
    // name的作用给当前路由规则取名  $router.push('/login')  或者 $router.push({name:'login'})
    name: 'login',
    component: login
  }]
})

export default router
