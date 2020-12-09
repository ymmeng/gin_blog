<template>
  <div class="main">
    <link
      href="https://cdn.bootcss.com/font-awesome/5.8.0/css/all.css"
      rel="stylesheet"
    />
    <a-layout>
      <a-layout-header
        class="header"
        :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
        ><Header></Header
      ></a-layout-header>

      <div class="Cates"></div>
      <a-layout class="body">
        <a-layout-content><Content></Content> </a-layout-content>
        <a-layout-sider><Nav></Nav> </a-layout-sider>
      </a-layout>
      <a-layout-footer>
        <ToTop></ToTop>
        <Footer></Footer
      ></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import ToTop from '../components/GotoTop'
import Content from '../components/Index/Content'
import Footer from '../components/Index/Footer'
import Header from '../components/Index/Header'
import Nav from '../components/Index/Nav'
export default {
  components: {
    Content,
    ToTop,
    Footer,
    Header,
    Nav,
  },
  data() {
    return {
      cates: 0,
    }
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main {
  height: 100%;
  width: 100%;
}
.header {
  background-color: rgba(255, 255, 255, 0.6);
}

.Cates {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 520px;
  background: url('../assets/img/bg.jpg');
}

.body {
  margin: 0 10%;
  display: flex;
  min-width: 1024px;
}
</style>
