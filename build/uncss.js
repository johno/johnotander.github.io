var fs = require('fs')
var glob = require('glob')
var uncss = require('uncss')

function css() {
  var srcCss = fs.readFileSync('src/css/c.css', 'utf8')

  glob('_site/**/*.html', function(_, files) {
    uncss(files, {
      raw: srcCss,
      ignoreSheets: [/\/public\//]
    }, function(_, output) {
      if (_) { console.log(_) }

      fs.writeFileSync('public/css/c.css', output)
    })
  })
}

css()
