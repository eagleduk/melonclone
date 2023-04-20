"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PullVideo = PullVideo;

var _googleapis = require("googleapis");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

globalThis.youtube = globalThis.youtube || _googleapis.google.youtube({
  version: "v3",
  auth: process.env.API_KEY
});

function PullVideo() {
  return _PullVideo.apply(this, arguments);
}

function _PullVideo() {
  _PullVideo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return globalThis.youtube.videos.list({
              part: "id,snippet,player,statistics",
              chart: "mostPopular",
              videoCategoryId: "10",
              regionCode: "KR",
              maxResults: 100
            });

          case 2:
            response = _context.sent;

            if (!(response.statusText === "OK")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", response.data.items);

          case 5:
            return _context.abrupt("return", []);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _PullVideo.apply(this, arguments);
}