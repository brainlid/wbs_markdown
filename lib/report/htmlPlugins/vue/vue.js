var path = require('path');
var fileUtils = require('../../../file-utils');

// This html plugin looks through config.components and includes .vue files
// It also adds the <main> element which is Vue's root
module.exports = function(html, config) {
  var vueComponentsHtml = '';
  config.components.forEach(function(component) {
    if (component.vue) {
      var html = loadVueComponentFile(component);
      vueComponentsHtml += '\n' + html + '\n';
    }
    if (component.html) {
      var html = fileUtils.read(resolvePath(component.html));
      vueComponentsHtml += '\n' + html + '\n';
    }
    if (component.css) {
      var css = fileUtils.read(resolvePath(component.css));
      vueComponentsHtml += '\n<style>' + css + '</style>\n';
    }
    if (component.js) {
      var js = fileUtils.read(resolvePath(component.js));
      vueComponentsHtml += '\n<script>' + js + '</script>\n';
    }
  });
  return `
    <div class="container">
      <main role="main" id="vue-root" v-bind:class="classObject">
        <security-local-storage :allowed="can_use_local_storage"></security-local-storage>
        <invalid-story-panel :invalid="invalid_story_links"></invalid-story-panel>
        ${html}
      </main>
    </div>
    ${vueComponentsHtml}
  `;
};

// this is a ghetto compiler for .vue files that contain
// <template>, <script> with export default, and <style>
function loadVueComponentFile(component) {
  var componentPath = resolvePath(component.vue);
  var componentHtml = fileUtils.read(componentPath);
  var componentName = component.vue.replace(/^.+\/(.+)\.vue$/, '$1');
  var tplId = `${componentName}-template`;
  var componentStr = JSON.stringify(componentName);
  var templateStr = JSON.stringify('#' + tplId);
  componentHtml = componentHtml.replace(/\s*export default\s*\{/, `\n  Vue.component(${componentStr}, {\n    template: ${templateStr},\n  `);
  componentHtml = componentHtml.replace(/};?\s*<\/script>/, '});\n</script>');
  componentHtml = componentHtml.replace('<template>', `<script type="text/x-template" id="${tplId}">`);
  componentHtml = componentHtml.replace('</template>', '</script>');
  componentHtml = componentHtml.replace(/(<style[^>]*) scoped([^>]*>)/, '$1$2');
  componentHtml = componentHtml.replace(/<style[^>]*>\s+<\/style>/, '');
  componentHtml = componentHtml.trim();
  return componentHtml;
}

// resolve path either relative to the report folder
// or for user-supplied Vue components, an absolute dir
function resolvePath(givenPath) {
  if (givenPath.match(/^\.\/components\//)) {
    return path.join(__dirname, '../../', givenPath);
  }
  else {
    return givenPath;
  }
}
