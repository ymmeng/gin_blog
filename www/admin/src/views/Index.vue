<template>
  <div class="main">
    <title>index</title>
    <link
      href="https://cdn.bootcss.com/font-awesome/5.8.0/css/all.css"
      rel="stylesheet"
    />

    <header class="Nav">
      <a-affix :offset-top="affix">
        <div class="header">
          <div id="logo"><a href="/">幽梦Blog</a></div>
          <div class="button">
            <a-button
              key=""
              type="primary"
              style="margin-right: 20px"
              @click="login"
              >登录</a-button
            >
            <a-button type="info" @click="registered">注册</a-button>
          </div>
        </div>
      </a-affix>
      <div class="Cates">
        <div class="Cate" v-for="cate in cates" :key="cate.key"></div>
      </div>
    </header>

    <main class="body">
      <div class="article">
        <div id="dplayer"></div>
        <div id="aplayer"></div>
        <h1>article</h1>
        <section>
          <article v-for="itme in Artlist" :key="itme.ID">
            <div id="art">
              <a @click="art(itme.ID)">
                <h1>{{ itme.title }}</h1>
                <p>{{ itme.CreatedAt }}</p>
                <p>{{ itme.desc }}</p>
                <br />
                <div class="img" v-if="itme.img">
                  <img src="itme.img" alt="正在加载图片..." />
                </div>
              </a>
            </div>
          </article>
        </section>
        <!-- 分页 -->
        <div>
          <a-pagination
            show-quick-jumper
            show-size-changer
            :page-size-options="pageSizeOptions"
            :page-size="queryParam.PageSize"
            :total="queryParam.total"
            @change="pagChange"
            @showSizeChange="onShowSizeChange"
          >
          </a-pagination>
        </div>
      </div>
      <div class="info">
        <nav>
          <h1>Welcome</h1>
          <!-- 近期发布 -->
          <div></div>
          <!-- 访问排行 -->
          <div></div>
          <!-- 标签云 -->
          <div>
            <ul>
              <li v-for="itme in Catelist" :key="itme.id" value="itme.name">
                <a-button>{{ itme.name }}</a-button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </main>

    <div>
      <!-- <a
              class="btn"
              v-for="(item, index) in test"
              v-bind:key="index"
              href="https://github.com/yyeexin"
            >
              <i class="fab fa-github"></i>
            </a> -->
      <a class="btn" href="https://space.bilibili.com/11866444">
        <i class="fab fa-twitch"></i>
      </a>
    </div>
    <footer>--- 幽梦-Blog 始于2020 ---</footer>
  </div>
</template>


