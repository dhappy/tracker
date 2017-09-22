app.factory('TermsUpdater', function(Term) {
  function TermsUpdater() {
    var self = this

    self.update = () => {
      return Term.findAll().then((terms) => {
        self.terms = terms
      })
    }
    self.update()
  }

  return new TermsUpdater()
})