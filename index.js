#!/usr/bin/env node

const fs = require('fs-extra');
const { argv } = require('yargs');
const glob = require('glob');
const path = require('path');
const getRenderer = require('./renderer-factory');
const htmlColors = require('./html-colors');

const args = ['data', 'path', 'dest'].map(key => argv[key]);

if (!args.some(Boolean))
  throw new Error(args.join() + ' are required');

const [dataPath, templatesPath, destPath] = args.map(p =>
  path.resolve(p)
);

const data = require(dataPath);

/**
 * Creates a renderer, renders the given templatePath,
 * and saves it to the dest directory.
 *
 * @param {String} templatePath
 */
const processTemplate = templatePath => {
  const { dir, base } = path.parse(templatePath);
  const renderer = getRenderer(dir);

  const result = renderer.render(base, {
    ...htmlColors,
    ...data,
  });

  const target = templatePath
    .replace('.njk', '')
    .replace(templatesPath, destPath);

  fs.outputFileSync(target, result);
  console.log(`Wrote ${target}`);
};

/**
 * Processes all .njk files within path, ignoring any files
 * starting with an underscore. These are implemented as partials
 * for inclusion in the rest of the template files.
 */
glob(
  `${templatesPath}/**/*.njk`,
  {
    ignore: '**/_*.njk',
    dot: true,
  },
  (err, matches) => {
    if (err) throw err;

    matches.map(processTemplate);
    console.log(`Done! ${matches.length} templates processed.`);
  }
);
