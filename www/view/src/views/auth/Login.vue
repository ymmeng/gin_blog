<template>
  <v-app app>
    <div class="container">
      <div class="loginBox">
        <span class="my-4 justify-center d-flex text-h5">登录</span>
        <span class="justify-center d-flex"
          >没有帐号?进行<a href="/registered">注册</a></span
        >
        <a-form-model class="loginForm" :model="formdata" ref="loginFormRef">
          <!-- 用户名 -->
          <v-text-field
            label="用户名"
            placeholder="请输入用户名"
            counter
            style="width: 600px"
            v-model="formdata.username"
            prepend-inner-icon="mdi-account"
          >
          </v-text-field>
          <!-- 密码 -->
          <v-text-field
            label="密码"
            placeholder="请输入密码"
            counter
            style="width: 600px"
            type="password"
            v-model="formdata.password"
            prepend-inner-icon="mdi-donkey"
            @keyup.enter="login"
          >
          </v-text-field>
          <v-checkbox
            hide-details
            v-model="formdata.checkbox"
            label="记住我"
          ></v-checkbox>
          <!-- 按钮 -->
          <div class="loginBtn">
            <v-btn color="primary" style="margin: 10px" @click="login"
              >登录</v-btn
            >
            <v-btn color="error" style="margin: 10px" @click="resetForm"
              >清空</v-btn
            >
          </div>
        </a-form-model>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: "",
        checkbox: false,
      },
    };
  },
  methods: {
    ...mapMutations(["setUserName"]),
    resetForm() {
      this.formdata.username = "";
      this.formdata.password = "";
      this.formdata.checkbox = null;
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid)
          return this.$message.error("您输入的内容不符，请检查后重新输入");
        const { data: res } = await this.$http.post("/login", this.formdata);
        if (res.status != 200 && res.status != 201) {
          return this.$message.error(res.message);
        }
        // if (this.formdata.checkbox) {
        window.sessionStorage.setItem("token", res.token);
        // }
        this.$message.success(res.message);
        this.$router.push("/");
        this.setUserName(this.formdata.username);
      });
    },
  },
};
</script>

<style lang='less' scoped>
.container {
  min-width: 180024px;
  height: 100%;
  background-color: #8a8a8a;
}
.loginBox {
  width: 500px;
  height: 350px;
  background-image: linear-gradient(72deg, #c5c5c5 0%, #9195a5 90%);
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
}
.loginForm {
  width: 100%;
  position: absolute;
  bottom: 10px;
  padding: 0 20px;
  box-sizing: border-box;
}
.loginBtn {
  display: flex;
  justify-content: flex-end;
}
</style>
