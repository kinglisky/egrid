import Main from './main.vue'
import methods from './methods'
Main.install = function (Vue) {
  Vue.component(Main.name, Main)
}
Main._mixinsMethods = methods
export default Main
