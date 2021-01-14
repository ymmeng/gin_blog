<template>
  <div>
    <a-layout>
      <a-layout-header
        class="header"
        :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
      >
        <Header></Header>
      </a-layout-header>
      <div class="Cates"></div>
      <a-layout-content>
        <div class="art">
          <div class="artInfo">
            <h1>{{ artInfo.title }}</h1>
            <span>发布时间：{{ artInfo.CreatedAt }}</span>
            <a :href="artInfo.Category.name"
              ><span>分类：{{ artInfo.Category.name }}</span></a
            >
            <span>浏览量：</span>
            <p>文章描述：{{ artInfo.desc }}</p>
            <img v-if="artInfo.img" :src="artInfo.img" alt="正在加载图片..." />
          </div>
          <div>
            <v-md-editor
              class="artContent"
              :value="artInfo.content"
              mode="preview"
            ></v-md-editor>
          </div>
        </div>
      </a-layout-content>

      <a-layout-footer>
        <ToTop></ToTop>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import ToTop from './GotoTop'
import Header from './Index/Header'
import Footer from './Index/Footer'

export default {
  components: { ToTop, Header, Footer },
  props: ['id'],
  data() {
    return {
      artInfo: {
        id: 0,
        title: '',
        cid: undefined,
        desc: '',
        content: '',
        img: '',
        Category: {
          id: 0,
          name: '',
        },
      },
      test: undefined,
    }
  },
  created() {
    if (this.id) {
      this.getArt(this.id)
    }
  },
  methods: {
    // 获取文章
    async getArt(id) {
      const { data: res } = await this.$http.get(`article/info/${id}`)
      if (res.status != 200) return this.$message.error(res.message)
      this.artInfo = res.data
    },
  },
}
</script>

<style lang="less" scoped >
.header {
  background-color: rgba(255, 255, 255, 0.6);
}
.art {
  margin-left: 50%;
  transform: translatex(-50%);
  background-color: rgb(237, 240, 228);
  min-width: 521px;
  max-width: 1024px;
  .artInfo {
    text-align: center;
    h1 {
      font-size: 34px;
    }
    img {
      width: 700px;
    }
    span {
      margin-left: 30px;
    }
  }
  .artContent {
    background-color: rgb(237, 240, 228);
  }
}
.Cates {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 520px;
  background: url('../assets/img/bg.jpg');
  background-size: cover;
}
</style>