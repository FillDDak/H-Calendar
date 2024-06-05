import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

axios.defaults.baseURL = '/api'

loadFonts()

var app = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
app.config.globalProperties.$axios = axios
// app.provide('$axios', axios)
app.mount('#app')
app.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
})