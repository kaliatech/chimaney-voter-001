import Vue from 'vue'
import Router from 'vue-router'
import * as views from '@/views/barrel'
import store from '../store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: views.Home
    },
    {
      path: '/session/:sessionId',
      name: 'session',
      component: views.Session
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: views.Sessions
    },
    {
      path: '*',
      name: 'NotFound',
      component: views.NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  // console.log('next', next)
  if (to.path !== '/' && !store.state.loggedInUser) {
    next('/')
  } else {
    next()
  }
})

export default router
