'use strict'

const loadScript = require('load-script')
const cache = {}

module.exports = function loadScriptOnce (src, callback) {
  if (cache[src]) return callback()

  loadScript(src, function scriptLoaded (error) {
    if (error) return callback(error)

    cache[src] = true
    callback()
  })
}
