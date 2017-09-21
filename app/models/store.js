angular.module('eventTypes', ['ngMaterial', 'chart.js', 'ui.router', 'timer', 'pr.longpress', 'mp.colorPicker'])
.factory('store', () => {
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
