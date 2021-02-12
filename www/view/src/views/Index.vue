
<template>
  <v-app app>
    <Header></Header>
    <Carousel />
    <v-main>
      <v-container>
        <router-view :key="$router.path"></router-view>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "@/components/Index/Header";
import Footer from "@/components/Index/Footer";
import Carousel from "@/components/Utils/Carousel.vue";
export default {
  components: {
    Header,
    Footer,
    Carousel,
  },
};
</script>

<style lang="less" scoped>
#main {
  background: #ddd;
}
</style>