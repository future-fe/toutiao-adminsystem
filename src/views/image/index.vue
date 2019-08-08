<template>
  <div class='container'>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group
          v-model="reqParams.collect"
          size="small"
          @change="changeCollect"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          style="float:right"
          size="small"
        >添加素材</el-button>
      </div>
      <div class="img_list">
        <div
          class="img_item"
          v-for="item in images"
          :key="item.id"
        >
          <img
            :src="item.url"
            alt=""
          >
          <!-- 对操作栏进行 全部 显示   收藏 隐藏控制 -->
          <div
            class="foot"
            v-show="!reqParams.collect"
          >
            <span
              class="el-icon-star-off"
              :class="{selected:item.is_collected}"
            ></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.reqPper_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交参数
      reqParams: {
        // 默认值 全部
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  },
  methods: {
    // 改变分页事件对应函数
    changePager (newPage) {
      // 修改获取数据的页码
      // 提交当前页码给后台 才能获取对应的数据
      this.reqParams.page = newPage
      this.getImages()
    },
    // 改变全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给素材列表
      this.images = data.results
      // 总条数赋值
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
