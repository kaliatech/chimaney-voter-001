<template>
  <form id="existing-session-frm">
    <v-card style="margin-bottom:1em">
      <v-card-row>
        <v-card-title class="white--text">
          Topic
          <v-spacer></v-spacer>
        </v-card-title>
        <v-btn small primary light>copy session link</v-btn>
        <v-btn small primary light>change topic</v-btn>
      </v-card-row>
      <v-card-text>


        <h5>
          As a something, I want this to do that, so that you can be them.
        </h5>


      </v-card-text>
      <!--<v-card-row actions>-->
      <!--<v-btn flat class="1">Join</v-btn>-->
      <!--</v-card-row>-->
    </v-card>

    <v-card style="margin-bottom:1em">
      <v-card-row class="lighten-3">
        <v-card-title class="white--text">
          Voters
          <v-spacer></v-spacer>
        </v-card-title>
        <v-btn small primary light>Show Votes</v-btn>
        <v-btn small primary light>Reset Votes</v-btn>
      </v-card-row>
      <v-card-text>

        <div class="voter-self">
          <v-layout row>
            <v-flex xs2>
              Josh
            </v-flex>
            <v-flex xs10>

              <v-select
                v-bind:items="voteOptions"
                v-model="selectedVote"
                label="Select"
                class="input-group--focused"
                item-value="text"
              ></v-select>

            </v-flex>


            </v-flex>

          </v-layout>
        </div>

        <hr/>

        <div class="voter">
          <v-layout row>
            <v-flex xs2>
              Andreas Svensson
            </v-flex>
            <v-flex xs2>

              <v-select
                v-bind:items="voteOptions"
                v-model="selectedVote"
                label="Select"
                class="input-group--focused"
                item-value="text"
              ></v-select>

            </v-flex>


            </v-flex>

          </v-layout>
        </div>


      </v-card-text>

      </v-card-row>
    </v-card>

  </form>
</template>

<script>

  import {mapState} from 'vuex'

  import PreviousSessionsPanel from '@/components/PreviousSessionsPanel'

  export default {
    name: 'Session',
    components: {'previous-sessions-panel': PreviousSessionsPanel},
    data () {
      return {
        voteOptions: [1, 13, 21],
        selectedVote: 1,
        headers: [{text: 'id', value: 'key'}, {text: 'topic', value: 'name'}],
        sessionId: this.$route.params.sessionId,
        debugMsg: this.$route.params.sessionId
      }
    },
    created: function () {
      console.log('Session:' + this.sessionId)
    },
    computed: {
      ...mapState([
        'loggedInUser' // store.state.topic
      ])
    },
    methods: {},
    watch: {
      $route: function (to, from) {
//        console.log('to', to)
//        console.log('from', from)
        this.debugMsg = 'route to:' + to.params.sessionId + ', from:' + from.params.sessionId
        this.sessionId = to.params.sessionId
      },
      sessionId: function (to, from) {
        if (this.sessionId === 'new') {
          console.log('Watcher: New session')
        } else {
          console.log('Watcher: Existing session:' + this.sessionId)
        }
      }
    }
  }
</script>
<style lang="stylus">
  /*@formatter:off*/

  @import '../styles/colors'

  /*#existing-session-frm*/
    /*margin-bottom: 2em*/

  /*div.card__row*/
    /*background-color: $theme.info*/

  /*button.btn.primary:focus, button.btn.primary:hover*/
    /*border:2px solid $blue.lighten-2 !important*/


  /*@formatter:on*/
</style>
