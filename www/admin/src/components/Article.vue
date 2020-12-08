<template>
  <main>
    <div class="art">
      <div class="artInfo">
        <h1>{{ artInfo.title }}</h1>
        <p>发布时间：{{ artInfo.CreatedAt }}</p>
        <p>分类：{{ artInfo.Category.name }}</p>
        <p>文章描述：{{ artInfo.desc }}</p>
        <img v-if="artInfo.img" :src="artInfo.img" alt="正在加载图片..." />
      </div>
      <br />
      <hr />
      <br />
      <div>
        <v-md-editor
          class="artContent"
          :value="artInfo.content"
          mode="preview"
        ></v-md-editor>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      artInfo: {
        id: 0,
        title: '',
        cid: undefined,
        desc: '',
        content: '',
        img: '',
      },
    }
  },
  created() {
    this.getArt(this.id)
  },
  methods: {
    // 获取文章
    async getArt(id) {
      const { data: res } = await this.$http.get(`article/info/${id}`)
      if (res.status != 200) return this.$message.error(res.message)
      this.artInfo = res.data
    },
  },
}
</script>

<style lang="less" scoped >
main {
  width: 100%;
  height: 100%;
  position: relative;
}
.art {
  position: absolute;
  margin-left: 50%;
  transform: translatex(-50%);
  background-color: rgb(237, 240, 228);
  width: 1024px;
  .artInfo {
    text-align: center;
    img {
      width: 700px;
    }
  }
  .artContent {
    background-color: rgb(237, 240, 228);
  }
}
</style>