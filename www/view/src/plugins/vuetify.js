import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import light from './vuetify/theme'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: { light },
  },
})
export default vuetify
