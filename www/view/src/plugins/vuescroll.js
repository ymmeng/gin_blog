import Vue from 'vue'

import vuescroll from 'vuescroll'

// 加载滚动条优化插件
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#cecece', //滚动条颜色
      showDelay: 300, //滚动条显示延迟
      onlyShowBarOnScroll: false //hover显示滚动条
    }
  },
  name: 'VueScroll'
});
