app.factory('EventsUpdater', function(Event) {
  function EventsUpdater() {
    var self = this

    function groupByDay(events) {
      var byDay = events.reduce((ret, event) => {
        var day = moment(event.time).startOf('day').format()
        ;(ret[day] = ret[day] || []).push(event)
        return ret
      }, {})
      var out = []
      for(date in byDay) {
        out.push({
          display_text: date,
          events: byDay[date],
        })
      }
      return out
    }

    self.update = () => new Promise(
      (resolve, reject) => {
        Event.findAll({}, { with: ['activity', 'term'] }).then(
          (events) => {
            events.byDay = groupByDay(events)
            self.events = events
            resolve(events)
          },
          () => { reject() }
        )
      }
    )
    self.update()
  }

  return new EventsUpdater()
})