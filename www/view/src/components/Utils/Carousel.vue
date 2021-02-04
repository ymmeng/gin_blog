<template>
  <v-carousel cycle height="360" hide-delimiter-background show-arrows-on-hover>
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
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          title: "百度",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "https://baidu.com",
        },
        {
          title: "bilibili",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "https://bilibili.com",
        },
        {
          title: "Github",
          src: "https://s3.ax1x.com/2020/12/06/DXIR8P.jpg",
          url: "https://github.com",
        },
      ],
    };
  },
};
</script>
