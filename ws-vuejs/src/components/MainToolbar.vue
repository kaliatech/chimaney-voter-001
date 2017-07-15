<template>
  <div>
    <v-toolbar light>
      <v-toolbar-side-icon v-on:click.native.stop="$emit('showSideNavbar')"/>

      <v-toolbar-logo class="hidden-xs-only">
        <v-toolbar-title>Chimaney Voter</v-toolbar-title>
      </v-toolbar-logo>

      <v-toolbar-logo class="hidden-sm-and-up">
        <v-toolbar-title>Chimaney</v-toolbar-title>
      </v-toolbar-logo>

      <v-toolbar-items>
        <v-toolbar-item v-if="!loggedInUser" v-on:click.native.stop="signin()">
          Sign In
        </v-toolbar-item>

        <v-toolbar-item v-if="loggedInUser" class="hidden-md-and-up" v-on:click.native.stop="logout()">
                        <!--v-tooltip:bottom="{ html: loggedInUser.displayName}">-->
          <!--<v-btn icon dark v-on:click.native.stop="signin()">-->
          <!--<v-icon>account_circle</v-icon>-->
          <!--</v-btn>-->
          Sign Out

        </v-toolbar-item>

        <v-toolbar-item v-if="loggedInUser" class="hidden-sm-and-down" v-on:click.native.stop="logout()"
                        >
          <img class="user_img" :src="loggedInUser.photoURL"/>
          Sign Out
        </v-toolbar-item>
      </v-toolbar-items>
      <login-modal></login-modal>

    </v-toolbar>
    <v-snackbar
      :timeout="5000"
      :bottom="true"
      v-model="snackbarVisible">
      {{snackbarMessage}}
      <v-btn flat class="pink--text" @click.native="snackbarVisible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {AUTH_MODAL_ACTIVE} from '@/store/mutation-types'

  import LoginModal from '@/components/LoginModal'

  import firebaseSrvc from '../services/FirebaseService'

  export default {
    name: 'MainToolbar',
    components: {'login-modal': LoginModal},
    data () {
      return {
        snackbarVisible: false,
        snackbarMessage: '',
        snackbarMessagePrev: ''
      }
    },
    computed: mapState([
      // map this.topic to store.state.topic
      'topic',
      'loggedInUser'
    ]),
    methods: {
      signin () {
        firebaseSrvc.showAuth()
        this.$store.commit(AUTH_MODAL_ACTIVE, true)
      },
      logout () {
        firebaseSrvc.logout()
      }
    },
    watch: {
      loggedInUser () {
        if (this.loggedInUser != null) {
          this.snackbarMessage = `Signed in as ${this.loggedInUser.displayName}`
        }
        else {
          this.snackbarMessage = 'Signed out'
        }
        if (this.snackbarMessage !== this.snackbarMessagePrev) {
          this.snackbarVisible = true
          this.snackbarMessagePrev = this.snackbarMessage
        }
      }
    }
  }
</script>

<style lang="stylus">
  .user_img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-repeat: no-repeat
    background-position: center center;
    background-size: cover;
    margin-right: 0.5em;
  }
</style>
