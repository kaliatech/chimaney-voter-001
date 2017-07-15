// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import appSrvc from './services/AppService'
import firebaseSrvc from './services/FirebaseService'
import sessionSrvc from './services/SessionService'

Vue.config.productionTip = false

Vue.use(Vuetify)

appSrvc.init(store)
firebaseSrvc.init(store)
sessionSrvc.init(store)

firebaseSrvc.ee.addListener('authStateChange', () => {
  if (store.state.loggedInUser != null) {
    appSrvc.onUserLogin(store.state).then(() => {
      /* eslint-disable no-new */
      new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {App}
      })
    })
  }
})
