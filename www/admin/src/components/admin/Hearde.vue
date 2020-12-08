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
    <div class="showTime"></div>
  </div>
</template>

<script>
// var t = null
// t = setTimeout(time, 0) // 開始运行
// function time() {
//   clearTimeout(t) // 清除定时器
//   dt = new Date()
//   var y = dt.getFullYear()
//   var mt = dt.getMonth() + 1
//   var day = dt.getDate()
//   var h = dt.getHours() // 获取时
//   var m = dt.getMinutes() // 获取分
//   var s = dt.getSeconds() // 获取秒
//   document.querySelector('.showTime').innerHTML =
//     '当前时间：' +
//     y +
//     '年' +
//     mt +
//     '月' +
//     day +
//     '-' +
//     h +
//     '时' +
//     m +
//     '分' +
//     s +
//     '秒'
//   t = setTimeout(time, 1000) // 设定定时器，循环运行
// }
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
