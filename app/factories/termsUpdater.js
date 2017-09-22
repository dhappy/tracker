app.factory('TermsUpdater', function(Term) {
  function TermsUpdater() {
    var self = this

    self.update = () => {
      return new Promise((resolve, reject) => {
        return Term.findAll().then(
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