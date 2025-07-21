"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _reactDomClient = require("react-dom/client");

var _reactDomClient2 = _interopRequireDefault(_reactDomClient);

var root = _reactDomClient2["default"].createRoot(document.getElementById("root"));
root.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(Calculator, null)
));

function Calculator() {
  return React.createElement(
    "h1",
    null,
    "This Worked!"
  );
}
