// 事件总线  eventBus
// 职责：仅仅负责  事件绑定  事件触发
// 不是在模块内进行事件的绑定和触发，提供给其他组件绑定和触发。

// 在这个文件里实例化一下vue； 然后在组件A和组件B中分别引入这个bus.js文件，
// 将事件监听和事件触发都挂到bus.js这个实例上， 这样就可以实现全局的监听与触发了
import Vue from 'vue'
export default new Vue()
