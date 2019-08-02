import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import './styles/custom-theme.css'
Vue.use(VueVideoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
