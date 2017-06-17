import moment from 'moment'

export default {
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    },
    formatTsAsDate: function (value) {
      let date = new Date(value)
      return moment(date).format('YYYY-MM-DD hh:mm a')
    }
  }
}
