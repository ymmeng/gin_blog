<template>
  <div class="article">
    <!-- 文章列表 -->
    <section>
      <article id="art" v-for="itme in Artlist" :key="itme.ID">
        <a @click="art(itme.ID)">
          <div class="artInfo" :title="itme.title">
            <h1>{{ itme.title }}</h1>
            <span>{{ itme.CreatedAt | dataFormat('YYYY-MM-DD HH:SS:mm') }}</span>
            <p>{{ itme.desc }}</p>
          </div>
          <div class="img" v-if="itme.img">
            <img src="itme.img" alt="正在加载图片..." />
          </div>
        </a>
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
      Artlist: undefined,
      pageSizeOptions: ["1", "3", "5", "7", "10", "15"],
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
    border-radius: 10px;
    margin: 20px 0;
    padding: 20px;
    .img {
      height: 100px;
      width: 100%;
    }
    .artInfo {
      padding-bottom: 10px;
      text-align: center;
      h1 {
        font-size: 30px;
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
