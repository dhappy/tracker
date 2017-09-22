app.controller('SubstanceController', function($scope, $controller, store, Activity, $mdDialog, $http, activity) {
  $controller('DialogController', { $scope: $scope })

  if(activity) {
    $scope.name = activity.name
    $scope.color = activity.color
    $scope.activity = activity
    $scope.function = 'Save'
  } else {
    $scope.function = 'Create'
  }

  this.querySearch = function(text) {
    return new Promise(function(resolve, reject) {
      var query =
      'SELECT DISTINCT'
      + ' ?item ?name (REPLACE(STR(?item),".*Q","Q") AS ?qid)'
      + ' WHERE {'
      + '  ?item wdt:P31/wdt:P279* wd:Q8386.'
      + '  ?item rdfs:label ?name.'
      + '  FILTER(LANG(?name) = "en")'
      + `  FILTER(STRSTARTS(lcase(?name), lcase("${text}")))`  
      + '} LIMIT 15'
      var url = `https://query.wikidata.org/sparql?query=${query}`
      $http.get(url).then(function(result) {
        resolve(result.data.results.bindings)
      },
      function() {
        reject()
      })
    })
  }

  this.processReturn = function(activity) {
    if(activity) {
      activity.name = $scope.name
      activity.color = $scope.color
      activity.save()
      $mdDialog.hide(activity)
    } else {
      if($scope.name) {
        var data = {
          name: $scope.name,
          color: $scope.color,
        }

        if($scope.substance) {
          data['qid'] = $scope.substance.qid.value
        }

        Activity.create(data).then(
          (activity) => {
            $mdDialog.hide(activity)
          },
          () => { console.warn('Failed to save activity') }
        )
      }
    }
  }
})
