<template>
  <!--<v-app id="chimaney-app" top-toolbar left-fixed-sidebar footer>-->
  <v-app id="chimaney-app" top-toolbar left-sidebar footer light>

    <div v-if="authInitialized">
      <header>
        <main-toolbar v-on:showSideNavbar="showSideNav = !showSideNav"></main-toolbar>
      </header>

      <main-sidebar v-model="showSideNav"></main-sidebar>

      <main>

        <v-container>
          <!--          <v-breadcrumbs divider="/">
                      <v-breadcrumbs-item
                        v-for="item in items" :key="item"
                        :disabled="item.disabled">
                        {{ item.text }}
                      </v-breadcrumbs-item>
                    </v-breadcrumbs>-->

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
  import appSrvc from './services/AppService'
  import firebaseSrvc from './services/FirebaseService'
  import sessionSrvc from './services/SessionService'

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
      appSrvc.init(this.$store)
      firebaseSrvc.init(this.$store)
      sessionSrvc.init(this.$store)
    },
    watch: {
      loggedInUser () {
        if (this.$store.state.loggedInUser != null) {
          appSrvc.onUserLogin(this.$store.state)
        }
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
