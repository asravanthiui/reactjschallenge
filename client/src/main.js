import Vue from 'vue'
import App from './App.vue'
import Athlete from './components/Athlete.vue'
import FileUpload from './components/FileUpload.vue'
import Athletes from './components/Athletes.vue'
import axios from 'axios'
import FlashMessage from '@smartweb/vue-flash-message';
import VueRouter from 'vue-router'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(FlashMessage);

Vue.prototype.$hostname = 'http://localhost:3000'


// Router configurations
let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '', component: Athletes},
    { path: '/athletics', component: Athletes},
    { path: '/upload', component: FileUpload},
    { path: '/athletic/:id', component: Athlete }
  ] });

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')