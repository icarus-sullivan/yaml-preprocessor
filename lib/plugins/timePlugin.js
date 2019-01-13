"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  identifier: 'date',
  resolve: function resolve(context, some, value, here) {
    var now = new Date(Date.now());

    switch (some) {
      case 'iso':
        {
          return now.toISOString();
        }

      case 'utc':
        {
          return now.toUTCString();
        }

      default:
        {
          return now.toLocaleDateString();
        }
    }
  }
};
exports.default = _default;