import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/index.js'
import currencyFilter from './filters/currencyFilter.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { rtdbPlugin } from 'vuefire'
import ivSlider from 'iv-slider';

Vue.config.productionTip = false
// Vue.use(VueFire)
Vue.use(rtdbPlugin)
Vue.use(ivSlider);
Vue.filter('currencyFilter', currencyFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
