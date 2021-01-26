<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <Header></Header>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title>title </v-list-item-title>
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

          <v-col>
            <v-sheet min-height="70vh" rounded="lg" id="content">
              <MyArt></MyArt>
            </v-sheet>
          </v-col>

          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> <Nav></Nav> </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <ToTop></ToTop>
    <Footer></Footer>
  </v-app>
</template>

<script>
import ToTop from "../Utils/GotoTop";
import Footer from "../Index/Footer";
import Header from "../Index/Header";
import MyArt from "./MyArt";
import Nav from "../Index/Nav";
export default {
  components: {
    ToTop,
    Footer,
    Header,
    Nav,
    MyArt,
  },
};
</script>