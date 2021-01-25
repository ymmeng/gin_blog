<template>
  <a-layout-footer breakpoint="lg" v-model="collapsed">
    <div>
      <span class="footer"> --- Go-Blog 管理后台 ---</span>
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
