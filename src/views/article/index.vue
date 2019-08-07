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
            clearable
            v-model="reqParams.channel_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            @change="changeDate"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search()"
          >筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到 {{total}}条结果：
      </div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <!-- el-table-column 表格组件 prop指定字段显示该字段的值  label列标题 -->
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!--使用作用域插槽，results外部数据，articles传入了表格组件，帮你做了遍历，每一项数据插槽 row="每一项数据",
             使用每一项数据，其实是组件内部的数据，scope.row 获取 -->
            <el-image
              :src="scope.row.cover.images[0]"
              fit="cover"
              style="width:120px;height:80px"
            >
              <!-- 通过slot = error自定义加载失败图片显示 -->
              <div slot="error">
                <img
                  src="../../assets/images/error.gif"
                  style="width: 120px; height: 80px"
                  alt=""
                >
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status===0"
              type="info"
            >草稿"</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag
              v-if="scope.row.status===2"
              type="success"
            >审核通过</el-tag>
            <el-tag
              v-if="scope.row.status===3"
              type="warning"
            >审核失败</el-tag>
            <el-tag
              v-if="scope.row.status===4"
              type="danger"
            >已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px"
        >
          <template slot-scope="scope">
            <el-button
              @click="edit(scope.row.id)"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              @click="del(scope.row.id)"
              plain
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center; margin-top:30px;">
        <!-- :total="total" 指定总条数 -->
        <!-- 默认一页显示10条每页显示条目个数  :page-size="reqParams.per_page"-->
        <!-- @current-change="changePager"  页码改变事件 当前页变动时候触发的事件。 -->
        <!-- 更新过数据后  当前页码也需要修改  选中对应的按钮 current-page 当前页数-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size=" reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        >
        </el-pagination>
      </div>

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
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      channelOptions: [],
      // 日期数据
      dataArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  // computed 计算属性使用场景：当你需要一个新数据，需要依赖data中的数据。
  // watch 侦听器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大操作(异步操作)
  watch: {
    'reqParams.channel_id' (newValue) {
      if (newValue === '') {
        this.reqParams.channel_id = null
      }
    }
  },
  created () {
    // 频道下拉选项数据
    this.getChannelOptions()
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 日期选择后的事件
    changeDate (dataArr) {
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      // 筛选项双向绑定  拿着对应的数据发请求即可  注意：重新筛选后页码第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    // 改变分页事件对应函数
    changePager (newPage) {
      // 修改获取数据的页码
      // 提交当前页码给后台 才能获取对应的数据
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 频道下拉选项数据
    async getChannelOptions () {
      // const o = {data:{}};  const {data} = o;  一层解构  对象的结构一层
      // const res = {data:{data:{channels:[]}}}; 多层解构  const {data:{data:data}}
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 文章列表
    async getArticles () {
      // axios get传参  url?key=value&key1=value1 ... 麻烦
      // axios get传参  第二传参是对象 {params:指定传参对象}  发请求的时候自动拼接地址栏后
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 列表数据
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
