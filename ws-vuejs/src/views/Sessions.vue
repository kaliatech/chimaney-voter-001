<template>
  <div>

    <form id="existing-session-frm">
      <v-card>
        <v-card-row class="lighten-1">
          <v-card-title class="white--text">
            Join Existing Session
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card-row>
        <v-card-text>
          <v-card-row>

            <!--<v-col xs1>-->
            <!--<v-icon class="mr-5">card_membership</v-icon>-->
            <!--</v-col>-->
            <!--<v-col xs4>-->
            <!--<v-subheader>Existing Session ID</v-subheader>-->
            <!--</v-col>-->

            <v-text-field name="existingSessionId" label="session ID" prepend-icon="card_membership"
                          :autofocus="true" v-model="joinSessionId"></v-text-field>
            <div style="margin-left:56px">
              <v-btn v-on:click.native="joinSession" primary>Join2</v-btn>
            </div>


          </v-card-row>
        </v-card-text>
        <!--<v-card-row actions>-->
        <!--<v-btn flat class="1">Join</v-btn>-->
        <!--</v-card-row>-->
      </v-card>

    </form>

    <v-card>
      <v-card-row class="lighten-1">
        <v-card-title class="white--text">
          Previous Voting Sessions
        </v-card-title>
      </v-card-row>
      <previous-sessions-panel></previous-sessions-panel>
    </v-card>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import globalFiltersMixin from '../shared/global-filters-mixin'

  import PreviousSessionsPanel from '@/components/PreviousSessionsPanel'

  // import sessionService from '@/services/SessionService'

  export default {
    name: 'Sessions',
    components: {'previous-sessions-panel': PreviousSessionsPanel},
    mixins: [globalFiltersMixin],
    data () {
      return {
        joinSessionId: 'test'
      }
    },
    computed: {
      prevUserSessions () {
        return this.$store.getters.getPrevSessions
      },
      ...mapState([
        'loggedInUser', // store.state.loggedInUser
        'userRef'
      ])
    },
    methods: {
      joinSession: function (evt) {
        // sessionService.joinExistingSession(this.joinSessionId).then(() => {
        this.$router.push({path: 'session/' + this.joinSessionId})
        // })
      }
    }
  }
</script>
<style lang="stylus">
  /*@formatter:off*/

  @import '../styles/colors'

  /*@formatter:off*/
  #existing-session-frm
    margin-bottom: 2em

  div.card__row
    background-color: $theme.info

  button.btn.primary:focus, button.btn.primary:hover
    border:2px solid $blue.lighten-2 !important


  /*@formatter:on*/
</style>
