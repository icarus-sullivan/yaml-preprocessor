"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var COMMON_MATCH = /\$\{.*\}/g;
var COMMON_SPLITTER = /\$\{|\(|\)|\:|, |,|\|\||\s+|\}/g;
var COMMON_SPLITTER_MIN = /\$|\}/g;
var QUOTE_REGEX = /["']/g;

var processPlugins = function processPlugins(context, value) {
  var _context$plugins = context.plugins,
      plugins = _context$plugins === void 0 ? [] : _context$plugins;
  var commonSplits = value.split(COMMON_SPLITTER).filter(function (c) {
    return c;
  });
  var resolveArgs = commonSplits.map(function (di) {
    return di.replace(QUOTE_REGEX, '');
  });

  var _resolveArgs = _slicedToArray(resolveArgs, 1),
      id = _resolveArgs[0];

  var _ref = plugins.filter(function (pl) {
    return pl.identifier === id;
  }) || [],
      _ref2 = _slicedToArray(_ref, 1),
      plugin = _ref2[0];

  if (plugin) {
    // pass context, remove identifier from args as they aren't needed
    return plugin.resolve.apply(plugin, [context].concat(_toConsumableArray(resolveArgs.slice(1))));
  }

  return value;
};

var processSplitMin = function processSplitMin(context, value) {
  if (typeof value !== 'string') {
    return value;
  } // split arguments, filter out empties, then run them
  // against plugins. 


  var result = value.split(COMMON_SPLITTER_MIN).filter(function (v) {
    return v;
  }).map(function (v) {
    // if this is an interpolator and not a unresolved method arg
    if (v.charAt(0) === '{' && v.slice(-1) !== '(') {
      return processPlugins(context, "$".concat(v, "}"));
    }

    return v;
  });

  var _ref3 = result || [],
      _ref4 = _slicedToArray(_ref3, 1),
      first = _ref4[0]; // in case this was not a flat string replacement, for example
  // a file() call, this will be an object, so we don't want to join


  if (typeof first !== 'string') {
    return first;
  }

  return result.join('');
};

var pluginProcessor = function pluginProcessor(context, value) {
  if (typeof value === 'string' && value.match(COMMON_MATCH)) {
    // process internal values first
    var firstPass = processSplitMin(context, value); // process secondary wrapped items

    return processSplitMin(context, firstPass);
  }

  return value;
};

var _default = pluginProcessor;
exports.default = _default;