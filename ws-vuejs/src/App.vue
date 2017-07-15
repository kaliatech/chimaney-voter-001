<template>
  <!--<v-app id="chimaney-app" top-toolbar left-fixed-sidebar footer>-->
  <v-app id="chimaney-app" top-toolbar left-sidebar footer light>

    <div v-if="authInitialized">
      <header>
        <main-toolbar v-on:showSideNavbar="showSideNav = !showSideNav"></main-toolbar>
        <!--
                <v-breadcrumbs divider="/">
                  &lt;!&ndash;<v-breadcrumbs-item&ndash;&gt;
                    &lt;!&ndash;v-for="item in items" :key="item"&ndash;&gt;
                    &lt;!&ndash;:disabled="item.disabled">&ndash;&gt;
                    &lt;!&ndash;{{ item.text }}&ndash;&gt;
                  &lt;!&ndash;</v-breadcrumbs-item>&ndash;&gt;
                  <v-breadcrumbs-item>Session - KlEKyNk2g9X7yR08eFo</v-breadcrumbs-item>
                  <v-breadcrumbs-item>Topic - As a user, I want this to... </v-breadcrumbs-item>
                </v-breadcrumbs>
        -->

      </header>

      <main-sidebar v-model="showSideNav"></main-sidebar>

      <main>

        <v-container fluid>

          <router-view></router-view>

        </v-container>

      </main>

      <main-footer/>

    </div>
    <div v-else>
      Initializing...
    </div>

  </v-app>
</template>

<script>
  import MainToolbar from './components/MainToolbar.vue'
  import MainSideNavbar from './components/MainSidebar.vue'
  import MainFooter from './components/MainFooter.vue'

  import 'vue-awesome/icons'

  export default {
    name: 'chimaney-app',
    components: {
      'main-sidebar': MainSideNavbar,
      'main-toolbar': MainToolbar,
      'main-footer': MainFooter
    },
    data: function () {
      return {
        showSideNav: false,
        items: [{'text': '/test1a'}, {'text': 'test2a'}]
      }
    },
    computed: {
      authInitialized () {
        return this.$store.state.authInitialized
      },
      loggedInUser () {
        return this.$store.state.loggedInUser
      }
    },
    mounted: function () {
//      if (this.$store.state.loggedInUser != null) {
//        console.log('loggedInUser', this.$store.state.loggedInUser)
//        appSrvc.onUserLogin(this.$store.state)
//      }
    },
    watch: {
      loggedInUser () {
      }
    }
  }
</script>

<style lang="stylus">
  /*@formatter:off*/

  @import './styles/colors'
  @import '../node_modules/vuetify/src/stylus/main'


  .breadcrumbs
    justify-content: flex-start

  .fa-icon
    width: auto
    color: white
    /*font-size: 24px*/
    height:  1.7em
    vertical-align:middle

  .footer-left
    flex:1

  .footer-right
    text-align: right
    color: white

  .nowr
    white-space: nowrap
  /*@formatter:on*/

</style>
