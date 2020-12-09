<template>
  <a-card hoverable style="margin-bottom: 20px">
    <template #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </template>
    <template class="ant-card-actions" #actions>
      <!-- <setting-outlined key="setting" />
      <edit-outlined key="edit" />
      <ellipsis-outlined key="ellipsis" /> -->
    </template>
    <a-card-meta title="Card title" description="This is the description">
      <template #avatar>
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons-vue'
export default {
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
}
</script>