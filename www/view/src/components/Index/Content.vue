<template>
  <div class="article">
    <!-- 文章列表 -->
    <section>
      <article id="art" v-for="itme in Artlist" :key="itme.ID">
        <v-row @click="art(itme.ID)" :title="itme.title">
          <v-col class="col-4">
            <v-img
              src="https://s3.ax1x.com/2020/12/06/DXIR8P.jpg"
              alt="正在加载图片"
              :aspect-ratio="20 / 9"
              max-height="260"
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
export default {
  data() {
    return {
      Artlist: {},
      pageSizeOptions: ["3", "5", "7", "10", "15"],
      queryParam: { title: "", PageSize: 7, Current: 1, total: 0 },
    };
  },
  props: ["id"],

  created() {
    this.getArtList();
  },
  methods: {
    // 改变多少条每页时候执行
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
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
    // 跳转到指定文章页面
    art(id) {
      this.$router.push(`/article/${id}`);
      
    },
  },
};
</script>


<style lang="less" scoped>
.article {
  width: 100%;
  margin: 0 auto;
  #art {
    width: 100%;
    height: 200px;
    background: rgb(237, 240, 228);
    border-radius: 8px;
    margin: 0 0 20px 0;
    padding: 20px;
    cursor: pointer;
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
