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
import store from '@/store'
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
        mobile: '17601302311',
        code: '246810'
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
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     // 提交登录请求  axios是基于primise封装的 post() 返回值一个promise对象
      //     this.$http
      //       .post(
      //         'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
      //         this.loginForm
      //       )
      //       .then(res => {
      //         // res 响应对象   包含响应主体
      //         // console.log(res.data)
      //         store.setUser(res.data.data)
      //         // 跳转去首页
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         // 错误提示提示
      //         this.$message.error('手机号或验证码错误')
      //       })
      //   }
      // })
      // async&await使用  怎么处理错误 try{ 业务逻辑 }catch(err){ 业务逻辑失败调用catch,进行错误的处理 } 捕获异常
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
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
