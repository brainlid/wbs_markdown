module.exports = function(html, config) {
  return '<script>var reportConfig = ' + JSON.stringify(config) + '</script>\n' + html;
};
