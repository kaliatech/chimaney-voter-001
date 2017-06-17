export default class Session {
  constructor () {
    this.uid = null
    this.members = {}
    this.topic = ''
    this.votes = {}
    this.history = {}
  }
}
