var fs = require('fs')
var glob = require('glob')
var uncss = require('uncss')
var cssnext = require('cssnext')
var Cleancss = require('clean-css')

module.exports = function css() {
  var srcCss = fs.readFileSync('src/css/all.css', 'utf8')

  var css = cssnext(srcCss, {
    features: {
      customProperties: { strict: false },
      rem: false,
      pseudoElements: false,
      colorRgba: false
    }
  })

  glob('_site/**/*.html', function(_, files) {
    uncss(files, {
      raw: css,
      ignoreSheets: [/\/public\//]
    }, function(_, output) {
      if (_) { console.log(_) }

      var minified = new Cleancss({
         advanced: false,
      }).minify(output).styles

      fs.writeFileSync('public/css/c.min.css', minified)
    })
  })
}
