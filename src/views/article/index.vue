<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form
        label-width="80px"
        size="small"
      >
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label=null>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select
            v-model="reqParams.channel_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选项表单数据  提交给后台参数
      reqParams: {
        status: null,
        channel_id: null
      },
      // 频道下拉选项数据
      channelOptions: [
        {
          value: '1',
          label: '开发者资讯'
        },
        {
          value: '2',
          label: 'ios'
        },
        {
          value: '3',
          label: 'c++'
        },
        {
          value: '4',
          label: 'android'
        },
        {
          value: '5',
          label: 'css'
        },
        {
          value: '6',
          label: '数据库'
        },
        {
          value: '7',
          label: '区块链'
        }
      ],
      // 日期数据
      dataArr: []
    }
  },
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
