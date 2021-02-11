<template>
  <v-sheet min-width="25vh" rounded="lg">
    <UserInfo></UserInfo>
  </v-sheet>
</template>          

<script>
import UserInfo from "@/views/user/UserInfo";
export default {
  components: {
    UserInfo,
  },
};
</script>