<template>
  <div>
    <!-- 文章列表 -->
    <section>
      <article
        id="art"
        class="blue lighten-3 pa-5 mb-5 pointer radius-8"
        v-for="itme in Artlist"
        :key="itme.ID"
      >
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
              <h1 class="text-h5">{{ itme.title }}</h1>
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
    <div class="page justify-center d-flex mb-10">
      <a-pagination
        show-quick-jumper
        show-size-changer
        :page-size-options="pageSizeOptions"
        :page-size="queryParam.PageSize"
        :total="queryParam.total"
        @change="pageChange"
        @showSizeChange="pageChange"
      >
      </a-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      Artlist: {},
      pageSizeOptions: ["3", "5", "7", "10", "15"],
      queryParam: { title: "", PageSize: 7, Current: 1, total: 0 },
    };
  },
  created() {
    if (this.id) {
      this.getArtListByClass(this.id);
    } else {
      this.getArtList();
    }
  },
  methods: {
    // 改变多少条每页时候执行
    pageChange(pageNumber, pageSize) {
      this.queryParam.Current = pageNumber;
      this.queryParam.PageSize = pageSize;
      this.getArtList();
    },
    // 获取指定分类下的所有文章
    async getArtListByClass(id) {
      const { data: res } = await this.$http.get(`article/catelist/${id}`, {
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
    // 获取所有文章
    async getArtList() {
      const { data: res } = await this.$http.get("/articles", {
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
};
</script>
