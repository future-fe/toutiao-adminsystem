<template>
  <div class='container'>
    <el-button type='success'
               @click="eventcoma()">com-a给com-b传值</el-button>
  </div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-a',
  data () {
    return {
      msg: '我是红太狼com-a组件'
    }
  },
  methods: {
    eventcoma () {
      eventBus.$emit('toCOMB', this.msg)
    }
  },
  mounted () {
    // 事件需要提前绑定，才能触发。
    eventBus.$on('toCOMA', data => {
      console.log(data)
    })
  }
}
</script>

<style scoped lang='less'></style>
