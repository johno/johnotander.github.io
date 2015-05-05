var fs = require('fs')
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

  var minified = new Cleancss({
     advanced: false,
  }).minify(css).styles

  fs.writeFileSync('public/css/c.min.css', minified)
}
