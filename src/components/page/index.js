/*
 * @Descripttion: 分页组件
 * @Author: lvjing
 * @Date: 2019-10-22 17:48:46
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-22 18:35:32
 */


import React, { Component } from 'react'

import PropTypes from 'prop-types';

import './index.less';

export default class Page extends Component {
    render() {
        return (
            <div className='sm-page'>
                <div className='sm-page-page-list'>
                    <span><i className='iconfont icon-arrow-right'></i></span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <i className='sm-page-page-next'></i>
                    <i className='iconfont icon-double-arrow-left1' title='向后五页'></i>
                    <span>10</span>
                    <span><i className='iconfont icon-arrow-right1'></i></span>
                </div>
                <div className='sm-page-pageSize'>
                    20 条/页
                    <i className='iconfont icon-arrow-left'></i>
                    <div className='sm-page-pageSize-list'>
                        <ul>
                            <li className='sm-page-pageSize-checked'>10 条/页</li>
                            <li>20 条/页</li>
                            <li>50 条/页</li>
                            <li>100 条/页</li>
                        </ul>
                    </div>
                </div>
                <div className='sm-page-elevator'>
                    <div style={{ marginRight: 7 }}>跳至</div>
                    <input type='text' className='sm-input'/>
                    <span style={{ marginLeft: 7 }}>页</span>
                </div>
            </div>
        )
    }
}
