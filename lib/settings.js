var path = require('path');
var fileUtils = require("./file-utils");

var defaultMdFile = "wbs.project.md";
var templateLayoutFile = "../templates/wbs_deliverables_layout.html";

// Return the default name used for the project markdown file.
function getDefaultMdFile() {
  return defaultMdFile;
}

// Return the full name of the report template file.
function getTemplateFilename() {
  return path.join(__dirname, templateLayoutFile);
}

// Load the config file contents and return it as a JSON object.
function loadConfigFile() {
  var configContent = fileUtils.read("./.wbsm-config.json")
  return {
    raw: configContent,
    object: JSON.parse(configContent)
  }
}

// Return the name to use for the report filename.
//
// `markdownFilename` the name of the markdown file being used. Used as the
// basis for the output report name if not given an override.
//
// `explicitReportName` is an override output report name. If not provided, it
// creates the output report name to use from the markdown file.
function getReportFileName(markdownFilename, explicitReportName) {
  var reportName;
  if (typeof explicitReportName === 'undefined') {
    // not provided. Change the extension of the input file.
    return path.format({
      dir: path.dirname(markdownFilename),
      base: path.basename(markdownFilename, ".md") + ".html"
    });
  }
  else {
    // use the explicitly provided value
    return explicitReportName;
  }
}

module.exports = {
  getDefaultMdFile: getDefaultMdFile,
  getTemplateFilename: getTemplateFilename,
  loadConfigFile: loadConfigFile,
  getReportFileName: getReportFileName
};
