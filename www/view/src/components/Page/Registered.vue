<template>
  <v-app>
    <div class="container">
      <div class="loginBox">
        <span class="my-4 justify-center d-flex text-h5">注册</span>
        <span class="justify-center d-flex"
          >已有帐号?进行<a href="/login">登录</a></span
        >
        <a-form-model
          class="loginForm"
          :model="userInfo"
          :rules="rules"
          ref="loginFormRef"
        >
          <!-- 用户名 -->
          <a-form-model-item prop="username" has-feedback>
            <a-input placeholder="请输入用户名" v-model="userInfo.username">
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <!-- 密码 -->
          <a-form-model-item prop="password" has-feedback>
            <a-input-password
              placeholder="请输入密码"
              type="password"
              v-model="userInfo.password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input-password>
          </a-form-model-item>

          <a-form-model-item prop="checkpass" has-feedback>
            <a-input-password
              placeholder="请确认密码"
              type="password"
              @keyup.enter="addUserOk"
              v-model="userInfo.checkpass"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input-password>
          </a-form-model-item>
          <!-- 按钮 -->
          <div class="loginBtn">
            <v-btn color="primary" style="margin: 10px" @click="addUserOk"
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
export default {
  data() {
    return {
      userInfo: {
        id: 0,
        username: "",
        password: "",
        checkpass: "",
        role: 2,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名...", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "用户名在4-12位字符之间...",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码...", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "密码在3-20位字符之间...",
            trigger: "blur",
          },
        ],
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.checkpass == "") {
                callback(new Error("请再次输入密码"));
              }
              if (this.userInfo.password != this.userInfo.checkpass) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 添加用户
    addUserOk() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error("参数不符合要求，请重新输入");
        const { data: res } = await this.$http.post("user/add", {
          username: this.userInfo.username,
          password: this.userInfo.password,
          role: this.userInfo.role,
        });
        if (res.status != 200) return this.$message.error(res.message);
        this.addUserVisible = false;
        this.$message.success("添加用户成功");
        this.$router.push("/");
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
