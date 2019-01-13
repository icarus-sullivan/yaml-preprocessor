"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.parseSafeSync = exports.readSafeSync = void 0;

var fs = require('fs');

var readSafeSync = function readSafeSync(filename) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';

  try {
    return fs.readFileSync(filename, encoding);
  } catch (e) {
    return undefined;
  }
};

exports.readSafeSync = readSafeSync;

var parseSafeSync = function parseSafeSync(src) {
  if (typeof src !== 'string') {
    return undefined;
  }

  try {
    var o = JSON.parse(src);

    if (o) {
      return o;
    }
  } catch (e) {}

  return undefined;
};

exports.parseSafeSync = parseSafeSync;

var search = function search(obj, path) {
  return path.replace(/\]/g, '').replace(/\[/g, '.').split('.').reduce(function (acc, key) {
    return acc ? acc[key] : undefined;
  }, obj);
};

exports.search = search;