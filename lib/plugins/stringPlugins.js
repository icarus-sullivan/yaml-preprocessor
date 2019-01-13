"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upperPlugin = exports.lowerPlugin = void 0;
var lowerPlugin = {
  identifier: 'lower',
  resolve: function resolve(context, value) {
    return value.toLowerCase();
  }
};
exports.lowerPlugin = lowerPlugin;
var upperPlugin = {
  identifier: 'upper',
  resolve: function resolve(context, value) {
    return value.toUpperCase();
  }
};
exports.upperPlugin = upperPlugin;