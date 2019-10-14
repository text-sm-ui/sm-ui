function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-13 09:12:48
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-14 10:58:51
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

var Button =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Button, _Component);

  function Button() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    return React.createElement("button", {
      className: ['sm-button', "sm-btn-" + this.props.type].join(' '),
      onClick: this.props.onClick,
      disabled: this.props.disabled,
      style: this.props.style
    }, React.createElement("span", null, this.props.children));
  };

  return Button;
}(Component);

export { Button as default };
;
Button.defaultProps = {
  type: 'default',
  disabled: false
};
Button.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'danger', 'warning']),
  disabled: PropTypes.oneOf([true, false])
};