<template>
  <div class="main">
    <div class="userInfo">
      <a-button type="danger" @click="loginOut" style="margin-right: 20px"
        >登出</a-button
      >
      <span>
        <a-button type="link">
          <a-badge :count="5" :overflow-count="99">
            <a-avatar icon="user" style="background: #92c068" :size="45"
          /></a-badge>
        </a-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut() {
      window.sessionStorage.clear('token'), this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.main {
}
.userInfo {
  float: right;
}
.showTime {
  background: pink;
  width: 200px;
}
</style>
