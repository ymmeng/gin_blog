<template>
  <div id="dplayer"></div>
</template>

<script>
import DPlayer from "dplayer";
export default {
  mounted() {
    this.dplayer();
  },
  data() {
    return { inputValue: 0 };
  },
  created() {
        this.dplayer();
  },

  methods: {
    dplayer() {
      const dp = new DPlayer({
        container: document.getElementById("dplayer"),
        video: {
          // 视频封面
          pic: "https://s3.ax1x.com/2021/02/01/yZeMCT.jpg",
          // 视频流畅度
          quality: [
            {
              name: "高清",
              url: "http://127.0.0.1:10083/1.mp4",
              type: "normal",
            },
            {
              name: "标清",
              url: "http://127.0.0.1:10083/1.mp4",
              type: "normal",
            },
            {
              name: "流畅",
              url: "http://127.0.0.1:10083/1.mp4",
              type: "normal",
            },
          ],
          defaultQuality: 0,
          // 视频缩略图
          thumbnails: "https://s3.ax1x.com/2020/12/07/Dz8MjO.jpg",
        },
        theme: "bleak",
        lang: navigator.language.toLowerCase("zh-cn"),
        playbackSpeed: [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5],
        // 视频logo
        logo: "https://s3.ax1x.com/2020/12/06/DXI3B4.jpg",
        // 右键菜单
        contextmenu: [
          {
            text: "custom2",
            click: (player) => {
              console.log(player);
            },
          },
        ],
        highlight: [
          {
            time: 20,
            text: "这是第 20 秒",
          },
          {
            time: 120,
            text: "这是 2 分钟",
          },
        ],
      });
    },
    // 视频播放速度
    playerChange(value) {
      this.inputValue = value;
    },
  },
};
</script>

<style lang="less" scoped>
#dplayer {
  border-radius: 10px;
  max-width:1400px;
}
</style>