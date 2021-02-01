<template>
  <div>
    <router-view />
    <!-- 全局引入一键置顶按钮 -->
    <ToTop></ToTop>
  </div>
</template>


<script>
import ToTop from "./components/Utils/GotoTop";
export default {
  components: {
    ToTop,
  },
};
</script>