<template>
  <div>
    <div class="info">
      <nav>
        <UserInfo></UserInfo>
        <!-- 近期发布 -->
        <div class="ontime"></div>
        <!-- 访问排行 -->
        <div class="onview"></div>
        <!-- 标签云 -->
        <div class="bq">
          <ul>
            <span>标签云:</span>
            <li v-for="itme in Catelist" :key="itme.id" value="itme.name">
              <v-btn>{{ itme.name }}</v-btn>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div>
      <a class="btn" href="https://space.bilibili.com/650492280">
        <i class="fab fa-twitch"></i>
      </a>
    </div>
  </div>
</template>


<script>
import UserInfo from '../Page/UserInfo'
export default {
  components: {
    UserInfo,
  },
  data() {
    return {
      Catelist: [],
    }
  },

  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有分类
    async getCateList() {
      const { data: res } = await this.$http.get('categorys')
      if (res.status != 200) return this.$message.error(res.message)
      this.Catelist = res.data
      this.cates = res.total
    },
  },
}
</script>


<style lang="less" scoped>
.info {
  width: 100%;
  justify-content: flex-end;
  .bq {
    background: #b6d8ee;
    border-radius: 5%;
    border: 1px solid;
    padding: 3%;
  }
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
</style>