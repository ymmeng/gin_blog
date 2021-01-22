import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
import vuetify from './plugins/vuetify';

import './assets/css/style.css'
import './plugins/editArt'
import './plugins/http'
import './plugins/antUi'


Vue.config.productionTip = false
Vue.use(less)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
