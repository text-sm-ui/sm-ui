/*
 * @Descripttion: 
 * @Author: lvjing
 * @Date: 2019-10-13 09:12:48
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-13 11:50:09
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

class Button extends Component {
    static defaultProps = {
        type: 'default',
        disabled: false
    }
    static propTypes = {
        type: PropTypes.oneOf(['default', 'primary', 'danger', 'warning']),
        disabled: PropTypes.oneOf([true, false])
    }
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

export default Button;