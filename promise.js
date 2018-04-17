var loadScript = require('./index')

module.exports = function (script) {
  return new Promise(function (resolve, reject) {
    loadScript(script, function (error) {
      if (error) return reject(error)
      else resolve()
    })
  })
}
