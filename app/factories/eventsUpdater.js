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

    self.update = () => {
        return Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
          self.events = events
          self.eventsByDay = groupByDay(events)
        })
    }
    self.update()
  }

  return new EventsUpdater()
})