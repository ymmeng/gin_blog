<template>
  <div class="main">
    <title>index</title>
    <link
      href="https://cdn.bootcss.com/font-awesome/5.8.0/css/all.css"
      rel="stylesheet"
    />

    <div class="Nav">
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
      <div class="Cates">
        <div class="Cate" v-for="cate in cates" :key="cate.key"></div>
      </div>
      <div></div>
    </div>
    <div class="body">
      <div class="article">
        <h1>article</h1>
        <ul>
          <li v-for="itme in Artlist" :key="itme.id">
            <div id="art">
              <h1>{{ itme.title }}</h1>
            </div>
            <p>{{ itme.CreatedAt }}</p>
            <p>{{ itme.desc }}</p>
            <br />
            <span>{{ itme.img }}</span>
            <p>{{ itme.content }}</p>
          </li>
        </ul>
      </div>
      <div class="info">
        <span>
          <h1>Welcome</h1>
          <div>
            <a
              class="btn"
              v-for="(item, index) in test"
              v-bind:key="index"
              href="https://github.com/yyeexin"
            >
              <i class="fab fa-github"></i>
            </a>
            <a class="btn" href="https://space.bilibili.com/11866444">
              <i class="fab fa-twitch"></i>
            </a>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cates: 6,
      test: undefined,
      paginationOption: {
        pageSizeOptions: ['5', '10', '20', '50'],

        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}篇文章`,
      },
      Artlist: 10,
      queryParam: { title: '', PageSize: 5, Current: 1 },
    }
  },
  created() {
    this.getArtList()
  },
  methods: {
    // 获取所有文章
    async getArtList() {
      const { data: res } = await this.$http.get('articles', {
        params: {
          title: this.queryParam.title,
          pagesize: this.queryParam.PageSize,
          pagenum: this.queryParam.Current,
        },
      })
      if (res.status != 200) return this.$message.error(res.message)
      this.Artlist = res.data
      console.log(this.Artlist)
      this.paginationOption.total = res.total
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
      display: flex;
      align-items: center;
      font-size: 30px;
      height: 100%;
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
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .Cate {
    height: 100px;
    width: 180px;
    background: #3498db;
    border-radius: 20%;
    border: 10px solid pink;
    margin: 1%;
  }
}
.body {
  background: rgb(141, 89, 89);
  margin: 0 30px;
  display: flex;
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
    background: rgb(192, 253, 255);
    #art {
      width: 100%;
      height: 100px;
      background: pink;
    }
  }
}
</style>
