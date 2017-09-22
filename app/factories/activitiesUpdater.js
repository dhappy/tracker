app.factory('ActivitiesUpdater', function(Activity, Event) {
  function ActivitiesUpdater() {
    var self = this

    self.update = () => {
      return new Promise((resolve, reject) => {
        Activity.findAll({}, { with: ['events'] }).then(
          (activities) => {
            self.activities = activities
            resolve(activities)
          },
          () => { reject() }
        )
      })
    }
    self.update()
  }

  return new ActivitiesUpdater()
})