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
        <td style="width:100%"><router-link :to="'/session/' + props.item['.key']">{{ props.item.topic | capitalize }}</router-link></td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import globalFiltersMixin from '../shared/global-filters-mixin'

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
    }
  }

</script>
