<template>
  <form id="existing-session-frm">
    <!--<div>-->
    <!--Session <span v-html="sessionId"></span>-->
    <!--<small>(<a href="">copy</a>)</small>-->
    <!--<v-btn small primary light>copy session link</v-btn>-->
    <!--</div>-->

    <v-tabs id="mobile-tabs-4" light>
      <v-tabs-bar slot="activators">
        <v-tabs-slider></v-tabs-slider>
        <v-tabs-item href="#tab-curr-topic">
          TOPIC
          <!--<v-icon>phone</v-icon>-->
        </v-tabs-item>
        <v-tabs-item href="#tab-recent-topics">
          HISTORY
          <!--<v-icon>favorite</v-icon>-->
        </v-tabs-item>
        <v-tabs-item href="#tab-settings">
          SETTINGS
          <!--<v-icon>account_box</v-icon>-->
        </v-tabs-item>
      </v-tabs-bar>

      <v-tabs-content id="tab-curr-topic">

        <!-- ---------------------------------------------------------  -->

        <!--<v-card-row>-->
        <!--<v-card-title class="white&#45;&#45;text">-->
        <!--Current Topic-->
        <!--<v-spacer></v-spacer>-->
        <!--</v-card-title>-->
        <!--<v-btn small primary light right>change topic</v-btn>-->
        <!--</v-card-row>-->
        <v-card>
          <v-layout row wrap>

            <v-flex xs9>

              <h6 class="pa-3">
                As a user, I want this to do that, so that I can be happy.
              </h6>

            </v-flex>
            <v-flex xs3 text-xs-right>
              <v-btn small primary light>change topic</v-btn>
            </v-flex>

            <v-flex xs12>

              <v-card>

                <v-layout wrap>
                  <v-flex xs3>
                    <h6 class="pa-3">
                      Votes
                    </h6>

                  </v-flex>
                  <v-flex xs9 text-xs-right>
                    <v-btn small primary light>Show Votes</v-btn>
                    <v-btn small primary light>Reset Votes</v-btn>
                  </v-flex>

                  <v-flex xs12>

                    <div class="voter-self ma-3">
                      <v-layout row>
                        <v-flex xs2>
                          Josh
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

                      </v-layout>
                    </div>

                    <hr/>

                    <div class="voter ma-3">
                      <v-layout row>
                        <v-flex xs2>
                          Bob
                        </v-flex>
                        <v-flex xs2>

                          <div>
                            {...}
                          </div>
                        </v-flex>


                      </v-layout>
                    </div>


                    <div class="voter ma-3">
                      <v-layout row>
                        <v-flex xs2>
                          Jim
                        </v-flex>
                        <v-flex xs2>

                          <div>
                            {...}
                          </div>
                        </v-flex>


                      </v-layout>
                    </div>


                  </v-flex>


                </v-layout>
              </v-card>

            </v-flex>

          </v-layout>
        </v-card>
        <!-- ---------------------------------------------------------  -->


      </v-tabs-content>

      <v-tabs-content id="tab-recent-topics">
        <v-card flat>
          <v-card-text>Recents Topics</v-card-text>
        </v-card>
      </v-tabs-content>

      <v-tabs-content id="tab-settings">
        <v-card flat>
          <v-card-text>Settings</v-card-text>
        </v-card>
      </v-tabs-content>

    </v-tabs>

  </form>

</template>

<script>

  import {mapState} from 'vuex'

  import PreviousSessionsPanel from '@/components/PreviousSessionsPanel'

  import SessionService from '@/services/SessionService'

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
      this.joinSession()
    },
    computed: {
      ...mapState([
        'loggedInUser' // store.state.topic
      ])
    },
    methods: {
      joinSession: function () {
        console.log('joinSession')
        SessionService.joinExistingSession(this.sessionId).then(() => {
          console.log('Existing session joined')
        }).catch(reason => {
          console.log('Error joining existing session. Reason:', reason)
        })
      }
    },
    watch: {
      '$route': function (to, from) {
        console.log('route watch')
        // this.debugMsg = 'route to:' + to.params.sessionId + ', from:' + from.params.sessionId
        this.sessionId = to.params.sessionId
        this.joinSession()
      },
      sessionId: function () {
        if (this.sessionId === 'new') {
          console.log('Watcher: New session')
        }
        else {
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
