<template>
  <div class='container'>
    <div class="header">header</div>
    <div class="content">
      <!--1.插槽内容：  默认插槽 -->
      <!-- <slot></slot> -->
      <!--2.后备内容-->
      <!-- <slot>后备内容</slot> -->
      <!-- 3.具名插槽 -->
      <!-- <slot name="content">默认内容</slot> -->
      <!-- 4. 作用域插槽  -->
      <slot
        name="content"
        :msg="msg"
      >默认内容</slot>
    </div>
    <div class="footer">
      <!-- 3.具名插槽 -->
      <!-- <slot name="footer">默认底部</slot> -->
      <!-- 4. 作用域插槽 -->
      <slot
        name="footer"
        msg="组件内部数据"
      >默认内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'my-test的数据'
    }
  }
}
</script>

<style scoped lang='less'></style>
