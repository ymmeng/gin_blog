<template>
  <v-sheet class="pa-5" min-width="25vh" rounded="lg">
    <v-list-item-title>公告?</v-list-item-title>
    <v-toolbar>^_^|||</v-toolbar>
    <!-- 分割线 -->
    <v-divider class="primary my-3"> </v-divider>
    <div class="cateInfo">
      <!-- 近期发布 -->
      <div class="ontime mb-5"><span class="ml-5">近期发布:</span></div>
      <!-- 访问排行 -->
      <div class="onview mb-5"><span class="ml-5 text-h6">访问排行:</span></div>
      <!-- 标签云 -->
      <div class="bq">
        <p>标签云:</p>
        <a-tag
          v-for="itme in Catelist"
          :key="itme.id"
          class="ma-1 pointer"
          @click="$router.push(`/cateList/${itme.id}`)"
          :color="colors[Math.floor(Math.random() * colors.length)]"
        >
          {{ itme.name }}
        </a-tag>
      </div>
    </div>
  </v-sheet>
</template>


<script>
const colors = [
  "pink",
  "red",
  "orange",
  "green",
  "#ff9274",
  "#cfd48d",
  "#67c4c7",
  "#b6eebf",
  "#e9b6ee",
  "#e8899e",
  "blue",
  "purple",
];
export default {
  data() {
    return {
      Catelist: [],
      colors,
    };
  },

  created() {
    this.getCateList();
  },
  methods: {
    // 获取所有分类
    async getCateList() {
      const { data: res } = await this.$http.get("categorys");
      if (res.status != 200) return this.$message.error(res.message);
      this.Catelist = res.data;
      this.cates = res.total;
    },
  },
};
</script>


<style lang="less" scoped>
v-sheet {
  display: block;
  padding-bottom: 30px;
}
.cateInfo > {
  .ontime {
    background: #b6eebf;
    border-radius: 8px;
    border: 1px solid;
    padding: 10px 0;
  }
  .onview {
    background: #e9b6ee;
    border-radius: 8px;
    border: 1px solid;
    padding: 10px 0;
  }
  .bq {
    background: #b6d8ee;
    border-radius: 8px;
    border: 1px solid;
    padding: 10px 0;
    .btn {
      margin: 2px 0;
    }
  }
  p {
    font-size: 18px;
    padding: 8px 20px;
  }
}
</style>