<template>
  <v-app>
    <Header></Header>
    <div class="Cates">
      <div class="artInfo">
        <v-alert>
          <h1>{{ artInfo.title }}</h1>
          <p>
            发布时间：{{
              artInfo.CreatedAt | dataFormat("YYYY-MM-DD HH:mm:ss")
            }}
          </p>
          <v-btn text>分类：{{ artInfo.Category.name }}</v-btn>
          <span>浏览量：0</span>
          <p>文章描述：{{ artInfo.desc }}</p>
        </v-alert>
        <img v-if="artInfo.img" :src="artInfo.img" alt="正在加载图片..." />
      </div>
    </div>
    <div id="main">
      <v-container class="my-3">
        <v-row>
          <v-col cols="2"> <NavL></NavL></v-col>
          <v-col>
            <div class="art">
              <v-md-editor
                class="artContent"
                v-model="artInfo.content"
                mode="preview"
                >{{ artInfo.content }}</v-md-editor
              >
            </div>
          </v-col>
          <v-col cols="2"> <NavR></NavR></v-col>
        </v-row>
      </v-container>
    </div>
    <Footer></Footer>
  </v-app>
</template>
<script>
import ToTop from "../Utils/GotoTop";
import Header from "../Index/Header";
import Footer from "../Index/Footer";
import NavR from "../../components/Index/NavR";
import NavL from "../../components/Index/NavL";
export default {
  components: { ToTop, Header, Footer, NavR, NavL },
  props: ["id"],
  data() {
    return {
      artInfo: { Category: {} },
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
    },
  },
};
</script>

<style lang="less" scoped >
#main {
  background-color: rgb(156, 109, 88);
  width: 100%;
}
.art {
  margin-left: 50%;
  transform: translatex(-50%);
  width: 100%;
  .artContent {
    background-color: rgb(240, 240, 240);
  }
}
.Cates {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 520px;
  background-image: url("https://s3.ax1x.com/2021/02/01/yZeMCT.jpg");
  background-size: 100%;
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
