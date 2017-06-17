<template>
  <div>

    <h1>Not Found</h1>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'NotFound',
    data () {
      return {
      }
    },
    computed: mapState([
      'loggedInUser' // store.state.topic
    ]),
    methods: {
    }
  }
</script>
