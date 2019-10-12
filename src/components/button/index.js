/*
 * @Descripttion: button
 * @Author: lvjing
 * @Date: 2019-10-12 20:17:52
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-13 00:52:56
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.css';

class SmButton extends Component {
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

export default SmButton;
