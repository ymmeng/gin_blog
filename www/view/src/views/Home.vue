
<template>
  <v-app app>
    <Header></Header>
    <Carousel></Carousel>
    <v-main id="main">
      <v-container>
        <v-row>
          <v-col cols="2"><NavL></NavL> </v-col>
          <v-col>
            <router-view :key="$router.path"></router-view>
          </v-col>
          <v-col cols="2"><NavR></NavR></v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavR from "../components/Index/NavR";
import NavL from "../components/Index/NavL";
import Header from "../components/Index/Header";
import Footer from "../components/Index/Footer";
import Carousel from "../components/Utils/Carousel";
export default {
  components: {
    NavR,
    NavL,
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