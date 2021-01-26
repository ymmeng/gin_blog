import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import less from 'less'
import vuetify from './plugins/vuetify';
// import aplayer from 'aplayer'
// import dplayer from 'dplayer'

import './assets/css/style.css'
import './plugins/editArt'
import './plugins/http'
import './plugins/antUi'
import './plugins/vuelidata'


Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
