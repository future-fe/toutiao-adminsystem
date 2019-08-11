<template>
  <div class='publish-container'>
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title"
                    style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content"
                        :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type"
                          @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 单图
          双向绑定:父传子：父组件data里数据传给子组件，数据为null时，图片按钮显示默认图片
          子传父：子组件进行了上传图片。数据发生了改变。父组件进行接收数据,提交表单-->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三图 -->
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 发布文章时articleId为null -->
        <el-form-item v-if="!articleId">
          <el-button type="primary"
                     @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary"
                     @click="update(false)">发表</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          // 数组长度 如果是单图为1  如果是三图为3
          images: []
        },
        channel_id: null
      },
      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      // 文章ID
      articleId: null
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 可能拿不到 当你是发布时
    // 获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    $route () {
      // 监听一种  有修改切换到发布
      this.articleId = null
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度 如果是单图为1  如果是三图为3
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 修改文章
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '修改存入草稿成功' : '文章修改成功')
      // 去内容管理
      this.$router.push('/article')
    },
    // 获取文章数据
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 重置图片数据
    changeType () {
      this.articleForm.cover.images = []
    },
    // 发表和存入草稿
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      // 去内容管理页
      this.$router.push('article')
    }
  }
}
</script>

<style scoped lang='less'>
</style>
