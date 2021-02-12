import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import vuetify from '@/plugins/vuetify/vuetify';
import aplayer from 'aplayer'
import moment from 'moment'

import '@/assets/scss/style.scss'
import './plugins/editArt'
import './request/http'
import './plugins/antUi'
import './plugins/veeLiData'

// 日期格式化
Vue.filter('dataFormat', function (inData, outData) {
  return moment(inData).format(outData)
})

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  aplayer,
  render: h => h(App)
}).$mount('#app')
