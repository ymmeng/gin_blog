<template>
  <div>
    <v-carousel
      cycle
      height="360"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="slide in slides"
        :key="slide.title"
        :src="slide.src"
        :href="slide.url"
      >
        <v-row class="fill-height align-center justify-center">
          <div class="display-2">{{ slide.title }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          title: "Github",
          src:
            "http://192.168.58.111:6080/upload/2021-02-04/ffc58ab5-4955-4dca-bae3-0c1004d5de8e.png",
          url: "https://github.com",
        },
        {
          title: "bilibili",
          src:
            "http://192.168.58.111:6080/upload/2021-02-04/f03d7bb9-d91e-46ec-854f-5362983ffefa.jpg",
          url: "https://bilibili.com",
        },
        {
          title: "啥也不是",
          src:
            "http://192.168.58.111:6080/upload/2021-02-11/72682eb2-a772-486e-9002-5c7914f324c0.jpg",
          url: "",
        },
      ],
    };
  },
};
</script>
