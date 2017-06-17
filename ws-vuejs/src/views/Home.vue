<template>
  <div>

    <!--<div class="title">Welcome to the Chimaney Voter</div>-->

    <!--<v-card class="blue darken-1 white&#45;&#45;text">-->
    <!--<v-card-text>-->
    <p>Chimany Voter is an online distributed team voting app. It's especially useful for planning poker sessions
      in sprint planning meetings.</p>
    <!--</v-card-text>-->
    <!--</v-card>-->

    <!--<v-card class="">-->
    <div style="text-align: center">
      <div v-if="!loggedInUser">
        <v-btn light info v-on:click.native.stop="signin()">SIGN IN</v-btn>
        <br/>
        <small>(optional)</small>
        <br/>

        or

      </div>

      <div v-if="loggedInUser">
        <!--Signed in as: <strong>{{loggedInUser.displayName}}</strong><br/>-->
        <!--<v-btn info v-on:click.native.stop="signout()">SIGN OUT</v-btn>-->

        <p>You are signed in as: <strong> {{loggedInUser.displayName}} </strong></p>

      </div>

      <div>
        <!--<v-btn info router to="/session/new">START NEW SESSION</v-btn>-->
        <v-btn light info v-on:click.native.stop="createNewSession()">START NEW SESSION</v-btn>
      </div>

      or

      <div>
        <v-btn light info router to="/sessions">JOIN EXISTING SESSION</v-btn>
      </div>

    </div>

    <br/>
    <br/>

    <p>
      Developed using <a href="https://vuejs.org/">Vue.js</a>, <a href="https://vuetifyjs.com/">Vuetify</a>, and <a
      href="https://firebase.google.com/">Firebase</a>. Free to use up until the free firebase limits are hit.
      It's also easy to self-host. If interested in self hosting, see the readme in github repo.

    </p>

    <p>If this app doesn't meet your needs, or even it does, be sure to also check out the similar and excellent <a
      href="https://www.pointingpoker.com/">Pointing Poker</a> site by Matt Rowue.</p>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import firebaseSrvc from '../services/FirebaseService'
  import sessionSrvc from '../services/SessionService'

  import {AUTH_MODAL_ACTIVE} from '@/store/mutation-types'

  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to the Chimaney Voter'
      }
    },
    computed: mapState([
      'loggedInUser' // store.state.topic
    ]),
    methods: {
      createNewSession () {
        sessionSrvc.createNewSession().then((sessionKey) => {
          this.$router.push({path: '/session/' + sessionKey})
        })
      },
      signin () {
        firebaseSrvc.showAuth()
        this.$store.commit(AUTH_MODAL_ACTIVE, true)
      },
      signout () {
        firebaseSrvc.logout()
      }
    }
  }
</script>
