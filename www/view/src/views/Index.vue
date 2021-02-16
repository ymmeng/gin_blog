
<template>
  <v-app id="index" app>
    <Header></Header>
    <Carousel v-show="$route.path == '/'" />
    <router-view></router-view>
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
#index {
  background: #e0e0e0;
}
</style>