app.factory('ActivitiesUpdater', function(Activity) {
  function ActivitiesUpdater() {
    var self = this

    self.update = () => {
      Activity.findAll({}, { with: ['events'] }).then((activities) => {
        self.activities = activities
      })
    }
    self.update()
  }

  return new ActivitiesUpdater()
})