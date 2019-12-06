#! /usr/bin/env node

var version = require("./version").version;
var program = require('commander');

program
  .version(version)
  .description('Work Breakdown Structure (WBS) report from a Markdown file')
  .command('init', 'initialize a project config file (.wbsm-config.json)')
  .command('new', 'generate a new project report template file')
  .command('report', 'generate an HTML report file from the project markdown file').alias('r')
  .command('watch', 'watch markdown project file changes and auto-generate HTML').alias('w')
  .command('open', 'open the generated report file in the browser').alias('o')
  .parse(process.argv);
