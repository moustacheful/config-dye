const nunjucks = require('nunjucks');
const filters = require('./filters');

/**
 * Returns a renderer with a file system loader for path,
 * and adds the necessary filters for it.
 */
module.exports = path => {
  const renderer = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path)
  );

  Object.keys(filters).forEach(name =>
    renderer.addFilter(name, filters[name])
  );

  return renderer;
};
