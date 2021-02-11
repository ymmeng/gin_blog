import Vue from 'vue'
import App from './App.vue'
import router from './router'
import less from 'less'
import moment from 'moment'

import './assets/css/style.css'
import './plugin/antUi.js'
import './plugin/http.js'
import './plugin/editArt.js'

// 日期格式化
Vue.filter('dataFormat', (inData, outData) => {
  return moment(inData).format(outData)
})

Vue.config.productionTip = false
Vue.use(less)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
