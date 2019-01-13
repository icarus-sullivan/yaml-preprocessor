"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../utls/common");

var _default = {
  identifier: 'self',
  resolve: function resolve(context, path, defaultValue) {
    var src = context.src;
    return (0, _common.search)(src, path) || defaultValue;
  }
};
exports.default = _default;