<template>
  <div>
    <div class="header">
      <div id="logo"><a href="/">幽梦Blog</a></div>
      <div class="button">
        <a-button type="primary" style="margin-right: 20px" @click="login"
          >登录</a-button
        >
        <a-button type="info" @click="registered">注册</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    registered() {
      this.$router.push('/registered')
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 0 40px 0 40px;
  position: relative;
  #logo {
    position: absolute;
    font-size: 30px;
  }
  .button {
    position: absolute;
    right: 40px;
  }
}
</style>