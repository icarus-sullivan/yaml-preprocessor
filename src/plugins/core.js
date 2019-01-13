
const COMMON_MATCH = /\$\{.*\}/g;
const COMMON_SPLITTER = /\$\{|\(|\)|\:|, |,|\|\||\s+|\}/g;
const COMMON_SPLITTER_MIN = /\$|\}/g;
const QUOTE_REGEX = /["']/g;

const processPlugins = (context, value) => {
  const { plugins = [] } = context;
  const commonSplits = value.split(COMMON_SPLITTER).filter((c) => c);
  const resolveArgs = commonSplits.map((di) => di.replace(QUOTE_REGEX, '')); 
  const [id] = resolveArgs;
  
  const [plugin] = plugins.filter((pl) => pl.identifier === id) || [];
  if (plugin) {
    // pass context, remove identifier from args as they aren't needed
    return plugin.resolve(context, ...resolveArgs.slice(1));
  }
  return value;
}

const processSplitMin = (context, value) => {
  if (typeof value !== 'string') {
    return value;
  }
  
  // split arguments, filter out empties, then run them
  // against plugins. 
  const result = value.split(COMMON_SPLITTER_MIN)
  .filter((v) => v)
  .map((v) => {
    // if this is an interpolator and not a unresolved method arg
    if (v.charAt(0) === '{' && v.slice(-1) !== '(') {
      return processPlugins(context, `$${v}}`);
    }
    return v;
  });

  const [first] = result || [];
  // in case this was not a flat string replacement, for example
  // a file() call, this will be an object, so we don't want to join
  if (typeof first !== 'string') {
    return first;
  }
  return result.join('');
}

const pluginProcessor = (context, value) => {
  if (typeof value === 'string' && value.match(COMMON_MATCH)) {
    // process internal values first
    const firstPass = processSplitMin(context, value);

    // process secondary wrapped items
    return processSplitMin(context, firstPass);
  }
  return value;
};

export default pluginProcessor;