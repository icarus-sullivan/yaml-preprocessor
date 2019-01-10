import args from 'node-args';
import yaml from 'js-yaml';
import fs from 'fs';
import filePlugin from './plugins/filePlugin';
import optionsPlugin from './plugins/optionsPlugin';
import selfPlugin from './plugins/selfPlugin';
import pluginProcessor from './plugins/core';

const defaultPlugins = [
  optionsPlugin,
  filePlugin,
  selfPlugin
];

const iterobj = (obj, callback) => {
  if (typeof obj !== 'object' && !Array.isArray(obj)) {
    return obj;
  }
  for (const [key, value] of Object.entries(obj)) {
    const repl = callback(key, value);
    obj[key] = iterobj(repl, callback);
  }
  return obj;
};

const processObj = (context) => iterobj(context.src, (key, value) => pluginProcessor(context, value) || value);

const process = (configuration) => {
  const { plugins = [] } = configuration || {};
  const finalPlugins = defaultPlugins.concat(plugins);
  const options = args;
  const filename = args.file;

  // get yaml
  const y = fs.readFileSync(filename, 'utf8');

  // load as object
  const doc = yaml.safeLoad(y);

  // let chained items like files be resolved
  const firstPass = processObj({
    src: doc,
    options,
    plugins: finalPlugins,
  });

  // let non-completed files be interpolated
  const secondPass = processObj({
    src: firstPass,
    options,
    plugins: finalPlugins,
  });

  return yaml.safeDump(secondPass);
};

// export default process();
console.time('process');
console.log(process());
console.timeEnd('process');