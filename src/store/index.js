// 模块  获取用户  设置用户
// 存储信息的时候：
// 1. 约定信息的KEY是什么  toutiao-adminsystem
// 2. 存储信息的值是什么   用户信息对象 字符串格式json
const KEY = 'toutiao-adminsystem'
export default {
  // 存储用户信息到sessionStorage
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 获取用户信息从sessionStorage 获取不到返回空对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
