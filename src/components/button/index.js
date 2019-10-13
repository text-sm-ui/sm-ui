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
    }
    static propTypes = {
        type: PropTypes.string,
    }
    render() {
        return (
            <button className={['sm-button', `sm-btn-${this.props.type}`].join(' ')}>
                { this.props.children }
            </button>
        )
    }
};

export default Button;