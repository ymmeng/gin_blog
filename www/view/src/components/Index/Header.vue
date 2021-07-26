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
      <a-popover v-if="token" placement="bottomRight" class="pointer r0 pr-5">
        <template slot="title">
          <span>admin</span>
        </template>
        <template slot="content">
          <div v-for="menu in userMenu" :key="menu.name">
            <router-link :to="menu.href">
              <a-icon class="pr-10 mb-15" :type="menu.icon" />
              <span>{{ menu.name }}</span></router-link
            >
          </div>
          <div @click="loginOut" class="pointer red--text">
            <a-icon class="pr-10" type="logout" />
            <span>退出登录</span>
          </div>
        </template>
        <a-avatar
          :size="40"
          src="https://s3.ax1x.com/2020/12/06/DXIfv8.jpg"
        /><a-icon type="down" />
      </a-popover>
      <div v-else class="r0">
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
      { icon: "setting", name: "写文章", href: "/addArt" },
      { icon: "picture", name: "免费图床", href: "/drawBed" },
    ],
    value: "",
    loading: false,
  }),
  computed: {
    ...mapState(["queryParam", "token", "userInfo"]),
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
    // 退出登录
    loginOut() {
      window.sessionStorage.clear("token");
      this.$message.success("注销成功!");
      this.$router.push("/");
      location.reload();
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