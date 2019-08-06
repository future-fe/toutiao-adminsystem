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
    <!-- 筛选结果,标签中的内容称为插槽内容 -->
    <!-- 1. 当你需要额外插入内容给组件使用，使用默认插槽 -->
    <!-- <my-test> +++content </my-test>
    <my-test>---内容</my-test> -->
    <!-- 2.使用组件的时候没有插入内容，使用后备内容 -->
    <!-- <my-test></my-test> -->
    <!-- 3. 当你需要插入多处内容的时候,使用具名插槽 -->
    <!-- <my-test>
      <div slot="content">content</div>
      <div slot="footer">footer</div>
    </my-test> -->
    <!-- 4.作用域插槽:组件内部的数据是相互独立，在使用组件的时候需要使用组件内部的数据 -->
    <my-test>
      <!-- slot="content" 指定插槽 -->
      <!-- slot-scope="scope" scope是slot插槽上所有的自定义属性的集合{msg:'my-test的数据'} -->
      <div
        slot="content"
        slot-scope="scope"
      >content 得到组件内部数据：{{scope.msg}}</div>
      <!-- 目前以上的写法，是2.6.0的vue版本之前的写法，新的写法：v-slot:插槽名称="插槽上所有自定义属性集合数据对象" -->
      <template v-slot:footer="scope">footer 得到组件内部数据：{{scope.msg}}</template>
    </my-test>
  </div>
</template>

<script>
import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
export default {
  components: { MyBread, MyTest },
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
