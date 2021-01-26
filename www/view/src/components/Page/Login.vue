<template>
  <v-app>
    <div class="container">
      <div class="loginBox">
        <h1 class="title">登录</h1>
        <a-form-model
          class="loginForm"
          :model="formdata"
          :rules="rules"
          ref="loginFormRef"
        >
          <!-- 用户名 -->
          <a-form-model-item prop="username">
            <a-input placeholder="请输入用户名" v-model="formdata.username">
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <!-- 密码 -->
          <a-form-model-item prop="password">
            <a-input-password
              placeholder="请输入密码"
              type="password"
              @keyup.enter="login"
              v-model="formdata.password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input-password>
          </a-form-model-item>
          <div>
            <v-checkbox
              hide-details
              v-model="checkbox"
              label="jizhuwo"
            ></v-checkbox>
          </div>
          <!-- 按钮 -->
          <div class="loginBtn">
            <v-btn color="primary" style="margin: 10px" @click="login"
              >登录</v-btn
            >
            <v-btn color="error" style="margin: 10px" @click="resetForm"
              >clear</v-btn
            >
          </div>
        </a-form-model>
      </div>
    </div>
  </v-app>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: "",
        checkbox: false,
      },
      checkbox: true,
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
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid)
          return this.$message.error("您输入的内容不符，请检查后重新输入");
        const { data: res } = await this.$http.post("login", this.formdata);
        if (res.status != 200 && res.status != 201) {
          return this.$message.error(res.message);
        }
        if (this.checkbox) {
          window.sessionStorage.setItem("token", res.token);
        }
        
        console.log(window.sessionStorage);
        console.log(window.localStorage);
        this.$message.success(this.formdata.username + " 欢迎");
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.container {
  min-width: 1024px;
  height: 100%;
  background-color: #8a8a8a;
}
.loginBox {
  width: 450px;
  height: 300px;
  background-image: linear-gradient(72deg, #c5c5c5 0%, #9195a5 90%);
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
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
.title{
  text-align: center;
  padding-top: .5rem;
}
</style>
