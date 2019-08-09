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
          @click="openDialog () "
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
              @click="toggleCollect(item)"
            ></span>
            <span
              class="el-icon-delete"
              @click="deleteImage(item.id)"
            ></span>
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
    <el-dialog
      title="添加素材"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <!-- 上传组件 -->
      <!-- action必选参数，上传的地址。上传图片的时候 headers设置上传的请求头部 加上认证信息 -->
      <!--on-success文件上传成功时的钩子(回调函数function(response, file, fileList))-->
      <!-- imageUrl 默认是null看到上传按钮,上传成功有值看到图片预览 -->
      <!-- name上传的文件字段名 后台需要的字段名称image -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click=" dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
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
      total: 0,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 上传组件的头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token} `
      },
      // 上传成功后的图片地址
      imageUrl: null
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  },
  methods: {
    // 删除素材
    deleteImage (id) {
      this.$confirm('亲，此操作将永久删除该素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          // 删除成功后提示信息
          this.$message.success('删除成功')
          // 获取素材列表
          this.getImages()
        })
        .catch(() => {})
    },
    // 添加收藏 取消收藏
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // console.log(data)
      // 更新当前图片状态
      item.is_collected = data.collect
      // 收藏成功提示信息
      this.$message.success(data.collect ? '收藏成功' : '收藏未成功')
    },
    // 上传成功的时候回调函数
    handleSuccess (res) {
      // 1. 获取图片地址显示img标签
      // console.log(res) res.data.url 图片地址
      this.imageUrl = res.data.url
      // 2. 提示上传成功
      this.$message.success('上传成功')
      // 3. 过2s后关闭对话框，更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      // 打开前清空预览的图片
      this.imageUrl = null
    },
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
