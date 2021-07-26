<template>
  <a-layout-footer breakpoint="lg" v-model="collapsed">
    <div class="footer">
      <span> --- 幽梦-Blog 后台管理 ---</span>
    </div>
  </a-layout-footer>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    }
  },
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  font-size: 13px;
}
</style>
