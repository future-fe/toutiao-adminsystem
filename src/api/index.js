// 配置一个axios  导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
// 进行配置
// 1. 基准路径
axios.defaults.baseURLL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2. token认证， 配置请求头信息
axios.defaults.headers = {
  // token认证需要的字段  Authorization:Bearer + 空格 + token信息
  Authorization: `Bearer ${store.getUser().token} `
}
// 3. 导出
export default axios
