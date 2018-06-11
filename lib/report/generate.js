#! /usr/bin/env node

// Functions and behavior for compiling the report.

// RESOURCES:
//   - https://www.npmjs.com/package/commander
//   - https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//   - https://github.com/tj/commander.js/tree/master/examples
//   - https://nodejs.org/api/fs.html
//   - https://nodejs.org/api/path.html
//   - https://github.com/paulmillr/chokidar

var path = require('path');
var chokidar = require('chokidar');
var _ = require('lodash');
var version = require("../version").version;
var fileUtils = require("../file-utils");
var settings = require("../settings");

function applyConfigDefaults(config) {
  function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }
  var defaultConfig = JSON.parse(fileUtils.read(path.join(__dirname, '../config/default.json')));
  _.mergeWith(config, defaultConfig, customizer);
}

function mdToHtml(mdContents, config) {
  // create markdown instance with given options
  var md = require('markdown-it')(config.markdownItOptions);
  // load any plugins
  config.markdownItPlugins.forEach(function(plugin) {
    var pluginFunction = require(plugin.require);
    md.use(pluginFunction);
  });
  // render
  var html = md.render(mdContents);
  // run post-render plugins
  config.htmlPlugins.forEach(function(plugin) {
    var pluginFunction = require(plugin.require);
    html = pluginFunction(html, config);
  });
  // return final html
  return html;
}

function getAssets(config) {
  var lines = [];
  // gather script, link, and style tags
  config.assets.forEach(function(asset) {
    if (asset.script) {
      lines.push('<script src="' + _.escape(asset.script) + '"></script>');
    }
    else if (asset.stylesheet) {
      lines.push('<link rel="stylesheet" href="' + _.escape(asset.stylesheet) + '">');
    }
    else if (asset.style) {
      var cssPath = asset.style.match(/^\.\/components\//) ? path.join(__dirname, asset.style) : asset.style;
      var css = fileUtils.read(cssPath);
      lines.push('<style>\n' + css + '\n</style>');
    }
    else if (asset.js) {
      var jsPath = asset.js.match(/^\.\/components\//) ? path.join(__dirname, asset.js) : asset.js;
      var js = fileUtils.read(jsPath);
      lines.push('<script>\n' + js + '\n</script>');
    }
  });
  return lines.join('\n');
}

function compileHtml(template, config, data) {
  var report = template;
  report = report.replace(/{{content}}/, data.content);
  report = report.replace(/{{assets}}/, data.assets);
  // stamp the wbsm version into the report
  report = report.replace(/{{version}}/, data.version);
  // replace "{{reportDate}}" with a text string of the date and time when generated
  report = report.replace(/{{reportDate}}/, data.dateText);
  // replace "{{reportTitle}}" with the value loaded from the config file
  report = report.replace(/{{reportTitle}}/, config.reportTitle);
  return report;
}

// Read the contents of a file out synchronously and return the file contents.
function generate(markdownFilename, reportFilename) {
  // console.log("--------------------md file: ", markdownFilename)
  // read markdown file contents
  var mdContents = fileUtils.read(markdownFilename);
  // console.log("--------------------contents", mdContents)

  if (typeof mdContents === 'undefined') {
    console.error('No markdown contents found!');
    process.exit(1);
  }

  var renderTemplateFilename = settings.getTemplateFilename()
  var dateText = new Date().toLocaleString()
  var config = JSON.parse(fileUtils.read("./.wbsm-config.json"));
  applyConfigDefaults(config);
  var content = mdToHtml(mdContents, config);
  var assets = getAssets(config);
  var template = fileUtils.read(renderTemplateFilename);
  var report = compileHtml(template, config, {version, dateText, assets, content});
  fileUtils.write(report, reportFilename);
}

// Perform a single file watch. When the file changes, automatically regenerate
// the output report file.
//
// `markdownFilename` - The filename of the input markdown file.
// `outputReportFilename` - The filename of the output report file.
function watching(markdownFilename, outputReportFilename) {
  console.log("watching markdown filename", markdownFilename)
  // watch the markdown file for changes and regenerate the
  chokidar.watch(markdownFilename).on('all', (event, path) => {
    // if the markdown project file was deleted, stop the monitoring
    if (event == "unlink") {
    console.log("File was moved.")
    process.exit(0)
  }
  // console.log(event, path);
  // File event was "add" or "change". Regenerate the report.
  generate(markdownFilename, outputReportFilename);
});
}

module.exports = {
  generate: generate,
  watching: watching
};
