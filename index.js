angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',   
        function($stateProvider, $urlRouterProvider) {
            console.log('sp')
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home.html',
                    controller: 'HomeController as ctrl'
                })
            $urlRouterProvider.otherwise('home')
        }
    ])
    .factory('store', function() {
        console.log('store')
        var store = new JSData.DataStore()
        var adapter = new JSDataLocalStorage.LocalStorageAdapter({
            beforeCreate: function(mapper, props, opts) {
                JSDataLocalStorage.LocalStorageAdapter.prototype.beforeCreate.apply(this, arguments)
                props.created_at = new Date()
            },
        })

        store.registerAdapter('localstorage', adapter, { default: true })

        return store
    })
    .service('Activity', function(store) {
        return store.defineMapper('activity', {
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
    .service('Term', function(store) {
        return store.defineMapper('term', {
            relations: {
                hasMany: {
                    event: {
                        localField: 'events',
                        foreignKey: 'term_id',
                    }
                }
            }
        })   
    })
    .service('Event', function(store) {
        return store.defineMapper('event', {
            relations: {
                belongsTo: {
                    activity: {
                        localField: 'activity',
                        foreignKey: 'activity_id',
                    }
                },
                belongsTo: {
                    term: {
                        localField: 'term',
                        foreignKey: 'term_id',
                    }
                }

            }
        })
    })
    .controller('HomeController', function($scope, $mdDialog, $location, Activity, Term, Event, store) {
/*
        Activity.create({ name: 'test' }).then((activity) => {
            console.log(activity.id, activity, activity.events)
            Event.create({ activity: activity }).then((event) => {
                console.log(event, event.activity.name)
            })
        })
*/
        Activity.findAll().then((activities) => {
            $scope.activities = activities
        })
        Term.findAll().then((terms) => {
            $scope.terms = terms
        });
        Event.findAll({}, { with: ['activity'] }).then((events) => {
            $scope.events = events
        })

        this.conditionalAdd = function(event) {
            switch($scope.selectedTab) {
            case 0:
                $mdDialog.show({
                    controller: 'SubstanceController as ctrl',
                    templateUrl: 'addActivity.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then((activity) => {
                    Activity.findAll().then((activities) => {
                        $scope.activities = activities
                    })
                })
                break
            case 1:
                $mdDialog.show({
                    controller: 'TermController as ctrl',
                    templateUrl: 'addTerm.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                .then((term) => {
                    Term.findAll().then((terms) => {
                        $scope.terms = terms
                    })
                })
                break
            case 2:
                break
            }

            $scope.display_time = function(time) {
                return moment(time).format('H:mm:ss')
            }
            
            $scope.labels = ["January", "February", "March", "April",
                             "May", "June", "July"]
            $scope.series = ['Series A', 'Series B']
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 25, 86, 27, 90]
            ]
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' },
                                      { yAxisID: 'y-axis-2' }]
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            }
        }

        this.activitySelected = function(activity) {
            var now = new Date().toISOString()
            activity.lastEvent = now
            var data = {
                activity: activity,
                time: now,
            }
            Event.create(data).then((event) => {
                event.save() // source_id not =serialized
                Event.findAll({}, { with: ['activity'] }).then((events) => {
                    $scope.events = events
                    $scope.selectedTab = 2
                })
            })
        }
        
        this.moodSelected = function(term) {
            $mdDialog.show({
                controller: 'RecordController as ctrl',
                templateUrl: 'recordMood.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    term: term
                }
            })
            .then(function(value) {
                $scope.events.push(value)
                $scope.selectedTab = 2
            },
                function() {}
            )
        }
    })
    .controller('DialogController', function($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide()
        }
        
        $scope.cancel = function() {
            $mdDialog.cancel()
        }
    })
    .controller('TermController', function($scope, $controller, $mdDialog, Term) {
        $controller('DialogController', { $scope: $scope })

        this.returnNew = function() {
            if($scope.name) {
                Term.create({ name: $scope.name, color: $scope.color }).then((term) => {
                    $mdDialog.hide(term)
                })
            }
        }
    })
    .controller('SubstanceController', function($scope, $controller, store, Activity, $mdDialog, $http) {
        $controller('DialogController', { $scope: $scope })

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

        this.returnNew = function() {
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
                    () => {
                        console.warn('Failed to save activity')
                    }
                )
            }
        }
    })
    .controller('RecordController', function($scope, $mdDialog, $controller, term, Event) {
        $controller('DialogController', { $scope: $scope })

        $scope.weight = 0

        $scope.name = term.name
        
        this.returnNew = function() {
            var params = {
                term: term,
                weight: $scope.weight,
                time: new Date()
            }
            Event.create(params).then((event) => {
                console.log(event)
                event.save()
                $mdDialog.hide(event)
            })
        }
    })