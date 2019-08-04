// 配置一个axios  导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 进行配置
// 1. 基准路径
axios.defaults.baseURLL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 2. 请求时没有携带token:token认证， 配置请求头信息Authorization:Bearer + 空格 + token信息

/* //方式一:只会执行一次
  //1.登录的时候 ，没有token，此时去获取了token undefined；
  //2.登录成功后存储了token，但是此时获取token的代码没有重新执行了，使用的还是之前获取的token undefined
  //3.再次发请求的时候 是没携带token-----报错
 axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token} `
} */

// 方式二:添加请求拦截器:在每次请求之前，获取token信息，追加在headers中
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么:修改config(是为请求提供的配置信息),追加在headers(服务器响应头)中
  config.headers = {
    Authorization: `Bearer ${store.getUser().token} `
  }
  return config
}, (error) => {
  // 对请求错误做些什么,认为返回错误的promise对象
  // 创建promise对象的方式  new Promise() 结果可能成功可能失败
  // Promise.resolve() 创建一个成功的promise
  // Promise.reject() 创建一个失败的promise
  return Promise.reject(error)
})

// 3.带了token但是失效
// 响应拦截器: 是每次响应到客户端的时候， 拦截。
axios.interceptors.response.use((response) => {
  // 成功的时候做一些事情
  return response
}, (error) => {
  // 失败的时候做一些事情
  // 获取响应状态码 err对象包含响应对象  err.response
  // 响应对象中包含状态码  err.response.status
  if (error.response.status === 401) {
    // 跳转到登录页面 this.$router.push('/login')
    // 方式一:
    // $router.push('/login') // 其实 地址栏改成#/login
    // location.hash = '#/login'
    // 方式2：
    // 此时没有vue实例，$router对象获取不到，通过router实例直接使用
    router.push('/login')
  }
  return Promise.reject(error)
})
// 4. 导出
export default axios
