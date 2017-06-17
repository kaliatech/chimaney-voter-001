<template>
  <v-dialog v-model="showModal">
    <v-card>
      <v-card-text>
        <h2 class="title">Sign In</h2>
      </v-card-text>
      <!--<v-card-text class="subheading grey&#45;&#45;text">Let google help apps determine location. This means sending anonymous-->
      <!--location data to Google, even when no apps are running.-->
      <!--</v-card-text>-->
      <div>
        <div id="firebaseui-auth-container"></div>
      </div>
      <v-card-row actions>
        <v-spacer></v-spacer>
        <v-btn flat light v-on:click.native="showModal = false">Cancel</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import {AUTH_MODAL_ACTIVE} from '@/store/mutation-types'

  export default {
    name: 'LoginModal',
    data () {
      return {
        showModal: false
      }
    },
    computed: mapState([
      'loggedInUser',
      'authModalActive'
    ]),
    methods: {},
    watch: {
      showModal () {
        if (this.showModal !== this.authModalActive) {
          this.$store.commit(AUTH_MODAL_ACTIVE, this.showModal)
        }
      },
      authModalActive (active) {
        console.log(`authModalActive: ${active}`)
        this.showModal = active
      }
    }
  }
</script>
