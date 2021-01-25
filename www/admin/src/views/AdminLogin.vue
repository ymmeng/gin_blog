<template>
  <div class="container">
    <div class="loginBox">
      <h1 class="head">
      <span>管理员登录界面</span>
      </h1>

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
        <!-- 按钮 -->
        <a-form-model-item class="loginBtn">
          <a-button type="primary" style="margin: 10px" @click="login"
            >登录</a-button
          >
          <a-button type="info" style="margin: 10px" @click="resetForm"
            >取消</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>

<script>
export default {
  data() {
    return {
      formdata: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名...', trigger: 'blur' },
          {
            min: 4,
            max: 12,
            message: '用户名在4-12位字符之间...',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码...', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '密码在3-20位字符之间...',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid)
          return this.$message.error('您输入的内容不符，请检查后重新输入')
        const { data: res } = await this.$http.post('login', this.formdata)
        if (res.status != 201) return this.$message.error(res.message)
        window.localStorage.setItem('token', res.token)
        this.$message.success(res.message, 0.5)
        this.$router.push('/admin/index')
      })
    },
  },
}
</script>

<style scoped>
.head{
  padding-top: 10px;
  text-align: center;
  font-weight:500;
}
.container {
  min-width: 1024px;
  height: 100%;
  background-color: #5a5a5a;
}
.loginBox {
  width: 450px;
  height: 300px;
  background-image: linear-gradient(72deg, #817e7e 0%, #505050 90%);
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
</style>
