<template>
  <div>
    <div class="form">
      <a-form-model
        class="loginForm"
        :model="userInfo"
        :rules="rules"
        ref="loginFormRef"
      >
        <h1>注册面板</h1>
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
            @keyup.enter="login"
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
            @keyup.enter="login"
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
        <a-form-model-item class="loginBtn">
          <a-button type="primary" @click="addUserOk"> 创建 </a-button>
          <a-button style="margin-left: 20px" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        id: 0,
        username: '',
        password: '',
        checkpass: '',
        role: 2
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名...', trigger: 'blur' },
          {
            min: 4,
            max: 12,
            message: '用户名在4-12位字符之间...',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码...', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '密码在3-20位字符之间...',
            trigger: 'blur'
          }
        ],
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.checkpass == '') {
                callback(new Error('请再次输入密码'))
              }
              if (this.userInfo.password != this.userInfo.checkpass) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 添加用户
    addUserOk () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.post('user/add', {
          username: this.userInfo.username,
          password: this.userInfo.password,
          role: this.userInfo.role
        })
        if (res.status != 200) return this.$message.error(res.message)
        this.addUserVisible = false
        this.$message.success('添加用户成功')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 50%;
  height: 500px;
  background-color: linear-gradient(72deg, #74ebd5 0%, #9face6 90%);
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  text-align: center;
  h1 {
    margin-top: 10px;
  }
}
.loginForm {
  width: 70%;
  position: absolute;
  padding: 0 40px;
  box-sizing: border-box;
  .loginBtn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
