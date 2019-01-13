import yaml from 'js-yaml';
import { iterReplace } from 'iter-object';
import filePlugin from './plugins/filePlugin';
import dataPlugin from './plugins/dataPlugin';
import selfPlugin from './plugins/selfPlugin';
import { lowerPlugin, upperPlugin } from './plugins/stringPlugins';
import timePlugin from './plugins/timePlugin';
import pluginProcessor from './plugins/core';

const plugins = [
  timePlugin,
  lowerPlugin,
  upperPlugin,
  dataPlugin,
  filePlugin,
  selfPlugin
];

export const registerPlugin = (plugin) => {
  plugins.push(plugin);
};

const processObj = (context) => iterReplace(context.src, (key, value) => pluginProcessor(context, value) || value);

export const process = (input, data) => {

  // load as object
  const doc = yaml.safeLoad(input);

  // let chained items like files be resolved
  const firstPass = processObj({
    src: doc,
    plugins,
    data,
  });

  // let non-completed files be interpolated
  const secondPass = processObj({
    src: firstPass,
    plugins,
    data,
  });

  return yaml.safeDump(secondPass);
};
