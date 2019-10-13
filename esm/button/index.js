function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * @Descripttion: 
 * @Author: lvjing
 * @Date: 2019-10-13 09:12:48
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-13 09:21:28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

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
      className: ['sm-button', "sm-btn-" + this.props.type].join(' ')
    }, this.props.children);
  };

  return Button;
}(Component);

Button.defaultProps = {
  type: 'default'
};
Button.propTypes = {
  type: PropTypes.string
};
;
export default Button;