angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.service('Activity', function(store) {
  return store.defineMapper('activity', {
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string' },
        type: {
          type: 'string',
          get() { return 'activity' },
        },
        lastEvent: {
          type: 'string',
          get() {
            if(this.events.length === 0) {
              return undefined
            }
            function compare(a, b) {
              return b.time.localeCompare(a.time)
            }
            var events = this.events.sort(compare)
            return this.events[0].time
          },
        },
      },
    },
    relations: {
      hasMany: {
        event: {
          localField: 'events',
          foreignKey: 'activity_id',
        }
      }
    }
  })
})
