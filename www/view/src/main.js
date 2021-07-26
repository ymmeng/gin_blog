import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from '@/router/index'
import vuetify from '@/plugins/vuetify/vuetify';
import aplayer from 'aplayer'
import moment from 'moment'

import './plugins/vuescroll'

import './request/http'
import '@/assets/scss/style.scss'
import './plugins/editArt'
import './plugins/antUi'
import './plugins/veeLiData'

// 日期格式化
Vue.filter('dataFormat', function (inData, outData) {
  return moment(inData).format(outData)
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  aplayer,
  render: h => h(App)
}).$mount('#app')
