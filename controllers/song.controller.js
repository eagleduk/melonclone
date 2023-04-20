"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfo = exports.pull = void 0;

var _song = _interopRequireDefault(require("../models/song.model"));

var _youtube = require("../api/youtube.api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pull = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var songs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.query.key === process.env.PULLREQUESTKEY)) {
              _context.next = 8;
              break;
            }

            _context.next = 3;
            return _song["default"].deleteMany({});

          case 3:
            _context.next = 5;
            return (0, _youtube.PullVideo)();

          case 5:
            songs = _context.sent;

            _song["default"].insertMany(songs);

            return _context.abrupt("return", res.send("<h1> Pull </h1>"));

          case 8:
            return _context.abrupt("return", res.send("<h1> Hello </h1>"));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function pull(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.pull = pull;

var getInfo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getInfo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getInfo = getInfo;