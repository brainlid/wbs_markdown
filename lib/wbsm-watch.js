var version = require("./version").version;
var watching = require("./report/generate").watching;
var settings = require("./settings");
var defaultMdFile = settings.getDefaultMdFile();


// command-line argument support
var program = require('commander');
program
  .version(version)
  .description("Watch for changes to a project markdown file and auto-generate the report.\n"+
               "  Use options to customize the file names.")
  .option('-m, --markdown <filename>', 'The input markdown filename used', defaultMdFile)
  .option('-r, --report <filename>', 'The output HTML report filename')
  .parse(process.argv);

///
///
///
var reportName = settings.getReportFileName(program.markdown, program.report)
watching(program.markdown, reportName);
console.log("")
console.log('Watching for file changes... [' + reportName + ']');
///
///
///
