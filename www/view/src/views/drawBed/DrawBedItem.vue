<template>
  <v-sheet class="justify-center d-flex blue lighten-4" rounded="lg">
    <a-col class="pa-10" :span="15">
      <v-img class="rounded" :src="imgInfo.url" />
      <a-divider orientation="left">完整图片链接:</a-divider>
      <a-row class="mt-2" v-for="i in links" :key="i.title">
        <a-col :span="4" class="name"
          ><p>{{ i.title }}:</p>
        </a-col>
        <a-col :span="20"
          ><a-input class="url" :id="i.title" :value="i.url"
            ><a-tooltip class="button" slot="suffix" title="复制链接">
              <a-button @click="() => copyLink(i.title)" size="small"
                >复制</a-button
              >
            </a-tooltip></a-input
          >
        </a-col>
      </a-row>
    </a-col>
  </v-sheet>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: ["id"],
  data() {
    return {
      imgInfo: {},
      links: [],
    };
  },
  created() {
    this.getImg(this.id);
  },
  methods: {
    async getImg(id) {
      const { data: res } = await this.$http.get(`/drawBed/${id}`);
      this.imgInfo = res.data;
      if (this.imgInfo.name == "") {
        this.imgInfo.name = "image";
      }
      this.links = [
        {
          title: "URL链接",
          url: this.imgInfo.url,
        },
        {
          title: "MarkDown链接",
          url: `![${this.imgInfo.name}](${this.imgInfo.url})`,
        },
        {
          title: "网页贴图代码(HTML)",
          url: `<a href="http://127.0.0.1:8080${this.$route.path}"><img src="${this.imgInfo.url}" alt="${this.imgInfo.name}" border="0" /></a>`,
        },
      ];
    },
    copyLink(id) {
      var e = document.getElementById(id); //对象是content
      e.select(); //选择对象
      document.execCommand("Copy"); //执行浏览器复制命令
      this.$notification["success"]({
        message: "复制成功!",
      });
    },
  },
});
</script>

<style lang='less' scoped>
.url {
  .button {
    opacity: 0;
  }
  &:hover {
    .button {
      opacity: 1;
    }
  }
}
.name {
  font-size: 15px;
  font-weight: bold;
  line-height: 35px;
  > p {
    position: absolute;
    right: 10px;
  }
}
</style>