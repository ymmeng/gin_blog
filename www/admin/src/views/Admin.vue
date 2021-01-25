<template>
  <a-layout class="container">
    <a-layout-sider>
      <Nav></Nav>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="headerBtn">
        <Header></Header>
      </a-layout-header>

      <div class="content">
        <router-view :key="$route.path"></router-view>
      </div>

      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Nav from '../components/admin/Nav'
import Footer from '../components/admin/Footer'
import Header from '../components/admin/Hearde'
export default {
  components: { Nav, Footer, Header },
}
</script>

<style scoped>
.container {
  height: 100%;
}
.headerBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.ant-layout-content {
  min-height: 2;
}
</style>
