import Vue from 'vue'
import Env from '../.env.js'

const envPlugin = {
  install: (Vue) => {
    Vue.env = {...Env}
    Vue.prototype.$env = Vue.env
  }
}

Vue.use(envPlugin)
