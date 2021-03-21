import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import axios from "axios";
import {store} from "./store/store"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  axios,
  store
}).$mount('#app')
