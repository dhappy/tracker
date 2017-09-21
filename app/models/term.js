app.service('Term', function(store) {
  return store.defineMapper('term', {
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        type: {
          type: 'string',
          get() { return 'term' },
        },
        color: { type: 'string' },
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
          foreignKey: 'term_id',
        },
      },
    }
  })
})
