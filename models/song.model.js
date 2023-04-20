"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var songSchema = new _mongoose["default"].Schema({
  id: String,
  snippet: {
    title: String,
    description: String,
    thumbnails: {
      "default": {
        url: String,
        width: Number,
        height: Number
      },
      medium: {
        url: String,
        width: Number,
        height: Number
      },
      high: {
        url: String,
        width: Number,
        height: Number
      },
      standard: {
        url: String,
        width: Number,
        height: Number
      }
    }
  },
  statistics: {
    viewCount: Number
  },
  player: {
    embedHtml: String
  }
});

var Song = _mongoose["default"].model("Song", songSchema);

var _default = Song;
exports["default"] = _default;