import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import '@/style/index.css'
// @ 是某一个路径别名  src路径别名  在vue-cli创建的项目下才可是呀
// 目录下是有默认索引文件 index.js 就是索引文件  .js .vue .json
import router from '@/router'

import axios from '@/api'
// 自己的插件使用
import myCom from '@/components'
Vue.use(myCom)

Vue.prototype.$http = axios

Vue.use(ElementUI)
// 控制台提示信息 开发环境来提示  详细一些
Vue.config.productionTip = false
// main.js 的职责
// 1. 职责：导入项目需要依赖的资源（js包 css文件 其他资源）
// 2. 职责：创建一个根实例

// 根实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
