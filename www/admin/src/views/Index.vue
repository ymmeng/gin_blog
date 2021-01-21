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
      >
        <Header></Header>
      </a-layout-header>

      <div class="cates"></div>

      <a-layout class="body">
        <a-layout-content id="content"><Content></Content> </a-layout-content>

        <a-layout-sider><Nav></Nav> </a-layout-sider>
      </a-layout>

      <a-layout-footer>
        <ToTop></ToTop>
        <Footer></Footer>
      </a-layout-footer>
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
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
}
.header {
  background-color: rgba(255, 255, 255, 0.6);
}
.cates {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 520px;
  background: url('../assets/img/bg.jpg');
  background-size: cover;
}
.body {
  margin: 0 10%;
  display: flex;
  min-width: 1024px;
  #content{
    margin-top:20px;
  }
}
</style>
