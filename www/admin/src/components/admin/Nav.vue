<template>
  <a-layout-sider breakpoint="lg" v-model="collapsed">
    <div class="log">
      <span>{{ collapsed ? '幽' : '幽梦 Blog' }}</span>
    </div>

    <a-menu theme="dark" mode="inline" @click="goToPage">
      <a-menu-item key="index"
        ><a-icon type="dashboard" /><span>仪表盘</span></a-menu-item
      >

      <a-menu-item key="addart"
        ><a-icon type="form" /><span>写文章</span></a-menu-item
      >
      <a-menu-item key="artlist"
        ><a-icon type="ordered-list" /><span>文章列表</span></a-menu-item
      >

      <a-menu-item key="catelist"
        ><a-icon type="book" /><span>分类列表</span></a-menu-item
      >
      <a-menu-item key="userlist"
        ><a-icon type="user" /><span>用户列表</span></a-menu-item
      >
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    }
  },
  methods: {
    goToPage(item) {
      this.$router.push('/' + item.key).catch((err) => err)
    },
  },
}
</script>

<style scoped>
.log {
  height: 32px;
  margin: 20px;
  color: #eff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: 1px solid transparent;
  background: linear-gradient(rgb(1, 0, 0), rgb(0, 0, 0)) padding-box,
    repeating-linear-gradient(-45deg, black 0, black 25%, white 0, white 50%) 0 /
      0.6em 0.6em;
  animation: ants 12s linear infinite;
}
@keyframes ants {
  to {
    background-position: 100%;
  }
}
</style>
