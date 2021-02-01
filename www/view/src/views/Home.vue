
<template>
  <v-app app>
    <Header></Header>
    <v-main id="main">
      <v-container>
        <v-row>
          <v-col cols="2"><NavL></NavL> </v-col>
          <v-col>
            <Content></Content>
          </v-col>
          <v-col cols="2"><NavR></NavR></v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Content from "../components/Index/Content";
import NavR from "../components/Index/NavR";
import NavL from "../components/Index/NavL";
import Header from "../components/Index/Header";
import Footer from "../components/Index/Footer";
export default {
  components: {
    Content,
    NavR,
    NavL,
    Header,
    Footer,
  },
};
</script>

<style lang="less" scoped>
#main {
  background: #ddd;
}
</style>