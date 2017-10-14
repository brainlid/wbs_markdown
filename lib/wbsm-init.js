#! /usr/bin/env node

// RESOURCES:
//   - https://www.npmjs.com/package/commander
//   - https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//   - https://github.com/tj/commander.js/tree/master/examples
//   - https://nodejs.org/api/fs.html
//   - https://nodejs.org/api/path.html

var version = require("./version").version;
var fileUtils = require("./file-utils");
// var defaultMdFile = "wbs.project.md";
var templateConfigFile = "../templates/sample-config.json";
var outputConfigFilename = "./.wbsm-config.json";

var fs = require('fs');
var path = require('path');

const { COPYFILE_EXCL } = fs.constants;

// command-line argument support
var program = require('commander');
program
  .version(version)
  // .usage('[options] <file ...>')
  .description("Initialize a WBS Markdown project configuration file")
  .parse(process.argv);

//
//
//
console.log("Feature not yet enabled.");
// createConfigFromSample();
//
//
//

function createConfigFromSample() {
  // copy the sample template file to the output config name. Don't overwrite
  // the file if it exists and error instead.
  fileUtils.copy(getTemplateConfigFilename(), outputConfigFilename, false);
}

function getTemplateConfigFilename() {
  return path.join(__dirname, templateConfigFile);
}
