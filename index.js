'use strict'

var loadScript = require('load-script')
var cache = {}

module.exports = function loadScriptOnce (src, callback) {
  var result = cache[src]
  if (!cache[src]) {
    result = cache[src] = {
      callbacks: [],
      success: false
    }
  }
  if (result.success) return setTimeout(callback, 0)

  result.callbacks.push(callback)
  if (result.callbacks.length === 1) {
    loadScript(src, onScriptLoad)
  }

  function onScriptLoad (error) {
    var callbacks = result.callbacks
    if (!error) result.success = true

    // Empty this array before finishing, because these callbacks
    // could cause more loadScriptOnce calls
    result.callbacks = []
    callbacks.forEach(function (callback) {
      callback(error)
    })
  }
}
