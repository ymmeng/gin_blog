<template>
  <div>
    <a-back-top :visibilityHeight="521">
      <div class="ant-back-top-inner" style="top: -72px">
        <picture
          ><source
            srcset="
              https://cdn.jsdelivr.net/gh/DIYgod/diygod.me@gh-pages/images/scroll.webp
            "
            type="image/webp" />
          <img
            src="https://cdn.jsdelivr.net/gh/DIYgod/diygod.me@gh-pages/images/scroll.png"
        /></picture>
      </div>
    </a-back-top>
  </div>
</template>

<style lang="less" scoped>
  .ant-back-top {
    bottom: 100px;
  }
  .ant-back-top-inner {
    position: fixed;
    img {
      height: 100%;
      width: 100%;
    }
  }
</style>