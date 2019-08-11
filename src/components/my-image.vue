<template>
  <div class='my-image'>
    <!-- 图片按钮 -->
    <div class="img-btn">
      <img :src="value||defaultImage"
           @click="openDialog()"
           alt="">
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible"
               width="750px">
      <el-tabs v-model="activeName"
               type="card">
        <el-tab-pane label="素材库"
                     name="image">
          <!-- 单选框 -->
          <el-radio-group v-model="reqParams.collect"
                          size="small"
                          @change="collectChange">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->
          <div class="img-list">
            <div class="img-item"
                 v-for="item in images"
                 :class="{selected:selectedImageUrl===item.url}"
                 @click="selectedImage(item.url)"
                 :key="item.id">
              <img :src="item.url"
                   alt="">
            </div>
          </div>
          <!-- 分页组件 -->
          <el-pagination v-if="total > reqParams.per_page"
                         background
                         layout="prev, pager, next"
                         :page-size="reqParams.per_page"
                         :current-page="reqParams.page"
                         @current-change="changePager"
                         :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片"
                     name="upload">
          <el-upload class="avatar-uploader"
                     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                     :show-file-list="false"
                     :on-success="handleSuccess"
                     :headers="uploadHeaders"
                     name="image">
            <img v-if="uploadImageUrl"
                 :src="uploadImageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
import store from '@/store'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡 选项卡name的值
      activeName: 'image',
      // 获取素材列表时传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表数据
      images: [],
      total: 0,
      // 记录选中的图片地址
      selectedImageUrl: null,
      // 上传头部
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传的图片地址
      uploadImageUrl: null,
      // 封面图片地址
      // vue-cli 3.0 基于 webpack , 打包所有的资源 , 如果 src 绑定的数据 ，是不会去打包背后资源的。
      // src url 指定资源  js文件 import 资源   主动通过import导入，webpack进行打包
      // 网络路径就没关系。
      // value: defaultImage
      defaultImage
    }
  },
  methods: {
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      // 获取素材列表数据
      this.getImages()
      // 清空之前选中或者上传的图片地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
    },
    // 确认图片
    confirmImage () {
      // 让图片按钮能够显示你选中的或者上传的图片地址。
      if (this.activeName === 'image') {
        // 如果是 素材  使用 selectedImageUrl 做为封面图
        // if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 如果是 上传图片  使用 uploadImageUrl 做为封面图
        // if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 成功上传成功
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 获取素材列表数据
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 改变分页事件对应函数
    changePager (newPage) {
      // 修改获取数据的页码
      // 提交当前页码给后台 才能获取对应的数据
      this.reqParams.page = newPage
      this.getImages()
    },
    // 改变全部与收藏
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  // 以下选中样式
  position: relative;
  &.selected {
    &::after {
      // .img-item.selected::after{}
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5) url('../assets/images/selected.png')
        no-repeat center/50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
