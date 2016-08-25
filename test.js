const test = require('tape')
const after = require('after')
const proxyquire = require('proxyquire')

test('queue success', function (t) {
  let callCount = 0
  const loadScriptOnce = proxyquire('./', {
    'load-script': (src, cb) => {
      callCount++
      setTimeout(cb, 1)
    }
  })

  loadScriptOnce('foo', done)
  loadScriptOnce('foo', done)
  loadScriptOnce('foo', done)

  t.plan(6)

  function done (error) {
    t.ifError(error)
    t.equal(callCount, 1)
  }
})

test('queue error', function (t) {
  let callCount = 0
  const loadScriptOnce = proxyquire('./', {
    'load-script': (src, cb) => {
      callCount++
      setTimeout(() => cb('err'), 1)
    }
  })

  loadScriptOnce('foo', done)
  loadScriptOnce('foo', done)

  t.plan(4)

  function done (error) {
    t.equal(error, 'err')
    t.equal(callCount, 1)
  }
})

test('queue error then success', function (t) {
  let callCount = 0
  const loadScriptOnce = proxyquire('./', {
    'load-script': (src, cb) => {
      callCount++
      if (callCount === 1) {
        setTimeout(() => cb('err'), 1)
      } else {
        setTimeout(cb, 1)
      }
    }
  })

  t.plan(6)

  const loadSuccess = after(2, () => loadScriptOnce('foo', doneSuccess))

  loadScriptOnce('foo', doneErr)
  loadScriptOnce('foo', doneErr)

  function doneErr (error) {
    t.equal(error, 'err')
    loadSuccess()
  }

  function doneSuccess (error) {
    t.ifError(error)
    t.equal(callCount, 2)

    // After success, no more calls
    loadScriptOnce('foo', () => {
      t.ifError(error)
      t.equal(callCount, 2)
    })
  }
})

test('doesnt cache different srcs', function (t) {
  let callCount = 0
  const loadScriptOnce = proxyquire('./', {
    'load-script': (src, cb) => {
      callCount++
      cb()
    }
  })

  t.plan(1)

  loadScriptOnce('foo', done)
  loadScriptOnce('foo', done)
  loadScriptOnce('bar', done)

  t.equal(callCount, 2)

  function done () {}
})
