angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',   
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home.html',
                    controller: 'HomeController as ctrl'
                })

            $urlRouterProvider.otherwise('home')
        }
    ])
    .service('adapter', function() {
        var adapter = new JSDataLocalStorage.LocalStorageAdapter({  
            beforeCreate: function(mapper, props, opts) {
                JSDataLocalStorage.LocalStorageAdapter.prototype.beforeCreate.apply(this, arguments)
                props.created_at = new Date()
            },
        })
        return adapter
    })
    .factory('store', function(adapter) {
        var store = new JSData.DataStore()

        store.registerAdapter('localstorage', adapter, { default: true })

        return store
    })
    .service('Event', function(store) {
        return store.defineMapper({
            name: 'event',
            schema: {
             type: 'object',
                properties: {
                    id: { type: 'string' },
                    time: { type: ['string', 'null'] },
                    source_id: { type: 'string' },
                    weight: { type: 'number' },
                }
            },
            relations: {
                belongsTo: {
                    activity: {
                        foreignKey: 'source_id',
                        localField: 'activity'
                    }
                }
            }
        })
    })
    .run(function(Event, adapter) {
        Event.registerAdapter('localstorage', adapter, { 'default': true });
    })
    .service('Activity', function(store) {
        return store.defineMapper({
            name: 'activity',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string' }, 
                    name: { type: 'string' },
                    color: { type: 'string' },
                    qid: { type: 'string' },
                    lastEvent: {
                        type: ['string', 'null'],
                        get: function () {
                            var last = store.filter('event', {
                                orderBy: 'time',
                                limit: 1,
                                where: {
                                    source_id: this.id
                                }
                            })
                            console.log(last)
                            return last
                        }
                    }
                }
            },
            relations: {
                hasMany: {
                    event: {
                        foreignKey: 'source_id',
                        localField: 'events'
                    }
                }
            }
        })
    })
    .run(function(Activity, adapter) {
        Activity.registerAdapter('localstorage', adapter, { 'default': true });
    })
    .service('Term', function(store) {
        return store.defineMapper({
            name: 'term',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    color: { type: 'string' },
                }   
            },
        })
    })
    .run(function(Term, adapter) {
        Term.registerAdapter('localstorage', adapter, { 'default': true })
    })
    .controller('HomeController', function($scope, $mdDialog, $location, Activity, Term, Event, store) {
        var updateAll = function(id) {
            if(typeof id === 'undefined' ||
               (id.search('Find') === -1 && id.search('after') === 0)) {
                Activity.findAll().then(function(activities) {
                    $scope.activities = activities
                })
                Term.findAll().then(function(terms) {
                    $scope.terms = terms
                })
                Event.findAll().then(function(events) {
                    $scope.events = events
                })
            }
           }
        store.on('all', updateAll)
        updateAll()

        console.log('s', Event)

        $scope.conditionalAdd = function(event) {
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
                source_id: activity.id,
                time: now,
            }
            console.log(data)
            Event.create(data).then((s) => {    
                console.log('p', s)
            })

            $scope.selectedTab = 2
        }
        
        this.moodSelected = function(term) {
            $mdDialog.show({
                controller: RecordController,
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
                function() {})
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
                $mdDialog.hide(Term.create({ name: $scope.name, color: $scope.color }))
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

                $mdDialog.hide(
                    Activity.create(data)
                    .then(
                        (s) => {console.log('na', s)},
                        () => {
                            console.warn('Failed to save activity')
                        }
                    )
                    
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
                term_id: term.id,
                weight: $scope.weight,
                time: new Date()
            }
            $mdDialog.hide(Event.create(params))
        }
    })