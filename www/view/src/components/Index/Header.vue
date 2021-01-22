<template>
  <!-- <div>
    <div class="header">
      <div id="logo"><a href="/">幽梦Blog</a></div>
      <div class="button">
        <a-button type="primary" style="margin-right: 20px" @click="login"
          >登录</a-button
        >
        <a-button type="info" @click="registered">注册</a-button>
      </div>
    </div>
  </div> -->
  <v-container class="py-0 fill-height">
    <div class="header">
      <div id="logo"><a href="/">幽梦Blog</a></div>
    </div>
    <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

    <v-spacer>
      <a-button type="primary" style="margin-right: 20px" @click="login"
        >登录</a-button
      >
      <a-button type="info" @click="registered">注册</a-button>
    </v-spacer>

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