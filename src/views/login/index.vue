<template>
  <div class="container">
    <el-card class="my-card">
      <img
        src="../../assets/images/logo_index.png"
        alt=""
      >
      <el-form :model="loginForm">
        <el-form-item>
          <el-input
            placeholder="请输入手机号"
            v-model="loginForm.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入验证码"
            v-model="loginForm.code"
            style="width:65%"
          ></el-input>
          <el-button style=" float: right;">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%"
          >登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // eslint-disable-next-line no-labels
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // 背景图定位 / 背景图尺寸 contain 等比缩放完整在容器内显示  cover  等比缩放完全铺面容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>
