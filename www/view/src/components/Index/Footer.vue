<template>
  <v-footer padless color="#123456">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        color="white"
        text
        rounded
        class="my-2"
        @click="test(link.link)"
      >
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.name }}
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} ~_~ <strong>Ymmeng Blog</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "主页", link: "/", icon: "mdi-home" },
      { name: "关于", link: "/about", icon: "mdi-account" },
    ],
  }),
  methods: {
    test(link) {
      this.$router.push(link);
    },
  },
};
</script>