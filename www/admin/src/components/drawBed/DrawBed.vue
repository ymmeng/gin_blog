<template>
  <a-card>
    <a-row :gutter="12">
      <a-upload
        :multiple="true"
        :action="upUrl"
        :headers="headers"
        @change="upChange"
        list-type="picture-card"
        data:{inputType="importValue}"
        accept=".jpg,.png,.gif,.jpeg,.swf,.svg"
      >
        <a-button name="file"> <a-icon type="upload" /> 点击上传图片 </a-button>
      </a-upload>
    </a-row>

    <a-table
      rowKey="id"
      :columns="columns"
      :pagination="paginationOption"
      :dataSource="drawlist"
      bordered
    >
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>

      <span @click="cat(url)" class="ArtImg" slot="url" slot-scope="url">
        <img :src="url" />
      </span>

      <a-button
        slot-scope="data"
        slot="action"
        icon="delete"
        type="danger"
        @click="deleteDraw(data.id)"
        >删除</a-button
      >
    </a-table>
  </a-card>
</template>

<script>
import { Url } from '../../plugin/http'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '5%',
    key: 'id',
    align: 'center',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'IDx' },
  },
  {
    title: '名字',
    dataIndex: 'name',
    width: '5%',
    key: 'name',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: '5%',
    key: 'type',
    align: 'center',
  },
  {
    title: '大小(KB)',
    dataIndex: 'size',
    width: '5%',
    key: 'size',
    align: 'center',
  },
  {
    title: '上传日期',
    dataIndex: 'created_at',
    width: '8%',
    key: 'created_at ',
    align: 'center',
  },
  {
    title: '图片链接',
    dataIndex: 'url',
    width: '8%',
    align: 'center',
    key: 'link',
  },
  {
    title: '图片概念图',
    dataIndex: 'url',
    width: '1%',
    key: 'url',
    align: 'center',
    scopedSlots: { customRender: 'url' },
  },
  {
    title: '操作',
    width: '1%',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
]
import moment from 'moment'
export default {
  data() {
    return {
      columns,
      upUrl: Url + '/upload',
      headers: {},
      drawlist: [],
      drawInfo: {},
      queryParam: { title: '', pageSize: 5, current: 1 },
      paginationOption: {
        pageSizeOptions: ['5', '10', '20', '50'],
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}个图床`,
      },
    }
  },
  created() {
    this.getDraw()
    this.headers = {
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    }
  },
  methods: {
    async getDraw() {
      const { data: res } = await this.$http.get('/drawBeds')
      if (res.status != 200) return this.$message.error(res.message)
      res.data.forEach((img) => {
        img.created_at = moment(img.created_at * 1000).format(
          'YYYY-MM-DD  HH:mm:ss'
        )
      })
      this.drawlist = res.data
      this.paginationOption.total = res.total
    },
    // 删除图床
    deleteDraw(id) {
      this.$confirm({
        title: '提示：',
        keyboard: true,
        centered: true,
        content: () => (
          <div>
            确定要删除该图皮吗?该操作一旦执行
            <span style="color:red;">无法撤销</span>。
          </div>
        ),
        okType: 'danger',
        onOk: async () => {
          const { data: res } = await this.$http.delete(`/drawBed/${id}`)
          if (res.status != 200) return this.$message.error(res.message)
          this.$message.success('删除成功！')
          this.getDraw()
        },
        onCancel: () => {
          this.$message.info('已取消该操作。')
        },
      })
    },
    // 上传图片
    upChange(info) {
      if (info.file.status === 'done') {
        this.drawInfo.name = info.file.name
        this.drawInfo.size = info.file.size / 1000
        this.drawInfo.type = info.file.type
        this.drawInfo.url = info.file.response.url
        this.addDrawBed()
      } else if (info.file.status === 'error') {
        this.$message.error(info.file.response.message)
      }
    },
    // 添加图床
    async addDrawBed() {
      const { data: res } = await this.$http.post('/drawBed/add', this.drawInfo)
      if (res.status != 200) return this.$message.error(res.message)
      this.getDraw()
      this.$message.success('上传图片成功')
    },
    cat(url) {
      window.open(url)
    },
  },
}
</script>

<style lang="less" scoped>
.ArtImg img {
  height: 162px;
  width: 284px;
  cursor: pointer;
}
</style>
