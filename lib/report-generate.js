#! /usr/bin/env node

// Functions and behavior for compiling the report.

// RESOURCES:
//   - https://www.npmjs.com/package/commander
//   - https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//   - https://github.com/tj/commander.js/tree/master/examples
//   - https://nodejs.org/api/fs.html
//   - https://nodejs.org/api/path.html

var path = require('path');
var version = require("./version").version;
var fileUtils = require("./file-utils");
var settings = require("./settings");
var defaultMdFile = settings.getDefaultMdFile();

var md = require('markdown-it')();
var mdAttrs = require('markdown-it-attrs');
md.use(mdAttrs);

// Read the contents of a file out synchronously and return the file contents.
function generate(markdownFilename, reportFilename, renderTemplateFilename) {
  // console.log("--------------------md file: ", markdownFilename)
  // read markdown file contents
  var mdContents = fileUtils.read(markdownFilename);
  // console.log("--------------------contents", mdContents)

  if (typeof mdContents === 'undefined') {
    console.error('No markdown contents found!');
    process.exit(1);
  }

  var dateText = new Date().toLocaleString()
  var configLoaded = settings.loadConfigFile();


  // convert the markdown file to an HTML fragment
  var htmlFragment = md.render(mdContents);
  // replace checked and unchecked items with more stand-out representations
  // limiting replace to ">[ ] " prevents modifying the markdown example display
  htmlFragment = htmlFragment.replace(/\>\[ \]\s/g, ":work_item='true' :done='false'><tick-display :done='false'></tick-display> ");
  // replace "checked" items with "done" attribute added to "<li>" and add a "tick-display" component
  htmlFragment = htmlFragment.replace(/\>\[x\]\s/ig, ":work_item='true' :done='true'><tick-display :done='true'></tick-display> ");
  htmlFragment = htmlFragment.replace(/\<li\s?/ig, '<wbs-item v-on:register="registered" v-on:togglestory="toggleStory" :story_work="story_work" :active_stories="active_stories" :stories="active_stories" :showmode="show_mode" ');
  htmlFragment = htmlFragment.replace(/\<\/li\>/ig, '</wbs-item>');
  // convert for the display-filter component. Want to preserve optional attributes (doesn't have greedy, so it only alters the first match)
  htmlFragment = htmlFragment.replace(/\<p id="display-filter"/i, '<display-filter ');
  htmlFragment = htmlFragment.replace(/\>filter\<\/p>/i, 'v-on:change="filterChanged"></display-filter>');

  // load the contents of the deliverable layout template
  var template = fileUtils.read(renderTemplateFilename);
  // console.log("--------------------template", template)

  // replace the "{{contents}}" area with the rendered HTML fragment
  var report = template.replace(/{{content}}/, htmlFragment);
  // stamp the wbsm version into the report
  report = report.replace(/{{version}}/, version);
  // replace "{{reportDate}}" with a text string of the date and time when generated
  report = report.replace(/{{reportDate}}/, dateText);
  // replace "{{reportTitle}}" with the value loaded from the config file
  report = report.replace(/{{reportTitle}}/, configLoaded.object["reportTitle"]);
  report = report.replace(/{{reportConfig}}/, configLoaded.raw);
  report = report.replace('<p id="stories-chart">chart</p>', '<stories-chart :story_work="story_work" :stories="active_stories"></stories-chart>');
  report = report.replace('<p id="stories-table">table</p>', '<stories-table :story_work="story_work" :stories="active_stories"></stories-table>');
  report = report.replace('<p id="stories-toggle">toggle</p>', '<stories-toggle v-on:toggle="toggleAllStories"></stories-toggle>');
  report = report.replace(/<p id="stories-total"\s?(group="(.+)")?>totals<\/p>/ig, function(match_text, match_1, group_match, _offset, _full_body) {
    var groupStr = ""
    if (group_match) {
      groupStr = 'group="' + group_match + '" '
    }
    return '<stories-total ' + groupStr + ':story_work="story_work" :stories="active_stories" :story_groups="story_groups"></stories-total>'
  });

  // save the generated file out
  fileUtils.write(report, reportFilename);
}

module.exports = {
  generate: generate
};
