<template>
  <!-- <v-app-bar app color="#fff" flat> -->
  <a-anchor>
    <v-app-bar class="blue accent-1">
      <v-container class="py-0 fill-height">
        <div class="header">
          <div title="返回首页" id="logo"><a href="/">幽梦Blog</a></div>
        </div>
        <v-avatar
          class="mr-10 cluster pointer"
          color="teal"
          size="42"
          @click="$router.push('/my')"
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
        <a-input-search
          v-model="value"
          placeholder="输入您要查找的文章标题"
          size="large"
          @search="onSearch"
          allowClear
          :loading="loading"
          class="search-box rounded-search-box"
        >
        </a-input-search>
      </v-container>
    </v-app-bar>
  </a-anchor>
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
    value: "",
    loading: false,
  }),
  methods: {
    onSearch() {
      console.log(this.value);
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
.search-box {
  width: 240px;
  transition: width;
  -webkit-transition: width 0.4s;
  &:hover {
    width: 306px;
  }
}
</style>