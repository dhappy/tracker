angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.directive('autofocus', ($timeout) => (
  {
    scope: { trigger: '@autofocus' },
    link: function(scope, element) {
      scope.$watch('trigger', (value) => {
        $timeout(() => { element[0].focus() })
      })
    },
  }
))
