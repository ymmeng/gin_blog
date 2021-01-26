<template>
  <v-container class="py-0 fill-height">
    <div class="header">
      <div id="logo"><a href="/">幽梦Blog</a></div>
    </div>
    <v-avatar class="mr-10" color="teal" size="42">1</v-avatar>

    <v-spacer>
      <v-btn color="primary" @click="login" class="mr-5">
        登录
      </v-btn>

      <v-btn @click="registered"> 注册 </v-btn>
    </v-spacer>

    <v-spacer> </v-spacer>

    <v-responsive max-width="260" id="search">
      <v-text-field dense flat hide-details rounded solo-inverted>
      </v-text-field>
    </v-responsive>
  </v-container>
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