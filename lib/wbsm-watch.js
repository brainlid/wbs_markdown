#! /usr/bin/env node

// RESOURCES:
//   - https://nodejs.org/docs/latest/api/fs.html#fs_class_fs_fswatcher
//   - https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener

var version = require("./version").version;
var fileUtils = require("./file-utils");

// TODO: I think loading the report here is messing with the commander program. Picking it all up from the report.
// var reportGen = require("./wbsm-report");

// var defaultMdFile = reportGen.getDefaultMdFile();
// var useReportFilename = './' + defaultMdFile;
var defaultMdFile = "bar";
var useReportFilename = 'foo';

var path = require('fs');

// command-line argument support
var program = require('commander');
program
  .version(version)
  .usage('<file ...>')
  .description("Watch for changes to a project markdown file and auto-generate the report when it changes.\n"+
               "  Give a filename if you don't want to use the default of '"+defaultMdFile+"'.")
  .parse(process.argv);

// Specified filename comes in through args. Only accept 0 or 1
var filenames = program.args;

if (filenames.length > 1) {
  console.error('Only expecting a single filename');
  process.exit(1);
}

// given exactly 1, use that filename. Overrides the default.
if (filenames.length == 1) {
  useReportFilename = filenames[0]
}

// ///
// ///
// ///
// createNewReportFromSample(useReportFilename);
// ///
// ///
// ///
//
//
// function createNewReportFromSample(filename) {
//   //  Don't overwrite the file if it exists and error instead.
//   if (fileUtils.exists(filename)) {
//     console.log("")
//     console.error("Project file already exists")
//     process.exit(1);
//   }
//   else {
//     // copy the report sample template file to the output config name.
//     fileUtils.copy(getSampleReportFilename(), filename);
//     console.log("")
//     console.log("New report file created! ["+ filename +"]")
//   }
// }
//
// function getSampleReportFilename() {
//   return path.join(__dirname, templateReportFile);
// }
