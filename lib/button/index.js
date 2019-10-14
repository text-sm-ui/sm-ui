"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Button =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Button, _Component);

  function Button() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    return _react.default.createElement("button", {
      className: ['sm-button', "sm-btn-" + this.props.type].join(' '),
      onClick: this.props.onClick,
      disabled: this.props.disabled,
      style: this.props.style
    }, _react.default.createElement("span", null, this.props.children));
  };

  return Button;
}(_react.Component);

exports.default = Button;
;
Button.defaultProps = {
  type: 'default',
  disabled: false
};
Button.propTypes = {
  type: _propTypes.default.oneOf(['default', 'primary', 'danger', 'warning']),
  disabled: _propTypes.default.oneOf([true, false])
};