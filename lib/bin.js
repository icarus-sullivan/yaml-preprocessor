#!/usr/bin/env node
"use strict";

var _nodeArgs = _interopRequireDefault(require("node-args"));

var _common = require("./utls/common");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filename = _nodeArgs.default.file || _nodeArgs.default.f;
var input = _nodeArgs.default.input || _nodeArgs.default.i;
var data = _nodeArgs.default.data || _nodeArgs.default.d || {};
var inputContent = (0, _common.readSafeSync)(input) || '{}';
var inputData = (0, _common.parseSafeSync)(inputContent) || {};
var parsedData = (0, _common.parseSafeSync)(data) || {};
var yamlFile = (0, _common.readSafeSync)(filename, 'utf8');

var payload = _objectSpread({}, inputData, parsedData, _nodeArgs.default);

console.log((0, _index.process)(yamlFile, payload));