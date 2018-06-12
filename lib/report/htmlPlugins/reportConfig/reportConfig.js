// This html plugin simply adds the config file as a global variables
module.exports = function(html, config) {
  return '<script>var reportConfig = ' + JSON.stringify(config) + '</script>\n' + html;
};
