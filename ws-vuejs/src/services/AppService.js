// var firebase = require('firebase')
// var firebaseui = require('firebaseui')
import * as types from '@/store/mutation-types'
import firebaseSrvc from './FirebaseService'

var EventEmitter = require('wolfy87-eventemitter')

export class AppService {
  constructor () {
    this.ee = new EventEmitter()
  }

  init ($store) {
    this.$store = $store
  }

  onUserLogin (state) {
    let loggedInUser = this.$store.state.loggedInUser

    let userRef = firebaseSrvc.getUserRef(loggedInUser.uid)
    userRef.update(this.$store.state.loggedInUser).then(() => {
      if (!loggedInUser.altDisplayName) {
        userRef.child('displayNameAlt').set(loggedInUser.displayName + '-alt')
      }
      this.$store.dispatch('setUserRef', userRef).then(() => {
        // console.log('userRef', state.userRef)
        // console.log('userRef.displayName', this.$store.state.userRef.displayName)
        // userRef.once('value').then((snapshot) => {
        //   console.log('snapshot', snapshot.val())
        // })
        let prevSessionKeys = this.$store.state.userRef.prevUserSessionKeys
        for (let sessionKey in prevSessionKeys) {
          this.$store.commit(types.CREATE_SESSION_REF_PLACEHOLDER, sessionKey)
          // this.$store.bindFirebaseRef('session_' + sessionKey, ref)
          // let ref = firebaseSrvc.rootRef.child('sessions/' + sessionKey).ref
          this.$store.dispatch('setupSessionRef', sessionKey)
        }
      })
    })
    // if (userRef.val)

    // let userSessionsRef = this.db.ref('/user_sessions/' + uid).orderByKey().limitToLast(20)
    // this.$store.dispatch('setUserToSessionsRef', userRef)
  }
}

export default new AppService()
