app.controller('MoodsTabController', function($scope, Term) {
  Term.findAll({}, { with: ['events'] }).then((terms) => {
    $scope.terms = terms
  })
})
