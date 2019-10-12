/*
 * @Descripttion: button
 * @Author: lvjing
 * @Date: 2019-10-12 20:17:52
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-12 20:44:26
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Button = ({ text }) => <button className="btn">这是一个组件按钮{text}</button>

Button.propTypes = {
  text: PropTypes.any
};

export default Button;
