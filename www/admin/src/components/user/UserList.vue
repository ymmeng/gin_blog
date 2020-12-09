<template>
  <div>
    <!-- 显示用户 -->
    <a-card>
      <a-row :gutter="30">
        <a-col :span="7">
          <a-input-search
            v-model="queryParam.username"
            placeholder="请输入要查找的用户名"
            enter-button
            allowClear
            @search="getUserList"
          />
        </a-col>

        <a-col :span="4">
          <a-button type="primary" @click="addUserVisible = true"
            >新增</a-button
          >
        </a-col>
      </a-row>
      <!-- 列表 -->
      <a-table
        rowKey="ID"
        :columns="columns"
        :pagination="paginationOption"
        :dataSource="userlist"
        bordered
      >
        <span slot="headimg" class="ArtImg" slot-scope="headimg">
          <a href=""><img :src="headimg" /></a>
        </span>

        <span slot="role" slot-scope="role">{{
          role == 1 ? '管理员' : '订阅者'
        }}</span>

        <template slot="action" slot-scope="data">
          <div class="actionSlot">
            <a-button
              type="primary"
              style="margin-right: 20px"
              @click="editUser(data.ID)"
              icon="edit"
              >编辑</a-button
            >
            <a-button
              style="margin-right: 20px"
              icon="redo"
              type="info"
              @click="updatePass(data.ID)"
              >重置密码</a-button
            >
            <a-button icon="delete" type="danger" @click="deleteUser(data.ID)"
              >删除</a-button
            >
          </div>
        </template>
      </a-table>
    </a-card>
    <div class="operation">
      <!-- 新增用户 -->
      <a-modal
        title="新增用户"
        :visible="addUserVisible"
        @ok="addUserOk"
        @cancel="addUserCancel"
      >
        <a-form-model
          :model="newUserInfo"
          :rules="newUserRules"
          ref="addUserRef"
        >
          <a-form-model-item label="用户名" prop="username" has-feedback>
            <a-input v-model="newUserInfo.username"></a-input>
          </a-form-model-item>

          <a-form-model-item label="密码" prop="password" has-feedback>
            <a-input-password v-model="newUserInfo.password"></a-input-password>
          </a-form-model-item>

          <a-form-model-item label="确认密码" prop="checkpass" has-feedback>
            <a-input-password
              v-model="newUserInfo.checkpass"
            ></a-input-password>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <!-- 编辑用户 -->
      <a-modal
        title="编辑用户"
        :visible="editUserVisible"
        @ok="editUserOk"
        @cancel="editUserCancel"
      >
        <a-form-model
          :model="editUserInfo"
          :rules="editUserRules"
          ref="editUserRef"
        >
          <a-form-model-item label="用户名" prop="username" has-feedback>
            <a-input v-model="editUserInfo.username"></a-input>
          </a-form-model-item>

          <a-form-model-item label="选择该用户的身份" prop="role">
            <a-radio-group
              default-value="a"
              button-style="solid"
              @change="adminChange"
              defaultValue="2"
            >
              <a-radio-button value="1"> 管理员 </a-radio-button>
              <a-radio-button value="2"> 订阅者 </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <!-- 修改密码 -->
      <a-modal
        title="修改密码"
        :visible="updatePassVisible"
        @ok="updatePassOk"
        @cancel="updatePassCancel"
      >
        <a-form-model
          :model="updatePassInfo"
          :rules="updatePassRules"
          ref="updatePassRef"
        >
          <a-form-model-item label="新密码" prop="password" has-feedback>
            <a-input v-model="updatePassInfo.password"></a-input>
          </a-form-model-item>

          <a-form-model-item label="确认密码" prop="checkpass" has-feedback>
            <a-input-password
              v-model="updatePassInfo.checkpass"
            ></a-input-password>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    width: '5%',
    key: 'id',
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'headimg',
    width: '8%',
    align: 'center',
    key: 'headimg',
    scopedSlots: { customRender: 'headimg' },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: '10%',
    align: 'center',
    key: 'username',
  },

  {
    title: '角色',
    dataIndex: 'role',
    width: '10%',
    key: 'role',
    scopedSlots: { customRender: 'role' },
    align: 'center',
  },
  {
    title: '操作',
    width: '30%',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
  },
]
export default {
  data() {
    return {
      paginationOption: {
        pageSizeOptions: ['5', '10', '20', '50'],
        defaultPageSize: 5,
        defaultCurrent: 1,
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}位用户`,
      },
      userlist: [],
      columns,
      queryParam: { username: '' },
      editUserInfo: {
        id: 0,
        username: '',
        role: 2,
      },
      newUserInfo: {
        id: 0,
        username: '',
        password: '',
        checkpass: '',
        role: 2,
      },
      updatePassInfo: {
        id: 0,
        password: '',
        checkpass: '',
      },
      editUserRules: {
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
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.editUserInfo.checkpass == '') {
                callback(new Error('请输入密码'))
              }
              if (this.editUserInfo.password != this.editUserInfo.checkpass) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      newUserRules: {
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
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.newUserInfo.checkpass == '') {
                callback(new Error('请输入密码'))
              }
              if (this.newUserInfo.password != this.newUserInfo.checkpass) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      updatePassRules: {
        password: [
          { required: true, message: '请输入密码...', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '密码在3-20位字符之间...',
            trigger: 'blur',
          },
        ],
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.updatePassInfo.checkpass == '') {
                callback(new Error('请再次输入密码'))
              }
              if (
                this.updatePassInfo.password != this.updatePassInfo.checkpass
              ) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      editUserVisible: false,
      addUserVisible: false,
      updatePassVisible: false,
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取所有用户
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: {
          username: this.queryParam.username,
          pagesize: this.paginationOption.defaultPageSize,
          pagenum: this.paginationOption.defaultCurrent,
        },
      })
      if (res.status != 200) return this.$message.error(res.message)
      this.userlist = res.data
      console.log(this.userlist)
      this.paginationOption.total = res.total
    },

    // 删除用户
    deleteUser(id) {
      this.$confirm({
        title: '提示：',
        content: '确定要删除该用户吗?该操作一旦执行无法撤销。',
        onOk: async () => {
          const { data: res } = await this.$http.delete(`user/${id}`)
          if (res.status != 200) return this.$message.error(res.message)
          this.$message.success('删除成功！')
          this.getUserList()
        },
        onCancel: () => {
          this.$message.info('已取消该操作。')
        },
      })
    },
    // 添加用户
    addUserOk() {
      this.$refs.addUserRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.post('user/add', {
          username: this.newUserInfo.username,
          password: this.newUserInfo.password,
          role: this.newUserInfo.role,
        })
        if (res.status != 200) return this.$message.error(res.message)
        this.addUserVisible = false
        this.$message.success('添加用户成功')
        this.getUserList()
      })
    },
    addUserCancel() {
      this.$refs.addUserRef.resetFields()
      this.addUserVisible = false
      this.$message.info('添加用户已取消')
    },
    // 编辑用户
    adminChange(data) {
      var data = data.target
      this.newUserInfo.role = Number(data.value)
    },
    async editUser(id) {
      this.editUserVisible = true
      const { data: res } = await this.$http.get(`user/${id}`)
      this.editUserInfo.username = res.data.username
      this.editUserInfo.id = id
    },
    editUserOk() {
      this.$refs.editUserRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.put(
          `user/${this.editUserInfo.id}`,
          {
            username: this.editUserInfo.username,
            role: this.editUserInfo.role,
          }
        )
        if (res.status != 200) return this.$message.error(res.message)
        this.editUserVisible = false
        this.$message.success('更新用户信息成功')
        this.getUserList()
      })
    },
    editUserCancel() {
      this.$refs.editUserRef.resetFields()
      this.editUserVisible = false
      this.$message.info('编辑用户已取消')
    },
    // 修改密码
    async updatePass(id) {
      this.updatePassVisible = true
      const { data: res } = await this.$http.get(`user/${id}`)
      this.updatePassInfo.id = id
    },
    updatePassOk() {
      this.$refs.updatePassRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.put(
          `user/${this.updatePassInfo.id}`,
          {
            password: this.updatePassInfo.password,
          }
        )
        if (res.status != 200) return this.$message.error(res.message)
        this.updatePassVisible = false
        this.$message.success('修改密码成功')
        this.getUserList()
      })
    },
    updatePassCancel() {
      this.$refs.updatePassRef.resetFields()
      this.updatePassVisible = false
      this.$message.info('修改密码已取消')
    },
  },
}
</script>

<style scoped lang="less">
.actionSlot {
  display: flex;
  justify-content: center;
}
.ArtImg img {
  height: 100px;
}
.ant-row {
  margin-bottom: 15px;
  max-width: 750px;
}
</style>
