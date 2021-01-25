<template>
  <a-layout-header class="headerBtn">
    <div class="main">
      <div class="userInfo">
        <a-button type="danger" @click="loginOut" style="margin-right: 20px"
          >登出</a-button
        >
        <span>
          <a-button type="link">
            <a-badge :count="0" :overflow-count="99">
              <a-avatar icon="user" style="background: #92c068" :size="45"
            /></a-badge>
          </a-button>
        </span>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  methods: {
    loginOut() {
      window.sessionStorage.clear('token'), this.$router.push('/adminLogin')
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
.userInfo {
  float: right;
}
.showTime {
  background: pink;
  width: 200px;
}
.headerBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
