<template>
  <!-- <v-row>
    <v-col cols="2"><NavL></NavL> </v-col>
    <v-col>
      <router-view />
    </v-col>
    <v-col cols="2"><NavR></NavR></v-col>
  </v-row> -->
  <a-row :gutter="20" class="ml-16 mr-16 mt-6">
    <a-col :span="4"><NavL></NavL></a-col>
    <a-col :span="16">
      <router-view />
    </a-col>
    <a-col :span="4" class="mb-4"><NavR></NavR></a-col>
  </a-row>
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