<template>
  <v-sheet min-width="25vh" rounded="lg">
    <v-list color="transparent">
      <v-list-item link color="grey lighten-2">
        <v-list-item-content>
          <v-list-item-title>公告?</v-list-item-title>
          <v-toolbar>^_^|||</v-toolbar>
          <!-- 分割线 -->
          <v-divider class="primary my-3"> </v-divider>
          <v-list-item-title>
            <div class="cateInfo">
              <!-- 近期发布 -->
              <div class="ontime"><span>近期发布:</span></div>
              <!-- 访问排行 -->
              <div class="onview"><span>访问排行:</span></div>
              <!-- 标签云 -->
              <div class="bq">
                <span>标签云:</span>
                <ul>
                  <li v-for="itme in Catelist" :key="itme.id" value="itme.name">
                    <v-btn
                      small
                      elevation="10"
                      class="btn"
                      @click="test(itme.name)"
                      >{{ itme.name }}</v-btn
                    >
                  </li>
                </ul>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>


<script>
export default {
  data() {
    return {
      Catelist: [],
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
    test(name) {
      this.$router.push(`cate/${name}`);
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
    border-radius: 10px;
    border: 1px solid;
    padding: 10px 0;
  }
  .onview {
    background: #e9b6ee;
    border-radius: 10px;
    border: 1px solid;
    padding: 10px 0;
  }
  .bq {
    background: #b6d8ee;
    border-radius: 10px;
    border: 1px solid;
    padding: 10px 0;
    .btn {
      margin: 2px 0;
    }
  }
  span {
    font-size: 18px;
    display: inline-block;
    padding: 8px 20px;
  }
}
</style>