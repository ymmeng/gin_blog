<template>
  <a-anchor>
    <v-app-bar class="pl-160 pr-160">
      <div class="fz-32">
        <router-link to="/">幽梦</router-link>
      </div>
      <a-input-search
        v-model="value"
        placeholder="输入您要查找的文章标题"
        size="large"
        @search="searchArt"
        allowClear
        :loading="loading"
        class="search-box center-row"
      />
      <div v-if="true" class="r0">
        <v-btn
          text
          :title="i.title"
          @click="$router.push(i.link)"
          class="mr-5 fz-16"
          v-for="i in links"
          :key="i.title"
        >
          {{ i.title }}
        </v-btn>
      </div>
      <a-dropdown v-else placement="bottomRight">
        <div class="mr-10 cluster pointer r0">
          <a-avatar
            :size="40"
            src="http://192.168.58.111:6080/upload/2021-02-16/048e591e-6099-4368-ba70-a61ceb4ae91d.jpg"
          /><a-icon type="down" />
        </div>
        <a-menu slot="overlay" style="width: 156px">
          <a-menu-item v-for="menu in userMenu" :key="menu.name">
            <router-link :to="menu.href">
              <a-icon class="ml-3 pr-10" :type="menu.icon" />
              <span>{{ menu.name }}</span></router-link
            >
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </v-app-bar>
  </a-anchor>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    links: [
      { title: "登录", link: "/login" },
      { title: "注册", link: "/registered" },
    ],
    userMenu: [
      { icon: "user", name: "个人主页", href: "/my" },
      { icon: "setting", name: "账户设置", href: "/my/setting" },
      { icon: "picture", name: "免费图床", href: "/drawBed" },
      { icon: "logout", name: "退出登录", href: "/my" },
    ],
    value: "",
    loading: false,
  }),
  computed: {
    ...mapState(["queryParam"]),
  },
  methods: {
    // 搜索文章
    searchArt() {
      this.loading = true;
      this.$store.dispatch("getArtList", {
        title: this.value,
        pageSize: this.queryParam.PageSize,
        pageNum: this.queryParam.Current,
      });
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.search-box {
  width: 340px;
  transition: width;
  -webkit-transition: width 0.3s;
  &:hover {
    width: 436px;
  }
}
</style>