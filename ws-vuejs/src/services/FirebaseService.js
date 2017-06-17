import * as types from '@/store/mutation-types'

var firebase = require('firebase')
var firebaseui = require('firebaseui')

var EventEmitter = require('wolfy87-eventemitter')

export class FirebaseService {
  constructor () {
    this.ee = new EventEmitter()

    this.config = {
      apiKey: CONFIG.firebase.apiKey,
      authDomain: CONFIG.firebase.authDomain,
      databaseURL: CONFIG.firebase.databaseURL,
      storageBucket: CONFIG.firebase.storageBucket,
      messagingSenderId: CONFIG.firebase.messagingSenderId
    }

    this.authUiInitialized = false
  }

  init ($store) {
    this.$store = $store

    if (firebase.apps.length === 0) {
      console.log('initializing firebaseApp')
      this.firebaseApp = firebase.initializeApp(this.config)
    }
    firebase.auth().onAuthStateChanged(this._onAuthStateChanged.bind(this))
    this.firebaseAuthUi = new firebaseui.auth.AuthUI(this.firebaseApp.auth())
  }

  showAuth () {
    // console.log('showAuth')

    // FirebaseUI config.
    var uiConfig = {
      // signInSuccessUrl: '<url-to-redirect-to-on-success>',
      signInFlow: 'popup',
      credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '',
      callbacks: {
        signInSuccess: (currentUser, credential, redirectUrl) => {
          // console.log('signInSuccess', currentUser, credential, redirectUrl)

          this.ee.emitEvent('sign-success')

          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false
        },
        uiShown: () => {
          // console.log('uiShown')
          // The widget is rendered.
          // Hide the loader.
          // document.getElementById('loader').style.display = 'none';
        }
      }

    }

    // if (!this.authUiInitialized) {
    this.firebaseAuthUi.start('#firebaseui-auth-container', uiConfig)
    // this.authUiInitialized = true
    // }
  }

  logout () {
    console.log('logout')
    firebase.auth().signOut().then(() => {
      this.$store.commit(types.AUTH_CHANGE, null)
    }, function (error) {
      // TODO: this.$store.commit('GLOBAL_ERROR', error)
      console.log('Error logging out', error)
    })
  }

  _onAuthStateChanged (user) {
    if (user) {
      console.log('user signed in', user)
      // User is signed in.
      // var displayName = user.displayName
      // var email = user.email
      // var emailVerified = user.emailVerified
      // var photoURL = user.photoURL
      // var uid = user.uid
      // var providerData = user.providerData
      user.getIdToken().then(function (accessToken) {
        // console.log('access token received', accessToken)
        // document.getElementById('sign-in-status').textContent = 'Signed in'
        // document.getElementById('sign-in').textContent = 'Sign out';
        // document.getElementById('account-details').textContent = JSON.stringify({
        //   displayName: displayName,
        //   email: email,
        //   emailVerified: emailVerified,
        //   photoURL: photoURL,
        //   uid: uid,
        //   accessToken: accessToken,
        //   providerData: providerData
        // }, null, '  ')

        this.db = this.firebaseApp.database()
        this.rootRef = this.db.ref()
        this.dbSessionsRef = this.db.ref('sessions')

        // console.log('loggedInUser:', JSON.stringify(this.$store.state.loggedInUser))
        this.$store.commit(types.AUTH_CHANGE, user)

        // this._setupFirebaseReferences(user.uid)

        this.$store.commit(types.AUTH_INITIALIZED, true)
        this.$store.commit(types.AUTH_MODAL_ACTIVE, false)
      }.bind(this))
    } else {
      // User is signed out.
      console.log('signed out')
      // document.getElementById('sign-in-status').textContent = 'Signed out'
      // document.getElementById('sign-in').textContent = 'Sign in'
      // document.getElementById('account-details').textContent = 'null'
      this.$store.commit(types.AUTH_CHANGE, user)
      this.$store.commit(types.AUTH_INITIALIZED, true)
    }
    this.ee.emitEvent('authStateChange')
    return false
  }

  // _setupFirebaseReferences (uid) {
  //   // let userRef = this.getUserRef(uid)
  //   // userRef.update(this.$store.state.loggedInUser)
  //   // this.$store.dispatch('setUserRef', userRef)
  //   //
  //   // let userSessionsRef = this.db.ref('/user_sessions/' + uid).orderByKey().limitToLast(20)
  //   // userSessionsRef.on('child_added', function (snapshot, prevChildKey) {
  //   //   console.log('child_added:', snapshot.key)
  //   //   let sessionRef = this.db.ref('/sessions/' + snapshot.sessionKey)
  //   //   this.$store.dispatch('addUserSessionRef', sessionRef)
  //   // })
  //   //
  //   // userSessionsRef.on('child_removed', function (oldChildSnapshot) {
  //   //   console.log('child_removed:', oldChildSnapshot.key)
  //   //   // this.$store.commit('removeUserSession', snapshot)
  //   // })
  //
  //   // .then(function(snapshot) {
  //   //   snapshot.forEach(function(childSnapshot) {
  //   //     // key will be "ada" the first time and "alan" the second time
  //   //     var key = childSnapshot.key;
  //   //     // childData will be the actual contents of the child
  //   //     var childData = childSnapshot.val();
  //   //   });
  //   // }
  // }

  getDbSession (key) {
    this.db.ref('/sessions/' + key)
  }

  getDbSessionsForUser (userUid) {
    console.log('userUid:' + userUid)

    var path = 'user_sessions/' + userUid
    let dbUserSessionsRef = this.rootRef.child(path).ref
//    let dbUserSessionsRef = this.rootRef.child(path).orderByChild('createdDateTm').ref
    // this.dbUserSessionsRef.push({'test': 'testVal'})
    dbUserSessionsRef.once('value')
      .then(function (dataSnapshot) {
        console.log('Value:', dataSnapshot)
      })

    return dbUserSessionsRef
  }

  getUserRef (userUid) {
    var path = 'users/' + userUid
    let ref = this.rootRef.child(path).ref
    return ref
  }
}

export default new FirebaseService()
