"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = exports.registerPlugin = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _iterObject = require("iter-object");

var _filePlugin = _interopRequireDefault(require("./plugins/filePlugin"));

var _dataPlugin = _interopRequireDefault(require("./plugins/dataPlugin"));

var _selfPlugin = _interopRequireDefault(require("./plugins/selfPlugin"));

var _stringPlugins = require("./plugins/stringPlugins");

var _timePlugin = _interopRequireDefault(require("./plugins/timePlugin"));

var _core = _interopRequireDefault(require("./plugins/core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_timePlugin.default, _stringPlugins.lowerPlugin, _stringPlugins.upperPlugin, _dataPlugin.default, _filePlugin.default, _selfPlugin.default];

var registerPlugin = function registerPlugin(plugin) {
  plugins.push(plugin);
};

exports.registerPlugin = registerPlugin;

var processObj = function processObj(context) {
  return (0, _iterObject.iterReplace)(context.src, function (key, value) {
    return (0, _core.default)(context, value) || value;
  });
};

var process = function process(input, data) {
  // load as object
  var doc = _jsYaml.default.safeLoad(input); // let chained items like files be resolved


  var firstPass = processObj({
    src: doc,
    plugins: plugins,
    data: data
  }); // let non-completed files be interpolated

  var secondPass = processObj({
    src: firstPass,
    plugins: plugins,
    data: data
  });
  return _jsYaml.default.safeDump(secondPass);
};

exports.process = process;