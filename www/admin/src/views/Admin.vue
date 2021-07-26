<template>
  <a-layout class="container">
    <Nav></Nav>

    <a-layout>
      <Header></Header>

      <div class="content">
        <router-view :key="$route.path"></router-view>
      </div>

      <Footer></Footer>
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
</style>
