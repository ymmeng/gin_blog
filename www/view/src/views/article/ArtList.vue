<template>
  <v-row>
    <v-col cols="2"><NavL></NavL> </v-col>
    <v-col>
      <router-view :key="$router.path"></router-view>
    </v-col>
    <v-col cols="2"><NavR></NavR></v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

import NavR from "@/components/Index/NavR.vue";
import NavL from "@/components/Index/NavL.vue";
export default Vue.extend({
  components: {
    NavR,
    NavL,
  },
});
</script>