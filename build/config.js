var fs = require('fs')
var yaml = require('js-yaml')

var configData = require('../src/config')
var authorData = require('johno-api')

module.exports = function config() {
  configData.authorData = authorData
  var yamlConfig = yaml.safeDump(configData)

  fs.writeFileSync('_config.yml', yamlConfig)
}
