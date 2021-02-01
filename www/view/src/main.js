import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import aplayer from 'aplayer'
import moment from 'moment'

import './assets/css/style.css'
import './plugins/editArt'
import './plugins/http'
import './plugins/antUi'
import './plugins/vuelidata'

Vue.filter('dataFormat',function(indata,outdata){
  return moment(indata).format(outdata)
})

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  aplayer,
  render: h => h(App)
}).$mount('#app')
