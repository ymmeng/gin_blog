<template>
  <v-container>
    <p class="text-center pa-8 text-h3">图床</p>
    <v-divider></v-divider>
    <v-img
      class="img ma-1 rounded-lg"
      v-for="img in drawList"
      :key="img.id"
      :src="img.url"
      @click="cat(img.id)"
      max-width="285"
    ></v-img>
    <v-divider></v-divider>
    <p class="text-center pa-8 text-h6">到底了...</p>
  </v-container>
</template>

<script>
import { Url } from "@/request/http";

export default {
  data() {
    return {
      upUrl: Url + "/upload",
      drawList: [],
    };
  },
  created() {
    this.getDraw();
  },
  methods: {
    async getDraw() {
      const { data: res } = await this.$http.get("/drawBeds");
      if (res.status != 200) return this.$message.error(res.message);
      this.drawList = res.data;
    },
    cat(id) {
      // window.open(url);
      this.$router.push(`/drawBed/${id}`);
    },
  },
};
</script>

<style scoped>
.img {
  display: inline-block;
  cursor: pointer;
}
</style>
