<template>
  <a-card>
    <div>
      <h1 id="title">
        {{ artInfo.id ? '修改文章' : '添加新的文章' }}
      </h1>
    </div>
    <a-form-model :model="artInfo" ref="artInfoRef" :rules="artInfoRules">
      <!-- 文章标题 -->
      <a-form-model-item label="文章标题" prop="title" class="bt">
        <a-input style="width: 600px" v-model="artInfo.title"></a-input
      ></a-form-model-item>
      <!-- 文章分类 -->
      <a-form-model-item label="文章分类" prop="cid">
        <a-select
          v-model="artInfo.cid"
          style="width: 300px"
          placeholder="请选择文章分类"
          @change="cateChange"
        >
          <a-select-option
            v-for="item in Carelist"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="文章描述" prop="desc">
        <a-input type="textarea" v-model="artInfo.desc"></a-input>
      </a-form-model-item>
      <!-- 文章缩略图 -->
      <a-form-model-item label="文章缩略图"
        ><p style="color: #999">
          图片大小5M以内(支持jpg、png、gif、jpeg、swf、svg格式)
        </p>
        <a-upload
          :multiple="true"
          :action="upUrl"
          :headers="headers"
          @change="upChange"
          list-type="picture-card"
          data:{inputType="importValue}"
          accept=".jpg,.png,.gif,.jpeg,.swf,.svg"
        >
          <a-button name="file">
            <a-icon type="upload" /> 点击上传缩略图
          </a-button>
        </a-upload>
      </a-form-model-item>
      <!-- 文章内容 -->
      <a-form-model-item label="文章内容" prop="content">
        <!-- 选择编辑器 -->
        <div>
          <a-select
            v-model="editValue"
            style="width: 249px"
            @change="SelectEditChange"
          >
            <a-select-option value="v-md-editor"
              >v-md-editor编辑器</a-select-option
            >
            <a-select-option value="mavon-editor"
              >mavon-editor编辑器</a-select-option
            >
          </a-select>
        </div>
        <div class="editor">
          <!-- v-md-editor编辑器 -->
          <v-md-editor
            v-if="editValue == 'v-md-editor'"
            v-model="artInfo.content"
            :disabled-menus="[]"
            :include-level="[2, 3, 4]"
            @upload-image="handleUploadImage"
            height="700px"
          ></v-md-editor>

          <!-- mavon-editor编辑器 -->
          <mavon-editor
            v-if="editValue == 'mavon-editor'"
            v-model="artInfo.content"
            ref="md"
            @imgAdd="$imgAdd"
            style="z-index: 0; height: 700px"
          ></mavon-editor>
        </div>
      </a-form-model-item>
      <hr />
      <!-- 按钮 -->
      <a-form-model-item class="butdiv">
        <a-button type="primary" @click="artOk(artInfo.id)" id="buttonY">
          {{ artInfo.id ? '更新' : '提交' }}</a-button
        >
        <a-button type="danger" @click="artCancel()" id="buttonN"
          >清空</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { Url } from '../../plugin/http'
export default {
  props: ['id'],
  data() {
    return {
      editValue: 'v-md-editor',
      artInfo: {
        id: 0,
        title: '',
        cid: undefined,
        desc: '',
        content: '',
        img: '',
      },
      Carelist: [],
      upUrl: Url + '/upload',
      headers: {},
      artInfoRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '文章题目在1~50个字符之间',
            trigger: 'blur',
          },
        ],
        cid: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
        desc: [
          { required: true, message: '请对该文章进行描述', trigger: 'blur' },
          {
            min: 4,
            max: 200,
            message: '文章描述在4~200个字符之间',
            trigger: 'blur',
          },
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          {
            min: 18,
            message: '文章内容最少为18个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getCateList()
    this.headers = {
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    }
    if (this.id) {
      this.getCateInfo(this.id)
    }
  },
  methods: {
    // 枚举选择
    SelectEditChange(value) {
      this.editValue = `${value}`
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      axios({
        url: 'upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, url)
      })
    },
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      insertImage({
        url:
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg',
        desc: files[0].name,
      })
    },
    // 图片上传
    async beforeUpload(file) {
      const isLt5M = (await file.size) / 1024 < 1024
      if (!isLt5M) {
        message.error(file.name + '文件大小超出限制，请重新上传', 2)
        return false
      } else {
        return true
      }
    },
    // 查询文章信息
    async getCateInfo(id) {
      const { data: res } = await this.$http.get(`article/info/${id}`)
      if (res.status != 200) return this.$message.error(res.message)
      this.artInfo = res.data
      this.artInfo.id = res.data.ID
    },
    // 获取分类
    async getCateList() {
      const { data: res } = await this.$http.get('categorys')
      if (res.status != 200) return this.$message.error(res.message)
      this.Carelist = res.data
    },
    // 选择分类
    cateChange(value) {
      this.artInfo.cid = value
    },
    // 上传
    upChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        this.$message.success(info.file.response.message)
        const imgUrl = info.file.response.url
        this.artInfo.img = imgUrl
      } else if (info.file.status === 'error') {
        this.$message.error(info.file.response.message)
      }
    },
    // 提交文章
    artOk(id) {
      this.$refs.artInfoRef.validate(async (valid) => {
        if (!valid)
          return this.$message.error('您输入的内容不符，请检查后重新输入')
        if (id == 0) {
          const { data: res } = await this.$http.post(
            'article/add',
            this.artInfo
          )
          if (res.status != 200) return this.$message.error(res.message)
          this.$router.push('/admin/artlist')
          this.$message.success('添加文章成功')
        } else {
          const { data: res } = await this.$http.put(
            `article/${id}`,
            this.artInfo
          )
          if (res.status != 200) return this.$message.error(res.message)
          this.$router.push('/admin/artlist')
          this.$message.success('更新文章成功')
        }
      })
    },
    artCancel() {
      this.$refs.artInfoRef.resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
#title {
  font-size: 30px;
  text-align: center;
}
a-card {
  h1 {
    font-size: 24px;
  }
}
hr {
  border-top: 1px dashed #c5c5c5;
}
.butdiv {
  padding-top: 30px;
}
#buttonY {
  margin: 0 30px 0;
  border: 1px solid transparent;
  background: linear-gradient(white, rgb(59, 111, 255)) padding-box,
    repeating-linear-gradient(
        -45deg,
        rgb(59, 111, 255) 0,
        black 25%,
        white 0,
        white 50%
      )
      0 / 0.6em 0.6em;
  animation: ants 8s linear infinite;
}
#buttonN {
  border: 1px solid transparent;
  background: linear-gradient(white, rgb(255, 0, 0)) padding-box,
    repeating-linear-gradient(
        -45deg,
        rgb(255, 59, 59) 0,
        black 25%,
        white 0,
        white 50%
      )
      0 / 0.6em 0.6em;
  animation: ants 8s linear infinite;
}
@keyframes ants {
  to {
    background-position: 100%;
  }
}
.editor {
  padding-top: 30px;
}
</style>
