// 定义router对象  导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Setting from '@/views/setting'
import Image from '@/views/image'
import store from '@/store'
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
    }, {
      path: '/article',
      name: 'article',
      component: Article
    }, {
      path: '/setting',
      name: 'setting',
      component: Setting
    }, {
      path: '/image',
      name: 'image',
      component: Image
    }]
  }, // 处理404
  {
    path: '*',
    name: '404',
    component: NotFound
  }
  ]
})

/*
 1. 除登录路由外， 所有的路由跳转前， 判断是否登录过。
 2.判断 本地存储 是否存储了用户信息，如果存储 意味登录了放行，如果没有 意味没登录 拦截到登录路由
 技术： 路由导航守卫监听到 跳转路由前 */
// 注册一个全局的前置导航守卫
router.beforeEach((to, from, next) => {
  // 如果不去主动的触发 resolve（next 下一步） 会一直等待
  // 1.判断是不是登录路由
  /*  if (to.path === '/login') return next()
   // 2.判断登录状态
   if (!store.getUser().token) return next('/login')
   // 3.放行
   next() */
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
