<template>
  <div>
    <div v-if="ArtList.data != 0">
      <!-- 文章列表 -->
      <section>
        <article
          id="art"
          class="pa-5 mb-5 pointer radius-8 border"
          v-for="itme in ArtList.data"
          :key="itme.ID"
        >
          <v-row
            @click="$router.push(`/article/${itme.ID}`)"
            :title="itme.title"
          >
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
          :total="total"
          @change="pageChange"
          @showSizeChange="pageChange"
        >
        </a-pagination>
      </div>
    </div>
    <div v-else>
      <v-sheet rounded="lg">
        <h1 class="text-center pa-4">空空如也...</h1>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapState(["ArtList", "total", "pageSizeOptions", "queryParam"]),
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
      if (this.id) {
        this.getArtListByClass(this.id);
      } else {
        this.getArtList();
      }
    },
    // 获取指定分类下的所有文章
    getArtListByClass(id) {
      this.$store.dispatch("getArtListByClass", {
        title: this.queryParam.title,
        pageSize: this.queryParam.PageSize,
        pageNum: this.queryParam.Current,
        id: id,
      });
    },
    // 获取所有文章
    getArtList() {
      this.$store.dispatch("getArtList", {
        title: this.queryParam.title,
        pageSize: this.queryParam.PageSize,
        pageNum: this.queryParam.Current,
      });
    },
  },
};
</script>
