<template>
  <div>
    <v-data-table
      v-bind:headers="headers"
      :items="getPrevSessions"
      hide-actions
      class="elevation-1">
      <template slot="items" scope="props">
        <!--<td style="white-space: nowrap"><a href="">{{ props.item['.key'] }}</a></td>-->
        <td class="nowr">{{ props.item.createdDateTm | formatTsAsDate }}</td>
        <td style="width:100%">
          <router-link :to="'/session/' + props.item['.key']">{{ props.item.topic | capitalize }}</router-link>
        </td>
        <td>
          <v-btn v-on:click.native="deleteSession(props.item['.key'])" error>X</v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import globalFiltersMixin from '../shared/global-filters-mixin'

  import sessionService from '@/services/SessionService'

  export default {
    name: 'PreviousSessionsPanel',
    mixins: [globalFiltersMixin],
    data () {
      return {
        headers: [
          {
            text: 'Created',
            left: true,
            value: 'createdDateTm'
          },
          {
            text: 'Topic',
            left: true,
            value: 'topic'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getPrevSessions'
      ]),
      ...mapState([])
    },
    methods: {
      deleteSession: function (sessionId) {
        // TODO: Need an alert prompt, ideally reuseable
        // i guess flag for  "userConfirmMsg/Showing"? How to react generically though?
        sessionService.deleteSession(sessionId)
      }
    }
  }

</script>
