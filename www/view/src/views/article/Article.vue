<template>
  <div>
    <v-img class="Cates" :src="artInfo.img">
      <div class="artInfo">
        <!-- <v-alert> -->
        <h1>{{ artInfo.title }}</h1>
        <p>
          发布时间：{{ artInfo.CreatedAt | dataFormat("YYYY-MM-DD HH:mm:ss") }}
        </p>
        <v-btn text>分类：{{ artInfo.Category.name }}</v-btn>
        <span>浏览量：0</span>
        <p>文章描述：{{ artInfo.desc }}</p>
        <!-- </v-alert> -->
      </div>
    </v-img>
    <div id="main">
      <v-container class="my-3">
        <v-row>
          <v-col cols="2"> <NavL></NavL></v-col>
          <v-col>
            <template>
              <div class="art">
                <v-md-editor
                  class="artContent"
                  v-model="artInfo.content"
                  mode="preview"
                  >{{ artInfo.content }}</v-md-editor
                >
                <v-divider></v-divider>
                <Comment class="comment" @enlarge-text="asd($event)"> </Comment>
              </div>
            </template>
          </v-col>
          <v-col cols="2"> <NavR></NavR></v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import ToTop from "@/components/Utils/GotoTop";
import NavR from "@/components/Index/NavR";
import NavL from "@/components/Index/NavL";
import Comment from "@/views/comment/Comment";
export default {
  components: { ToTop, NavR, NavL, Comment },
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
      if (res.status != 200) {
        this.$router.push("/404");
        return this.$message.error(res.message);
      }
      this.artInfo = res.data;
    },
    asd() {
      console.log("子组建调用父组建");
    },
  },
};
</script>

<style lang="less" scoped >
#main {
  background-color: rgb(88, 125, 156);
  width: 100%;
}
.art {
  display: block;
  margin-left: 50%;
  border-radius: 10px;
  transform: translatex(-50%);
  width: 100%;
  background-color: rgb(240, 240, 240);
  .artContent {
    background-color: rgb(240, 240, 240);
  }
  .comment {
    padding: 0 30px;
  }
}
.Cates {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 666px;
  background-image: url("https://s3.ax1x.com/2021/02/01/yZeMCT.jpg");
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
