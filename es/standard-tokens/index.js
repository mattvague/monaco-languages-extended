'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rust = require('./rust/rust.js');

Object.defineProperty(exports, 'rust', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_rust).default;
  }
});

var _elixir = require('./elixir/elixir.js');

Object.defineProperty(exports, 'elixir', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_elixir).default;
  }
});

var _perl = require('./perl/perl.js');

Object.defineProperty(exports, 'perl', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_perl).default;
  }
});

var _maxima = require('./maxima/maxima.js');

Object.defineProperty(exports, 'maxima', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_maxima).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }