// 封装一个插件
// 注册所有components下的组件为全局组件
import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
import myChannel from '@/components/my-channel'
import myImage from '@/components/my-image.vue'
import COMA from '@/components/com-a'
import COMB from '@/components/com-b'

// vue插件 暴露一个对象  对象中有一个选项  install 安装意思
export default {
  install (Vue) {
    // 安装函数  当Vue.use(使用插件) install被调用
    // Vue 全局的vue对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
    Vue.component(COMA.name, COMA)
    Vue.component(COMB.name, COMB)
  }
}
