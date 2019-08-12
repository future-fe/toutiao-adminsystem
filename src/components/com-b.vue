<template>
  <div class='container'>
    <el-button type='success'
               @click="eventcomb()">com-b给com-a传值</el-button>
  </div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-b',
  data () {
    return {
      msg: '我是小灰灰噢com-b组件'
    }
  },
  methods: {
    eventcomb () {
      eventBus.$emit('toCOMA', this.msg)
    }
  },
  mounted () {
    eventBus.$on('toCOMB', data => {
      console.log(data)
    })
  }
}
</script>

<style scoped lang='less'></style>
