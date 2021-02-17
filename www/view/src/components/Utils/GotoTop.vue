<template>
  <a-back-top :visibilityHeight="521">
    <a-tooltip placement="bottom" title="回到顶部">
      <div class="ant-back-top-inner">
        <img
          src="http://192.168.58.111:6080/upload/2021-02-17/df6e8dae-695f-4a30-a6f7-fa436e1613c5.png"
      /></div>
    </a-tooltip>
  </a-back-top>
</template>

<style lang="less" scoped>
.ant-back-top {
  bottom: 100px;
}
.ant-back-top-inner {
  position: fixed;
  top: -108px;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>