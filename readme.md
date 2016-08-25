# load-script-once [![Build Status](https://travis-ci.org/ajoslin/load-script-once.svg?branch=master)](https://travis-ci.org/ajoslin/load-script-once)

> load a script, but only once

## Install

```
$ npm install --save load-script-once
```


## Usage

```js
var loadScriptOnce = require('load-script-once')

loadScriptOnce('http://site.com/script.js', function (error) {
  // done! Call loadScriptOnce again, and it will instantly succeed.
})
```

## API

If the script fails to load (with an error), the next call will try again.

#### `loadScriptOnce(src, callback)`

##### src

*Required*
Type: `string`

The script src to load

##### callback

Type: `function`

Called once the script loads, or with `error` if loading failed.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