<script>
import DPlayer from 'dplayer'
export default {
  props: ['id'],
  mounted() {
    const dp = new DPlayer({
      container: document.getElementById('dplayer'),
      video: {
        url: 'http://127.0.0.1/1.mp4',
        // 视频封面
        pic: 'https://s3.ax1x.com/2020/12/07/Dz8MjO.jpg',
        // 视频流畅度
        quality: [
          {
            name: '高清',
            url: 'http://127.0.0.1/1.mp4',
            type: 'normal',
          },
          {
            name: '标清',
            url: 'http://127.0.0.1/1.mp4',
            type: 'normal',
          },
        ],
        defaultQuality: 0,
        // 视频缩略图
        thumbnails: 'https://s3.ax1x.com/2020/12/07/Dz8MjO.jpg',
      },
      theme: '#3498db',
      lang: navigator.language.toLowerCase('zh-cn'),
      playbackSpeed: [0.5, 0.75, 1, 1.2, 1.4, 1.5, 1.6, 2],
      // 视频logo
      logo: 'https://s3.ax1x.com/2020/12/07/Dz8MjO.jpg',
      // 邮件菜单
      contextmenu: [
        {
          text: 'custom1',
          link: 'https://github.com/DIYgod/DPlayer',
        },
        {
          text: 'custom2',
          click: (player) => {
            console.log(player)
          },
        },
      ],
      highlight: [
        {
          time: 20,
          text: '这是第 20 秒',
        },
        {
          time: 120,
          text: '这是 2 分钟',
        },
      ],
      live: true,
      danmaku: true,
      apiBackend: {
        read: function (endpoint, callback) {
          console.log('Pretend to connect WebSocket')
          callback()
        },
        send: function (endpoint, danmakuData, callback) {
          console.log('Pretend to send danmaku via WebSocket', danmakuData)
          callback()
        },
      },
      video: {
        url: 'http://127.0.0.1/1.mp4',
        type: 'mp4',
      },
    })
  },
  data() {
    return {
      affix: 0,
      cates: 0,
      Catelist: [],
      Artlist: undefined,
      pageSizeOptions: ['1', '3', '5', '7', '10', '15'],
      queryParam: { title: '', PageSize: 3, Current: 1, total: 0 },
    }
  },
  created() {
    this.getArtList()
    this.getCateList()
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
      this.queryParam.PageSize = pageSize
      this.getArtList()
    },
    // 改变分页时执行
    pagChange(pageNumber) {
      this.queryParam.Current = pageNumber
      this.getArtList()
    },
    // 获取所有分类
    async getCateList() {
      const { data: res } = await this.$http.get('categorys')
      if (res.status != 200) return this.$message.error(res.message)
      this.Catelist = res.data
      this.cates = res.total
    },
    // 获取所有文章
    async getArtList() {
      const { data: res } = await this.$http.get('articles', {
        params: {
          title: this.queryParam.title,
          pageSize: this.queryParam.PageSize,
          pageNum: this.queryParam.Current,
        },
      })
      if (res.status != 200) return this.$message.error(res.message)
      this.Artlist = res.data
      console.log(this.Artlist)
      this.queryParam.total = res.total
    },
    art(id) {
      this.$router.push(`/article/${id}`)
    },
    login() {
      this.$router.push('/login')
    },
    registered() {
      this.$router.push('/registered')
    },
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main {
  height: 100%;
  width: 100%;
}

.Nav {
  width: 100%;
  height: 100%;
  background: url('../assets/img/bg.jpg');
  background-size: cover;
  .header {
    min-height: 70px;
    height: 10%;
    padding: 0 40px 0 40px;
    background: rgba(255, 255, 255, 0.7);
    position: relative;
    #logo {
      position: absolute;
      top: 50%;
      font-size: 30px;
      transform: translate(0, -50%);
    }
    .button {
      position: absolute;
      top: 50%;
      right: 40px;
      transform: translate(0, -50%);
    }
  }
  .Cates {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
  .Cate {
    height: 100px;
    width: 180px;
    background: #3498db;
    border-radius: 20%;
    border: 1px solid pink;
    margin: 1%;
  }
}
.body {
  margin: 0 10%;
  display: flex;
  min-width: 1024px;

  .info {
    width: 30%;
    background: pink;
    justify-content: flex-end;
    .btn {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #f1f1f1;
      margin: 10px;
      border-radius: 30%;
      box-shadow: 0 5px 15px -5px #00000070;
      color: #3498db;
      overflow: hidden;
      position: relative;
      text-align: center;
      i {
        line-height: 40px;
        font-size: 18px;
        transition: 0.2s linear;
      }
      &:hover i {
        transform: scale(1.3);
        color: #f1f1f1;
      }
      &:before {
        content: '';
        position: absolute;
        width: 120%;
        height: 120%;
        background: #3498db;
        transform: rotate(45deg);
        left: -110%;
        top: 90%;
      }
      &:hover:before {
        animation: flash 0.7s 1;
        top: -10%;
        left: -10%;
      }
    }
    @keyframes flash {
      0% {
        left: -100%;
        top: 90%;
      }
      50% {
        left: 10%;
        top: -30%;
      }
      100% {
        left: -10%;
        top: -10%;
      }
    }
  }
  .article {
    width: 70%;
    margin-right: 2%;
    background: rgb(192, 253, 255);
    #art {
      width: 100%;
      height: 200px;
      background: rgb(141, 219, 126);
      margin: 20px 0;
      .img {
        height: 100px;
        width: 100%;
      }
    }
  }
}
</style>
