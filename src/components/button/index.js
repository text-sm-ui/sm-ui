/*
 * @Descripttion: button
 * @Author: lvjing
 * @Date: 2019-10-12 20:17:52
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-12 20:44:26
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.css';

class Buttons extends Component {
    static defaultProps = {
        text: '按钮'
    }
    static propTypes = {
        text: PropTypes.string 
    }
    
    render() {
        return (
            <button className='btn'>{ this.props.children }</button>
        )
    }
}

export default Buttons
