app.service('Event', function(store) {
  return store.defineMapper('event', {
    schema: {
      properties: {
        id: { type: 'string' },
        time: { type: 'string' },
        activity_id: { type: 'string' },
        term_id: { type: 'string' },
        weight: { type: ['number', 'null'] },
        source: {
          get() {
            return this.activity || this.term
          }
        },
        display_time: {
          get() {
            return moment(this.time).format('H:mm:ss')
          }
        },
      },
    },
    relations: {
      belongsTo: {
        activity: {
          localField: 'activity',
          foreignKey: 'activity_id',
        },
        term: {
          localField: 'term',
          foreignKey: 'term_id',
        },
      },
    },
  })
})
