import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
// 1.4.12
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
