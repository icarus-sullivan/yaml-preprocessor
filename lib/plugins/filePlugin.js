"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _common = require("../utls/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  identifier: 'file',
  resolve: function resolve(context, filename, variable, defaultValue) {
    var contents = (0, _common.readSafeSync)(filename, 'utf8'); // contents wasn't found, just return defaultValue 

    if (!contents) {
      return defaultValue;
    } // load yaml->js


    var loadedFile = _jsYaml.default.safeLoad(contents); // if variable pass that back


    if (variable) {
      return loadedFile[variable] || defaultValue;
    }

    return loadedFile;
  }
};
exports.default = _default;