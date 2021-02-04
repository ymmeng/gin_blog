<template>
  <v-carousel
    cycle
    height="400"
    progress
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="slide in slides"
      :key="slide.slide"
      :src="slide.src"
    >
      <v-row class="fill-height align-center justify-center">
        <div class="display-2">第 {{ slide.slide }} 页</div>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          slide: "1",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "",
        },
        {
          slide: "2",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "",
        },
        {
          slide: "1",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "",
        },
        {
          slide: "2",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "",
        },
        {
          slide: "1",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "",
        },
      ],
    };
  },
};
</script>
