import firebaseSrvc from './FirebaseService'

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

      let sessionsRef = firebaseSrvc.db.ref('/sessions')
      sessionsRef.push(session).then((ref) => {
        console.log('New session key:', ref.key)
        this.$store.dispatch('createSession', ref).then(() => {
          resolve(ref.key)
        })
      })
    })

    // if (userRef.val)
    // let userSessionsRef = this.db.ref('/user_sessions/' + uid).orderByKey().limitToLast(20)
    // this.$store.dispatch('setUserToSessionsRef', userRef)
  }

  joinExistingSession (key) {
    return new Promise((resolve, reject) => {
      this.$store.dispatch('joinSession', key).then((ref) => {
        resolve(ref)
      })
    })
  }

  deleteSession (key) {
    console.log('delete sessionId', key)

    firebaseSrvc.db.ref('/users/' + this.$store.state.userRef.uid + '/prevUserSessionKeys' + key).remove()

    // TODO: Delete, or only remove from prevUserSessionKeys?

    let sessionRef = firebaseSrvc.db.ref('/sessions/' + key)
    sessionRef.remove()

    // TODO: need to delete/remove from the vuex store
  }
}

export default new SessionService()
