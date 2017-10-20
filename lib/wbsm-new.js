#! /usr/bin/env node

// RESOURCES:
//   - https://www.npmjs.com/package/commander
//   - https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//   - https://github.com/tj/commander.js/tree/master/examples
//   - https://nodejs.org/api/path.html

var version = require("./version").version;
var fileUtils = require("./file-utils");
var defaultMdFile = "wbs.project.md";
var templateLayoutFile = "wbs_deliverables_layout.html";
var templateReportFile = "../templates/wbs.sample.md";
var newReportFilename = './wbs.project.md';

var path = require('path');

// command-line argument support
var program = require('commander');
program
  .version(version)
  // .usage('[options] <file ...>')
  .description("Create a new Work Breakdown Structure (WBS) Markdown project file.")
  // .option('-m, --markdown <filename>', 'The input markdown filename used', defaultMdFile)
  // .option('-r, --report <filename>', 'The output HTML report filename')
  .parse(process.argv);


// console.log("markdown", program.markdown)
// console.log("reportName", getReportName())
// var fullFilename = path.resolve(program.markdown);

///
///
///
createNewReportFromSample(newReportFilename);
///
///
///


function createNewReportFromSample(filename) {
  //  Don't overwrite the file if it exists and error instead.
  if (fileUtils.exists(filename)) {
    console.log("")
    console.error("Project file already exists")
    process.exit(1);
  }
  else {
    // copy the report sample template file to the output config name.
    fileUtils.copy(getSampleReportFilename(), filename);
    console.log("")
    console.log("New report file created! ["+ filename +"]")
  }
}

function getSampleReportFilename() {
  return path.join(__dirname, templateReportFile);
}
