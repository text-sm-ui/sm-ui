/*
 * @Descripttion: Tooltip 组件
 * @Author: lvjing
 * @Date: 2019-10-23 18:19:04
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-23 18:37:36
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class Tooltip extends Component {
    render() {
        return (
            <div className='sm-tooltip'>
                <div className='sm-tooltip-content'>
                    文字提示
                </div>
                <div className='sm-tooltip-jiantou'></div>
            </div>
        )
    }
}
