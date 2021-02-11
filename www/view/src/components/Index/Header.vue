<template>
  <!-- <v-app-bar app color="#fff" flat> -->
  <v-app-bar color="#123456">
    <v-container class="py-0 fill-height">
      <div class="header">
        <div title="返回首页" id="logo"><a href="/">幽梦Blog</a></div>
      </div>
      <v-avatar class="mr-10" color="teal" size="42"
        ><a-icon type="user"
      /></v-avatar>

      <v-spacer>
        <v-btn
          :title="i.title"
          :color="i.color"
          @click="$router.push(i.link)"
          class="mr-5"
          v-for="i in links"
          :key="i.title"
        >
          {{ i.title }}
        </v-btn>
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
    links: [
      { title: "登录", link: "/login", color: "primary" },
      { title: "注册", link: "/registered", color: "info" },
      { title: "写文章", link: "/addArt", color: "waring" },
      { title: "图床", link: "/drawBed", color: "#ffceff" },
    ],
  }),
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