import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'

Vue.use(VModal)

Vue.directive('numericOnly', {
  bind(el: HTMLElement) {
    const regex = /^[0-9]*$/
    if (el instanceof HTMLInputElement) {
      el.addEventListener('keyup', () => {
        if (!regex.test(el.value)) {
          el.value = el.value.slice(0, -1)
        }
      })
    }
  },
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
