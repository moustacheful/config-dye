const Color = require('color');

/**
 * Add the following methods to an object by their names,
 * but all the functions are previously wrapped by the Color
 * factory, to make them chaineable within nunjucks
 */
const filters = [
  'lighten',
  'darken',
  'hsl',
  'rgb',
  'saturate',
  'desaturate',
  'rotate',
  'hex',
  'isDark',
  'isLight',
].reduce((acc, methodName) => {
  acc[methodName] = (color, ...args) =>
    Color(color)[methodName](...args);

  return acc;
}, {});

filters.contrast = (color, color2) =>
  Color(color).contrast(Color(color2));

module.exports = filters;
