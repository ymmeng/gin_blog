import Vue from 'vue'
import App from './App.vue'
import router from './router'
import less from 'less'
import store from './store'

import './assets/css/style.css'

import './plugin/antUi.js'
import './plugin/http.js'
import './plugin/editArt.js'

Vue.config.productionTip = false
Vue.use(less)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
