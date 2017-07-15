<template>
  <div>
    <v-navigation-drawer v-model="isActive" temporary>
      <v-subheader>Menu</v-subheader>
      <v-list>
        <v-list-item>

            <v-list-tile ripple router href="/">
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile>

        </v-list-item>
        <v-list-item>
          <v-divider/>
          <!--<v-list-tile ripple router href="/session/new">-->
          <v-list-tile ripple @click.native.stop="createNewSession()">
            <v-list-tile-title>Start a Session</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
        <v-list-item>
          <v-divider/>
            <v-list-tile ripple router href="/sessions">
              <v-list-tile-title>Join a Session</v-list-tile-title>
            </v-list-tile>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-tile ripple router href="/settings">
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-tile ripple @click.native.stop="loggedInUser ? signout() : signin()">
            <v-list-tile-title v-if="loggedInUser">Sign Out</v-list-tile-title>
            <v-list-tile-title v-if="!loggedInUser">Sign In</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
        <!--<v-list-item v-for="i in 3" :key="i">-->
        <!--<v-list-tile>-->
        <!--<v-list-tile-title>Item {{ i }}</v-list-tile-title>-->
        <!--</v-list-tile>-->
        <!--</v-list-item>-->

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {AUTH_MODAL_ACTIVE} from '@/store/mutation-types'

  import firebaseSrvc from '../services/FirebaseService'
  import sessionSrvc from '../services/SessionService'

  export default {
    name: 'MainSidebar',
    props: ['value'],
    data () {
      return {
        isActive: false
      }
    },
    computed: mapState([
      'loggedInUser'
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
    },
    watch: {
      isActive () {
        this.$emit('input', this.isActive)
      },
      value () {
        this.isActive = this.value
      }
    }
  }
</script>
