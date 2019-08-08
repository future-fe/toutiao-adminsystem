<template>
  <!-- 语法糖  v-model="reqParams.channel_id"
          <input  设置值:value="reqParams.channel_id"
          返回值 @input="reqParams.channel_id = $event.target.value"> -->
  <!-- 父组件传值子组件
          在子组件的内部  props:['value']   和data中数据一样使用，仅读。
          给子组件的标签  :value  属性 -->
  <!--   子组件传值父组件
          给子组件的标签  @input 事件  fn函数属于父组件
          在子组件的内部  触发事件  $emit('input','数据')
          在父组件中fn函数被触发，默认参数子组件提交的数据。 -->
  <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
  <el-select
    clearable
    :value="value"
    @change="fn"
    placeholder="请选择"
  >
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
// // computed 计算属性使用场景：当你需要一个新数据，需要依赖data中的数据。
//   // watch 侦听器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大操作(异步操作)
//   watch: {
//     'reqParams.channel_id' (newValue) {
//       if (newValue === '') {
//         this.reqParams.channel_id = null
//       }
//     }
//   },
// 注意：当你清空内容的时候，值为空字符，处理成null数据。
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 频道下拉选项数据
      channelOptions: []
    }
  },
  created () {
    // 频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    // 获取频道下拉选项数据
    async getChannelOptions () {
      // const o = {data:{}};  const {data} = o;  一层解构  对象的结构一层
      // const res = {data:{data:{channels:[]}}}; 多层解构  const {data:{data:data}}
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      // 空字符处理成null
      if (val === '') val = null
      // 数据提交给父组件使用
      // vm.$emit("事件名称",参数1,参数2,参数3......)
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
