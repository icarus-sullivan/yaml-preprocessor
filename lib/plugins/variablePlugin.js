"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../utls/common");

var _default = {
  identifier: '.*',
  resolve: function resolve(context, identifier, path, defaultValue) {
    console.log('identiferi', identifier);
    var data = context.data;

    if (!data.hasOwnProperty(identifier)) {
      console.log('not found', identifier, path, defaultValue);
    }

    var builtPath = "".concat(identifier, ".").concat(path);
    return (0, _common.search)(data, builtPath) || defaultValue;
  }
};
exports.default = _default;