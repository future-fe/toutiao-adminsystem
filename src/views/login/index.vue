<template>
  <div class="container">
    <el-card class="my-card">
      <img
        src="../../assets/images/logo_index.png"
        alt=""
      >
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="loginRules"
        status-icon
      >
        <el-form-item prop="mobile">
          <el-input
            placeholder="请输入手机号"
            v-model="loginForm.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
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
            @click="login"
          >登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 申明校验函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号  1开头 第二位3-9  9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    // eslint-disable-next-line no-labels
    return {
      // 表单对象数据
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('校验success')
        }
      })
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
