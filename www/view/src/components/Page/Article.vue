<template>
  <div>
    <ToTop></ToTop>
    <Header ></Header>
    <link
      href="https://cdn.bootcss.com/font-awesome/5.8.0/css/all.css"
      rel="stylesheet"
    />
    <a-layout>
      <div class="Cates">
        <div class="artInfo">
          <h1>{{ artInfo.title }}</h1>
          <span>发布时间：{{ artInfo.CreatedAt }}</span>
          <a :href="artInfo.Category.name"
            ><span>分类：{{ artInfo.Category.name }}</span></a
          >
          <span>浏览量：0</span>
          <p>文章描述：{{ artInfo.desc }}</p>
          <img v-if="artInfo.img" :src="artInfo.img" alt="正在加载图片..." />
        </div>
      </div>

      <v-app>
        <a-layout-content>
          <div class="art">
            <div>
              <v-md-editor 
                class="artContent"
                v-model="artInfo.content"
                mode="preview"
              ></v-md-editor>
            </div>
          </div>
        </a-layout-content>
        <Footer></Footer>
      </v-app>
    </a-layout>
  </div>
</template>
<script>
import ToTop from "../Utils/GotoTop";
import Header from "../Index/Header";
import Footer from "../Index/Footer";

export default {
  components: { ToTop, Header, Footer },
  props: ["id"],
  data() {
    return {
      artInfo: {
        id: 0,
        title: "",
        cid: undefined,
        desc: "",
        content: "",
        img: "",
        CreatedAt: "",
        Category: {
          id: 0,
          name: "",
        },
      },
    };
  },
  created() {
    if (this.id) {
      this.getArt(this.id);
    }
  },
  methods: {
    // 获取文章
    async getArt(id) {
      const { data: res } = await this.$http.get(`article/info/${id}`);
      if (res.status != 200) return this.$message.error(res.message);
      this.artInfo = res.data;

      let data = this.artInfo["CreatedAt"].substring(0, 10);
      let time = this.artInfo["CreatedAt"].substring(11, 19);
      this.artInfo["CreatedAt"] = data + " " + time;
    },
  },
};
</script>

<style lang="less" scoped >
.art {
  margin-left: 50%;
  transform: translatex(-50%);
  background-color: rgb(237, 240, 228);
  min-width: 521px;
  max-width: 1200px;

  .artContent {
    background-color: rgb(237, 240, 228);
  }
}
.Cates {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 520px;
  background-size: cover;
  .artInfo {
    margin-top: 20px;
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
}
</style>
