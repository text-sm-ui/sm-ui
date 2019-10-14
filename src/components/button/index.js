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

export default class Button extends Component {
    render() {
        return (
            <button className={['sm-button', `sm-btn-${this.props.type}`].join(' ')}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                style={this.props.style}>
                <span>{ this.props.children }</span>
            </button>
        )
    }
};

Button.defaultProps = {
    type: 'default',
    disabled: false
}

Button.propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'danger', 'warning']),
    disabled: PropTypes.oneOf([true, false]),
}