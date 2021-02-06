import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify';
import aplayer from 'aplayer'
import moment from 'moment'

import './assets/css/style.css'
import './plugins/editArt'
import './plugins/http'
import './plugins/antUi'
import './plugins/veelidata'

// 日期格式化
Vue.filter('dataFormat',function(inData,outData){
  return moment(inData).format(outData)
})

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  aplayer,
  render: h => h(App)
}).$mount('#app')
