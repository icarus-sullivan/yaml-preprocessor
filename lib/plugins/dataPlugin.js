"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../utls/common");

var _default = {
  identifier: 'data',
  resolve: function resolve(context, path, defaultValue) {
    var data = context.data;
    return (0, _common.search)(data, path) || defaultValue;
  }
};
exports.default = _default;