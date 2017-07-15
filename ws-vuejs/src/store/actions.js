import * as types from './mutation-types'
import {firebaseAction} from 'vuexfire'
import firebaseSvrc from '../services/FirebaseService'

export const actions = {
  setUserRef: firebaseAction(({bindFirebaseRef}, ref) => {
    return new Promise((resolve, reject) => {
      bindFirebaseRef('userRef', ref, {
        readyCallback: () => {
          resolve()
        }
      })
    })
  }),
  setupSessionRef: firebaseAction((ctx, sessionKey) => {
    ctx.commit(types.CREATE_SESSION_REF_PLACEHOLDER, sessionKey)
    return new Promise((resolve, reject) => {
      let sessionRef = firebaseSvrc.rootRef.child('/sessions/' + sessionKey).ref
      ctx.bindFirebaseRef('session_' + sessionKey, sessionRef, {
        readyCallback: () => {
          // These don't work. The new object isn't reactive to firebase.
          // ctx.state.sessions[sessionKey] = ctx.state['session_' + sessionKey]
          // Vue.set(ctx.state.sessions, sessionKey, ctx.state['session_' + sessionKey])
          // ctx.commit('ADD_PREV_SESSION', ctx.state['session_' + sessionKey])
          // ctx.bindFirebaseRef('sessions.' + sessionRef.key, sessionRef)
          resolve()
        }
      })
    })
  }),
  createSession: firebaseAction((ctx, ref) => {
    return new Promise((resolve, reject) => {
      // TODO: Would like to do this, but Vuexfire seems unable to bind to nested properties
      // ctx.state.sessions[ref.key] = {}

      // So instead, we add empty root property placeholder before binding the reference
      ctx.commit(types.CREATE_SESSION_REF_PLACEHOLDER, ref.key)
      ctx.bindFirebaseRef('session_' + ref.key, ref)

      // The new session is now the current session
      ctx.commit(types.SET_CURRENT_SESSION, ref.key)

      // if (!ctx.state.userRef.prevUserSessionKeys) {
      //   ctx.state.userRef.prevUserSessionKeys = []
      //   ctx.state.userRef.prevUserSessionKeys.push({'.key': ref.key, value: true})
      // }

      firebaseSvrc.db.ref('/users/' + ctx.state.userRef.uid + '/prevUserSessionKeys/' + ref.key)
        .set(true)
        .then(() => {
          resolve()
        })
    })
  }),
  joinSession: firebaseAction((ctx, sessionKey) => {
    return new Promise((resolve, reject) => {
      // Check if session is in store already
      let sessionRef = ctx.state['session_' + sessionKey]
      if (!sessionRef) {
        console.log('Acquiring session ref')
        // ctx.dispatch('setupSessionRef', sessionKey).then(() => {
        //   sessionRef = ctx.state['session_' + sessionKey]
        //   firebaseSvrc.db.ref('/users/' + ctx.state.userRef.uid + '/prevUserSessionKeys/' + sessionRef.key)
        //     .set(true)
        //     .then(() => {
        //       resolve()
        //     })
        // })
        sessionRef = firebaseSvrc.db.ref('/sessions/' + sessionKey)
        ctx.dispatch('createSession', sessionRef)
      }
      else {
        // TODO: factor this out in to something reuseable

        // This session is now the current session
        ctx.commit(types.SET_CURRENT_SESSION, sessionRef.key)

        // Check first if already in user's previous session?
        firebaseSvrc.db.ref('/users/' + ctx.state.userRef.uid + '/prevUserSessionKeys/' + sessionRef.key)
          .set(true)
          .then(() => {
            resolve()
          })
      }
    })
  })
}
