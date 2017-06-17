import Vue from 'vue'
import * as types from './mutation-types'
import User from './entities/User'
import {firebaseMutations} from 'vuexfire'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const mutations = {
  [types.AUTH_CHANGE] (state, fbUser) {
    let user = null
    if (fbUser) {
      user = new User()
      Object.keys(user).forEach(function (k) {
        user[k] = fbUser[k]
      })
      // Alternatively, if switch to lodash
      // _.extend(a, _.pick(b, _.keys(a)));
    }
    state.loggedInUser = user
  },
  [types.AUTH_INITIALIZED] (state, payload) {
    state.authInitialized = payload
  },
  [types.CHANGE_TOPIC] (state, payload) {
  },
  [types.AUTH_MODAL_ACTIVE] (state, active) {
    state.authModalActive = active
  },
  // [types.ADD_SESSION_KEY] (state, sessionKey) {
  //   if (state.sessions.indexOf(sessionKey) === -1) {
  //     state.sessions.push(sessionKey)
  //   }
  // },
  [types.CREATE_SESSION_REF_PLACEHOLDER] (state, sessionKey) {
    // Not reactive:
    // state['session_' + sessionKey] = {}

    // Reactive:
    Vue.set(state, 'session_' + sessionKey, {})
  },
  [types.SET_CURRENT_SESSION] (state, sessionKey) {
    state.currentSessionKey = sessionKey
  },
  ...firebaseMutations
}
