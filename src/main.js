import Vue from 'vue'
import miniVueBarrage from '../dist/lib/index'
import '../dist/lib/mini-vue-barrage.css'
import App from './App.vue'
Vue.use(miniVueBarrage)

new Vue({
  render: h => h(App)
}).$mount('#app')