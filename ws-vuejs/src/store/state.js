import Topic from './entities/Topic'

export const STORAGE_KEY = 'chimaney-voter'

let state = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ||
  {
    authInitialized: false,
    authModalActive: false,
    topic: new Topic('This is a test topic'),
    loggedInUser: null,

    // firebase
    userRef: null

    // userRef: {
    //   loginName: ""
    //   displayName: ""
    //   displayName_alt: ""
    //   prevUserSessionKeys: {
    //     session1Key: true
    //     sessionXKey: true
    //   }
    // }

    // session_{key}: {
    //   topic: "",
    //   created: new Date(),
    //
    // }

  }

export default state
