import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'

import './assets/scss/style.scss'
import './assets/icons/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


import Card from './views/Card.vue'
Vue.component('m-card', Card)
import ListCard from './views/ListCard.vue'
Vue.component('list-card', ListCard)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
