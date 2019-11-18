import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'video.js/dist/video-js.css'
import './styles/custom-theme.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
