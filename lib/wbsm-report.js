#! /usr/bin/env node

// RESOURCES:
//   - https://www.npmjs.com/package/commander
//   - https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//   - https://github.com/tj/commander.js/tree/master/examples

var version = require("./version").version;
var generateReport = require("./report-generate").generate;
var settings = require("./settings");
var defaultMdFile = settings.getDefaultMdFile();


// command-line argument support
var program = require('commander');
program
  .version(version)
  .description("Generate a Work Breakdown Structure (WBS) report from a Markdown file.\n"+
               "  Use options to customize the file names.")
  .option('-m, --markdown <filename>', 'The input markdown filename used', defaultMdFile)
  .option('-r, --report <filename>', 'The output HTML report filename')
  .parse(process.argv);

///
///
///
var reportName = settings.getReportFileName(program.markdown, program.report)
generateReport(program.markdown, reportName);
console.log("")
console.log('Deliverables report generated! [' + reportName + ']');
///
///
///
