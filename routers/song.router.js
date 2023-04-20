"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _song = require("../controllers/song.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var songRouter = _express["default"].Router();

songRouter.get("/pull", _song.pull);
songRouter.get("/:id", _song.getInfo);
var _default = songRouter;
exports["default"] = _default;