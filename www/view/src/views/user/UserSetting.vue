<template>
  <v-container>
    <a-row :gutter="20" style="max-width: 1524px" class="center mt-7">
      <a-col :span="6" class="blue lighten-4">1
        <div>
          个人信息
        </div>

      </a-col>
      <a-col :span="18" class="red lighten-3">2</a-col>
    </a-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo", "ArtList"]),
  },
};
</script>
<style lang="scss" scoped>
</style>