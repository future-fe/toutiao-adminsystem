<template>
  <div class="container">
    Article
  </div>
</template>

<script>
export default {
  // 生命周期函数，
  created () {
    // 这样发送请求会报错：没有认证，登录后调用401 (UNAUTHORIZED)，调不通接口
    this.$http
      .get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
      .then(res => {
        console.log(res.data)
      })
  }
}
</script>

<style scoped lang='less'>
</style>
