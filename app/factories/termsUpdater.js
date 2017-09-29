app.factory('TermsUpdater', function(Term, Event) {
  function TermsUpdater() {
    var self = this

    self.update = () => {
      return new Promise((resolve, reject) => {
        return Term.findAll({}, { with: ['event'] }).then(
          (terms) => {
            self.terms = terms
            resolve(terms)
          },
          () => {}
        )
      })
    }
    self.update()
  }

  return new TermsUpdater()
})