<template>
  <v-app>
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
            <MyArt></MyArt>
          </v-col>

          <v-col cols="2">
            <NavR></NavR>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ToTop from "@/components/Utils/GotoTop";
import Footer from "@/components/Index/Footer";
import Header from "@/components/Index/Header";
import MyArt from "./MyArt";
import NavR from "@/components/Index/NavR";
export default {
  components: {
    ToTop,
    Footer,
    Header,
    NavR,
    MyArt,
  },
};
</script>