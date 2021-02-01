import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import theme from './vuetify/theme'

Vue.use(Vuetify)

Vuetify.config.silent = true

// 由Vuetify（javascript）提供的翻译
import zhHans from 'vuetify/es5/locale/zh-Hans'



const vuetify = new Vuetify({
  // 镜像模式
  rtl: false,
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  theme: theme,
  // iconfont: 'md',
  // icons: {
  //   iconfont: 'mdi',
  //   values: {},
  // },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
})

export default vuetify
