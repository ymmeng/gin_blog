<template>
  <a-layout-sider breakpoint="lg" v-model="collapsed">
    <div class="log">
      <span>{{ collapsed ? '幽' : '幽梦 Blog' }}</span>
    </div>

    <a-menu theme="dark" mode="inline" @click="goToPage">
      <a-menu-item :key="item.key" v-for="item in menuItems"
        ><a-icon :type="item.icon" /><span>{{ item.name }}</span></a-menu-item
      >
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      menuItems: [
        {
          key: 'index',
          name: '仪表盘',
          icon: 'dashboard',
        },
        {
          key: 'addart',
          name: '写文章',
          icon: 'form',
        },
        {
          key: 'artlist',
          name: '文章列表',
          icon: 'ordered-list',
        },
        {
          key: 'catelist',
          name: '分类列表',
          icon: 'book',
        },
        {
          key: 'userlist',
          name: '用户列表',
          icon: 'user',
        },
        {
          key: 'drawbed',
          name: '图床列表',
          icon: 'picture',
        },
      ],
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
