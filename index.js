angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
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
                .state('settings', {
                    url: '/settings',
                    templateUrl: 'settings.html',
                    controller: 'SettingsController as ctrl'
                })
            $urlRouterProvider.otherwise('home')
        }
    ])
    .factory('store', function() {
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
        var date = new Date().toISOString()

        return store.defineMapper('activity', {
            schema: {
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    color: { type: 'string' },
                    lastEvent: {
                        type: 'string',
                        get() {
                            if(this.events.length === 0) {
                                return undefined
                            }

                            function compare(a, b) {
                                return b.time.localeCompare(a.time)
                            }
                            var events = this.events.sort(compare)
                            return this.events[0].time
                        },
                    },
                },
            },
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
            schema: {
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    color: { type: 'string' },
                    lastEvent: {
                        type: 'string',
                        get() {
                            if(this.events.length === 0) {
                                return undefined
                            }

                            function compare(a, b) {
                                return b.time.localeCompare(a.time)
                            }
                            var events = this.events.sort(compare)
                            return this.events[0].time
                        },
                    },
                },
            },
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
                }
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
                    }
                }

            }
        })
    })
    .controller('HomeController', function($scope, $mdDialog, $location, Activity, Term, Event, store) {

        Activity.findAll({}, { with: ['events'] }).then((activities) => {
            $scope.activities = activities
        })
        Term.findAll({}, { with: ['events'] }).then((terms) => {
            $scope.terms = terms
        })
        Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
            $scope.events = events

            $scope.eventsByDay = groupByDay(events)

            console.log($scope.eventsByDay)
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
                        $scope.$apply()
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
        }

        this.activityOptions = function(activity) {
            console.log('lp')
            $mdDialog.show({
                controller: 'OptionsController as ctrl',
                templateUrl: 'options.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    elem: activity
                }
            })
            .then((activity) => {
                Activity.findAll().then((activities) => {
                    $scope.activities = activities
                })
                Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
                    $scope.events = events
                })
            })
        }


        $scope.labels = []

        for(var i = 0; i < 24; i++) {
            $scope.labels.push(`${i}:00`)
        }

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
                        position: 'left',
                        min: -100,
                        max: 100,
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

        this.activitySelected = function(activity) {
            var now = new Date().toISOString()
            activity.lastEvent = now
            var data = {
                activity: activity,
                time: now,
            }
            Event.create(data).then((event) => {
                event.save() // source_id not =serialized
                Event.findAll({}, { with: ['activity', 'term'] }).then((events) => {
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

        function groupByDay(events) {
            var byDay = events.reduce((ret, event) => {
                var day = moment(event.time).startOf('day').format()
                ;(ret[day] = ret[day] || []).push(event)
                return ret
            }, {})
            var out = []
            for(date in byDay) {
                out.push({
                    display_text: date,
                    events: byDay[date],
                })
            }
            console.log(out)
            return out
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
                time: new Date().toISOString()
            }
            Event.create(params).then((event) => {
                event.save()
                $mdDialog.hide(event)
            })
        }
    })
    .controller('OptionsController', function($scope, $controller, $mdDialog, elem, Event) {
        $controller('DialogController', { $scope: $scope })

        $scope.name = elem.name

        this.edit = () => {
            
        }

        this.delete = () => {
            elem.destroy()
            Event.destroyAll({ where: { activity_id: { '==': elem.id } } }).then(() => {
                $mdDialog.hide()
            })
        }
    })
    .controller('SettingsController', function($scope) {
    })
