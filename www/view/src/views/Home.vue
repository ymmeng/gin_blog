
<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <Header></Header>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"> </v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title>title </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <Content></Content>
            </v-sheet>
          </v-col>

          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> <Nav></Nav></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"> </v-divider>

                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <ToTop></ToTop>
    <v-footer color="primary lighten-1" padless>
      <Footer></Footer>
    </v-footer>
  </v-app>
</template>


<script>
import ToTop from "../components/Utils/GotoTop";
import Content from "../components/Index/Content";
import Footer from "../components/Index/Footer";
import Header from "../components/Index/Header";
import Nav from "../components/Index/Nav";
export default {
  components: {
    Content,
    ToTop,
    Footer,
    Header,
    Nav,
  },
};
</script>

<style lang="less" scoped>
#inspire {
  height: 100%;
  width: 100%;
  min-height: 1500px;
}
.header {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>

