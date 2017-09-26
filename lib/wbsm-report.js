#! /usr/bin/env node

// RESOURCES:
//   - https://www.npmjs.com/package/commander
//   - https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//   - https://github.com/tj/commander.js/tree/master/examples
//   - https://nodejs.org/api/fs.html
//   - https://nodejs.org/api/path.html

var { version } = require("./version");
var defaultMdFile = "wbs.project.md";
var templateLayoutFile = "../templates/wbs_deliverables_layout.html";


var md = require('markdown-it')();
var mdAttrs = require('markdown-it-attrs');
md.use(mdAttrs);

var fs = require('fs');
var path = require('path');

// command-line argument support
var program = require('commander');
program
  .version(version)
  .description("Generate a Work Breakdown Structure (WBS) report from a Markdown file.\n"+
               "  Use options to customize the file names.")
  .option('-m, --markdown <filename>', 'The input markdown filename used', defaultMdFile)
  .option('-r, --report <filename>', 'The output HTML report filename')
  .parse(process.argv);

// console.log("markdown", program.markdown)
// console.log("reportName", getReportName())
// var fullFilename = path.resolve(program.markdown);

///
///
///
generate(program.markdown, getReportName(), getTemplateFilename());
console.log('Deliverables report generated!');
///
///
///


// Return the name to use for the report filename.
function getReportName() {
  var reportName;
  if (typeof program.report === 'undefined') {
    // not provided. Change the extension of the input file.
    return path.format({
      dir: path.dirname(program.markdown),
      base: path.basename(program.markdown, ".md") + ".html"
    });
  }
  else {
    // use the explicitly provided value
    return program.report;
  }
}

// Return the full name of the report template file.
function getTemplateFilename() {
  return path.join(__dirname, templateLayoutFile);
}

// Write the contents of a file out synchronously and return the file contents.
function write(contents, outputFilename) {
  return fs.writeFile(outputFilename, contents, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    return true;
  });
}

// Read the contents of a file out synchronously and return the file contents.
function read(filename) {
  return fs.readFileSync(filename, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
    return data;
  });
}

// Read the contents of a file out synchronously and return the file contents.
function generate(markdownFilename, reportFilename, renderTemplateFilename) {
  // console.log("--------------------md file: ", markdownFilename)
  // read markdown file contents
  var mdContents = read(markdownFilename);
  // console.log("--------------------contents", mdContents)

  if (typeof mdContents === 'undefined') {
    console.error('No markdown contents found!');
    process.exit(1);
  }

  // convert the markdown file to an HTML fragment
  var htmlFragment = md.render(mdContents);
  // replace checked and unchecked items with more stand-out representations
  // limiting replace to ">[ ] " prevents modifying the markdown example display
  htmlFragment = htmlFragment.replace(/\>\[ \]\s/g, "><tick-display :done='false'></tick-display> ");
  // replace "checked" items with "done" attribute added to "<li>" and add a "tick-display" component
  htmlFragment = htmlFragment.replace(/\>\[x\]\s/ig, " done='true'><tick-display :done='true'></tick-display> ");
  htmlFragment = htmlFragment.replace(/\<li\s?/ig, '<wbs-item v-on:register="registered" v-on:togglestory="storyToggled" :story_work="story_work" :stories="checked_stories" :showmode="show_mode" ');
  htmlFragment = htmlFragment.replace(/\<\/li\>/ig, '</wbs-item>');

  // load the contents of the deliverable layout template
  var template = read(renderTemplateFilename);

  // replace the "{{contents}}" area with the rendered HTML fragment
  var report = template.replace(/{{content}}/, htmlFragment);

  // save the generated file out
  write(report, reportFilename);
}
