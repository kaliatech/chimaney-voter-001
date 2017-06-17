export const getters = {
  getPrevSessions: state => {
    let prevSessions = []
    if (state.userRef === null || state.userRef.prevUserSessionKeys === null) {
      return prevSessions
    }
    for (let prevKey in state.userRef.prevUserSessionKeys) {
      let session = state['session_' + prevKey]
      if (session && session.createdDateTm) {
        prevSessions.push(session)
      }
    }
    return prevSessions
  }
}
