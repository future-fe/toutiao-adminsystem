<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tab组件 -->
      <el-tabs v-model="activeName"
               type="card">
        <el-tab-pane label="粉丝列表"
                     name="list">
          <div class="fans-list">
            <div class="fans-item"
                 v-for="item in fansList"
                 :key="item.id.toString()">
              <el-avatar style="width:80px;height:80px"
                         :src="item.photo"></el-avatar>
              <p style="font-size:12px">{{item.name}}</p>
              <el-button size="mini"
                         plain
                         type="primary">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination style="margin-top:20px"
                         v-if="total > reqParams.per_page"
                         background
                         layout="prev, pager, next"
                         :total="total"
                         :page-size="reqParams.per_page"
                         :current-page="reqParams.page"
                         @current-change="changePager"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像"
                     name="photo">
          <div ref="dom"
               style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 24
      },
      activeName: 'photo',
      total: 0,
      fansList: []
    }
  },
  created () {
    this.getFansList()
  },
  mounted () {
    this.initBar()
  },
  methods: {
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    // 初始化柱状图
    initBar () {
      // 获取DOM 在组件渲染完毕后再去获取
      const dom = this.$refs.dom
      var myChart = echarts.init(dom)
      // 指定图表的配置项和数据
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang='less'>
.fans-item {
  text-align: center;
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  padding-top: 15px;
}
</style>
