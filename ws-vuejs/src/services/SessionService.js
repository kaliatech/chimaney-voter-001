import firebaseSvc from './FirebaseService'

var EventEmitter = require('wolfy87-eventemitter')

export class SessionService {
  constructor () {
    this.ee = new EventEmitter()
  }

  init ($store) {
    this.$store = $store
  }

  createNewSession () {
    let userRef = this.$store.state.userRef

    return new Promise((resolve, reject) => {
      let session = {}
      session.ownerUserId = userRef['.key']
      session.topic = 'New topic2...'
      session.createdDateTm = new Date().getTime() // todo: add /.info/serverTimeOffset?

      let sessionsRef = firebaseSvc.db.ref('/sessions')
      sessionsRef.push(session).then((ref) => {
        console.log('new key:', ref.key)
        this.$store.dispatch('createSession', ref).then(() => {
          resolve(ref.key)
        })
      })
    })

    // if (userRef.val)
    // let userSessionsRef = this.db.ref('/user_sessions/' + uid).orderByKey().limitToLast(20)
    // this.$store.dispatch('setUserToSessionsRef', userRef)
  }
}

export default new SessionService()
