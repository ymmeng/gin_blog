<template>
  <!-- <v-app-bar app color="#fff" flat> -->
  <v-app-bar color="#123456">
    <v-container class="py-0 fill-height">
      <div class="header">
        <div title="返回首页" id="logo"><a href="/">幽梦Blog</a></div>
      </div>
      <v-avatar class="mr-10" color="teal" size="42">1</v-avatar>

      <v-spacer>
        <v-btn title="登录" color="primary" @click="login" class="mr-5">
          登录
        </v-btn>
        <v-btn title="注册" @click="registered" class="mr-5"> 注册 </v-btn>
        <v-btn title="写文章" color="primary" @click="addArt"> 写文章 </v-btn>
      </v-spacer>

      <v-responsive max-width="260" id="search">
        <v-text-field dense flat hide-details rounded solo-inverted>
        </v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: ["首页", "关于", "博客", "更新"],
  }),
  methods: {
    login() {
      this.$router.push("/login");
    },
    registered() {
      this.$router.push("/registered");
    },
    addArt() {
      this.$router.push("/addArt");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 40px 0 40px;
  #logo {
    font-size: 30px;
  }
  .button {
    position: absolute;
    right: 40px;
  }
}
</style>