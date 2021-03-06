'use strict';

var fs = require('fs');
var path = require('path');
var mustache = require('mustache');
var cssesc = require('cssesc');
var tmpl = {
  'css': fs.readFileSync(__dirname + '/css.mustache', 'utf8'),
  'scss': fs.readFileSync(__dirname + '/scss.mustache', 'utf8'),
  'sass': fs.readFileSync(__dirname + '/sass.mustache', 'utf8'),
  'less': fs.readFileSync(__dirname + '/less.mustache', 'utf8'),
  'stylus': fs.readFileSync(__dirname + '/stylus.mustache', 'utf8')
};

function cssTemplate (params) {
  var items = params.items;
  var options = params.options;
  var tmpName = options.cssClass;
  var template = { items: [] };
  items.forEach(function saveClass (item) {
    item.image = item.image.replace(/\\/g, '\/');
    item.escaped_image = item.escaped_image.replace(/\\/g, '\/');
    item.name = tmpName + options.connector + item.name;
    if (item.name) {
      item['class'] = '.' + cssesc(item.name, {isIdentifier: true});
    };
    item.px.total_width = parseInt(item.px.total_width) / options.scale + "px"
    item.px.total_height = parseInt(item.px.total_height) / options.scale + "px"
    item.px.offset_x = parseInt(item.px.offset_x) / options.scale + "px"
    item.px.offset_y = parseInt(item.px.offset_y) / options.scale + "px"
    item.px.width = parseInt(item.px.width) / options.scale + "px"
    item.px.height = parseInt(item.px.height) / options.scale + "px"
    template.items.push(item);
  });

  var tmplFile = tmpl[options.processor];
  var css = mustache.render(tmplFile, template);
  return css;
}

module.exports = cssTemplate;
