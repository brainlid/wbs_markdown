#! /usr/bin/env node

// RESOURCES:
//   - https://stackoverflow.com/questions/6551006/get-my-os-from-the-node-js-shell
//   - https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
//   - Could use: https://github.com/sindresorhus/opn
//   - https://nodejs.org/api/os.html
//   - https://github.com/sindresorhus/opn

var version = require("./version").version;
var settings = require("./settings");
var defaultMdFile = settings.getDefaultMdFile();

// command-line argument support
var program = require('commander');
program
  .version(version)
  .description("Open the generated project report HTML file in the local default browser.")
  .option('-m, --markdown <filename>', 'The input markdown filename used', defaultMdFile)
  .option('-r, --report <filename>', 'The output HTML report filename')
  .parse(process.argv);

///
///
///
var reportName = settings.getReportFileName(program.markdown, program.report)
settings.openReportInBrowser(reportName);
///
///
///
