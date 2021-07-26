<template>
  <div>
    <!-- 显示分类 -->
    <a-card>
      <a-row>
        <a-col>
          <a-button type="primary" @click="addCateVisible = true"
            >新增分类</a-button
          >
        </a-col>
      </a-row>
      <!-- 展示内容 -->
      <a-table
        rowKey="id"
        :columns="columns"
        :pagination="paginationOption"
        :dataSource="Catelist"
        bordered
      >
        <template slot="action" slot-scope="data">
          <div class="actionSlot">
            <a-button
              type="primary"
              style="margin-right: 20px"
              @click="editCate(data.id)"
              icon="edit"
              >编辑</a-button
            >
            <a-button icon="delete" type="danger" @click="deleteCate(data.id)"
              >删除</a-button
            >
          </div>
        </template>
      </a-table>
    </a-card>
    <!-- 新增分类 -->
    <a-modal
      centered
      closable
      title="新增分类"
      :visible="addCateVisible"
      @ok="addCateOk"
      @cancel="addCateCancel"
      destroyOnClose
    >
      <a-form-model :model="addCateInfo" :rules="addCateRules" ref="addCateRef">
        <a-form-model-item label="分类名" prop="name" has-feedback>
          <a-input v-model="addCateInfo.name"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 编辑分类 -->
    <a-modal
      closable
      title="编辑分类"
      :visible="editCateVisible"
      @ok="editCateOk"
      @cancel="editCateCancel"
    >
      <a-form-model
        :model="editCateInfo"
        :rules="editCateRules"
        ref="editCateRef"
      >
        <a-form-model-item label="分类名" prop="name" has-feedback>
          <a-input v-model="editCateInfo.name"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '10%',
    key: 'id',
    align: 'center',
  },
  {
    title: '分类名',
    dataIndex: 'name',
    width: '20%',
    align: 'center',
    key: 'name',
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
        defaultPageSize: 10,
        defaultCurrent: 1,
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}种分类`,
      },
      Catelist: [],
      columns,
      editCateInfo: {
        id: 0,
        name: '',
      },
      addCateInfo: {
        name: '',
      },
      addCateRules: {
        name: [
          {
            validator: (rule, value, callback) => {
              if (this.addCateInfo.name == '') {
                callback(new Error('请输入分类名...'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      editCateRules: {
        name: [
          {
            validator: (rule, value, callback) => {
              if (this.editCateInfo.name == '') {
                callback(new Error('请输入分类名...'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      editCateVisible: false,
      addCateVisible: false,
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有分类
    async getCateList() {
      const { data: res } = await this.$http.get('categorys', {
        params: {
          pagesize: this.paginationOption.defaultPageSize,
          pagenum: this.paginationOption.defaultCurrent,
        },
      })
      if (res.status != 200) return this.$message.error(res.message)
      this.Catelist = res.data
      this.paginationOption.total = res.total
    },
    // 删除分类
    deleteCate(id) {
      this.$confirm({
        title: '提示：',
        content: '确定要删除该分类吗?该操作一旦执行无法撤销。',
        onOk: async () => {
          const { data: res } = await this.$http.delete(`category/${id}`)
          if (res.status != 200) return this.$message.error(res.message)
          this.$message.success('删除成功！')
          this.getCateList()
        },
        onCancel: () => {
          this.$message.info('已取消该操作。')
        },
      })
    },
    // 添加分类
    addCateOk() {
      this.$refs.addCateRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const res = await this.$http.post('category/add', {
          name: this.addCateInfo.name,
        })
        if (res.status != 200) return this.$message.error(res.message)
        this.$message.success('添加分类成功')
        this.getCateList()
        this.addCateVisible = false
      })
    },
    addCateCancel() {
      this.$refs.addCateRef.resetFields()
      this.addCateVisible = false
      this.$message.info('添加分类已取消')
    },
    // 编辑分类
    async editCate(id) {
      this.editCateVisible = true
      const { data: res } = await this.$http.get(`category/${id}`)
      this.editCateInfo = res.data[0]
      this.editCateInfo.id = id
    },
    editCateOk() {
      this.$refs.editCateRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.put(
          `category/${this.editCateInfo.id}`,
          {
            name: this.editCateInfo.name,
          }
        )
        if (res.status != 200) return this.$message.error(res.message)
        this.editCateVisible = false
        this.$message.success('更新分类信息成功')
        this.getCateList()
      })
    },
    editCateCancel() {
      this.$refs.editCateRef.resetFields()
      this.editCateVisible = false
      this.$message.info('编辑分类已取消')
    },
  },
}
</script>

<style scoped>
.actionSlot {
  display: flex;
  justify-content: center;
}
.ant-row {
  margin-bottom: 15px;
}
</style>
