<template>
  <div class="article">
    <!-- 文章列表 -->
    <section>
      <article id="art" v-for="itme in Artlist" :key="itme.ID">
        <v-row @click="$router.push(`/article/${itme.ID}`)" :title="itme.title">
          <v-col class="col-4">
            <v-img
              class="art-img"
              :src="itme.img"
              alt="正在加载图片..."
              :aspect-ratio="20 / 9"
              min-height="160"
            ></v-img>
          </v-col>
          <v-col>
            <div class="artInfo">
              <h1>{{ itme.title }}</h1>
              <span>{{
                itme.CreatedAt | dataFormat("YYYY-MM-DD HH:mm:ss")
              }}</span>
              <div>
                <v-btn text> {{ itme.Category.name }}</v-btn>
              </div>
              <p>{{ itme.desc }}</p>
            </div>
          </v-col>
        </v-row>
      </article>
    </section>
    <!-- <button-counter></button-counter> -->
    <!-- 分页 -->
    <div class="page">
      <a-pagination
        show-quick-jumper
        show-size-changer
        :page-size-options="pageSizeOptions"
        :page-size="queryParam.PageSize"
        :total="queryParam.total"
        @change="pagChange"
        @showSizeChange="onShowSizeChange"
      >
      </a-pagination>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { ApiArticles } from "@/request/http";

// Vue.component('button-counter', {
//   data: function () {
//     return {
//       count: 0
//     }
//   },
//   template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
// })

export default Vue.extend({
  props: ["id"],
  data() {
    return {
      Artlist: {},
      pageSizeOptions: ["3", "5", "7", "10", "15"],
      queryParam: { title: "", PageSize: 7, Current: 1, total: 0 },
    };
  },
  mounted() {
    this.getArtList();
  },
  methods: {
    // 改变多少条每页时候执行
    onShowSizeChange(current, pageSize) {
      this.queryParam.PageSize = pageSize;
      this.getArtList();
    },
    // 改变分页时执行
    pagChange(pageNumber) {
      this.queryParam.Current = pageNumber;
      this.getArtList();
    },
    // 获取所有文章
    async getArtList() {
      // ApiArticles(this.queryParam.PageSize, this.queryParam.Current).then(
      //   (res) => {
      //     console.log(res);
      //     this.Artlist = res.data;
      //     this.queryParam.total = res.total;
      //   }
      // );
      const { data: res } = await this.$http.get("articles", {
        params: {
          title: this.queryParam.title,
          pageSize: this.queryParam.PageSize,
          pageNum: this.queryParam.Current,
        },
      });
      if (res.status != 200) return this.$message.error(res.message);
      this.Artlist = res.data;
      this.queryParam.total = res.total;
    },
  },
});
</script>


<style lang="less" scoped>
.article {
  width: 100%;
  margin: 0 auto;
  #art {
    width: 100%;
    height: 200px;
    background: rgba(228, 233, 240, 0.6);
    border-radius: 8px;
    margin: 0 0 20px 0;
    padding: 20px;
    cursor: pointer;
    .art-img {
      max-height: 100px;
    }
    .artInfo {
      padding-bottom: 10px;
      h1 {
        font-size: 25px;
        color: #007;
      }
    }
  }
  .page {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
  }
}
</style>
