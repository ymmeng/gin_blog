<template>
  <div class="main">
    <h1>后台数据展示</h1>
    <div class="info"></div>
  </div>
</template>
<script src="js/echarts.min.js"></script>
<script src="js/index.js"></script>
<script>
export default {}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  position: relative;
}
.main h1 {
  text-align: center;
  line-height: 50px;
  font-size: 30px;
}
.box {
  min-height: 300px;
  height: 50%;
  width: 100%;
  background: pink;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

