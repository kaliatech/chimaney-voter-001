import Vue from 'vue'

// Not sure if needed, or if this works. Docs in VuexFire says poly required for IE<11, Android<5, etc.
// eslint-disable-next-line
import weakmap from "weakmap"

import Vuex from 'vuex'
import Icon from 'vue-awesome/components/Icon.vue'

import state from './state'
import {mutations} from './mutations'
import {getters} from './getters'
import {actions} from './actions'

Vue.component('icon', Icon)
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const options = {
  state,
  mutations,
  actions,
  getters: getters,
  modules: {},
  strict: true
}

export default new Vuex.Store(options)

export {options}
