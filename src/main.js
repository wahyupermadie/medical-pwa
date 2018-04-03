// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB5Mhhj5oxyWX9d6pteY_cxW1qNfO74i_k",
    libraries: "places" // necessary for places input
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h=>h(App),
})
