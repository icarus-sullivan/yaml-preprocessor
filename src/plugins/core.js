
const COMMON_MATCH = /\$\{.*\}/g;
const COMMON_SPLITTER = /\$\{|\(|\)|\:|, |,|\}/g;
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
  
  const result = value.split(COMMON_SPLITTER_MIN)
  .filter((v) => v)
  .map((v) => {
    // if this is an interpolator and not a unresolved method arg
    if (v.charAt(0) === '{' && v.slice(-1) !== '(') {
      return processPlugins(context, `$${v}}`);
    }
    return v;
  });
  if (result && typeof result[0] !== 'string') {
    return result[0];
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