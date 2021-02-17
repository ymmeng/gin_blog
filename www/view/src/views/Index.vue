
<template>
  <v-app class="cyan lighten-5" app>
    <Header></Header>
    <Carousel v-show="$route.path == '/'" />
    <div class="h-100">
      <router-view></router-view>
    </div>
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
</style>