<template>
  <div>
    <!-- 显示文章 -->
    <a-card>
      <a-row :gutter="30">
        <a-col :span="7">
          <a-input-search
            v-model="queryParam.title"
            placeholder="请输入要查找的文章标题"
            enter-button
            allowClear
            @search="getArtList"
          />
        </a-col>

        <a-col :span="4">
          <a-button type="primary" @click="$router.push(`/admin/addart`)"
            >写文章</a-button
          >
        </a-col>

        <a-col :span="3">
          <a-select
            placeholder="请选择分类"
            style="width: 200px"
            @change="cateChange"
          >
            <a-select-option
              v-for="item in Catelist"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :span="1">
          <a-button type="primary" @click="getArtList()">显示全部</a-button>
        </a-col>
      </a-row>

      <a-table
        rowKey="ID"
        :columns="columns"
        :pagination="paginationOption"
        :dataSource="Artlist"
        borderad
      >
        <span slot="img" class="ArtImg">
          <img
            src="https://s3.ax1x.com/2020/12/07/Dz8MjO.jpg"
            alt="正在加载图片..."
          />
        </span>
        <template slot="action" slot-scope="data">
          <div class="actionSlot">
            <a-button
              type="primary"
              style="margin-right: 20px"
              @click="$router.push(`addart/${data.ID}`)"
              icon="edit"
              >编辑</a-button
            >
            <a-button icon="delete" type="danger" @click="deleteArt(data.ID)"
              >删除</a-button
            >
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    width: '3%',
    key: 'id',
    align: 'center',
  },
  {
    title: '分类',
    dataIndex: 'Category.name',
    width: '8%',
    align: 'center',
    key: 'name',
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    width: '15%',
    key: 'title',
    align: 'center',
  },
  {
    title: '文章描述',
    dataIndex: 'desc',
    width: '25%',
    key: 'desc',
    align: 'center',
  },
  {
    title: '文章概念图',
    dataIndex: 'img',
    width: '15%',
    key: 'img',
    align: 'center',
    scopedSlots: { customRender: 'img' },
  },
  {
    title: '操作',
    width: '5%',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  data() {
    return {
      paginationOption: {
        pageSizeOptions: ['5', '10', '20', '50'],

        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}篇文章`,
      },
      Artlist: [],
      Catelist: [],
      columns,
      queryParam: { title: '', pageSize: 5, current: 1 },
    }
  },
  created() {
    this.getArtList()
    this.getCateList()
  },
  methods: {
    // 获取所有文章
    async getArtList() {
      const { data: res } = await this.$http.get('articles', {
        params: {
          title: this.queryParam.title,
          pagesize: this.queryParam.pageSize,
          pagenum: this.queryParam.current,
        },
      })
      if (res.status != 200) return this.$message.error(res.message)
      this.Artlist = res.data
      this.paginationOption.total = res.total
    },
    // 获取所有分类
    async getCateList() {
      const { data: res } = await this.$http.get('categorys')
      if (res.status != 200) return this.$message.error(res.message)
      this.Catelist = res.data
      this.paginationOption.total = res.total
    },
    // 删除文章
    deleteArt(id) {
      this.$confirm({
        title: '提示：',
        content: '确定要删除该文章吗?该操作一旦执行无法撤销。',
        onOk: async () => {
          const { data: res } = await this.$http.delete(`article/${id}`)
          if (res.status != 200) return this.$message.error(res.message)
          this.$message.success('删除成功！')
          this.getArtList()
        },
        onCancel: () => {
          this.$message.info('已取消该操作。')
        },
      })
    },
    // 查询分类下的文章
    cateChange(value) {
      this.getCateArt(value)
    },
    async getCateArt(id) {
      const { data: res } = await this.$http.get(`article/catelist/${id}`)
      if (res.status != 200) return this.$message.error(res.message)
      this.Artlist = res.data
      this.paginationOption.total = res.total
    },
  },
}
</script>

<style scoped>
.actionSlot {
  display: flex;
  justify-content: center;
}
.ArtImg img {
  height: 100px;
}
</style>
