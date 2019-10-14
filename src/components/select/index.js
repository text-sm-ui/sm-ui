/*
 * @Descripttion: select
 * @Author: lvjing
 * @Date: 2019-10-14 11:27:19
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-14 18:27:02
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

class Options extends Component {
    render() {
        return (
            <div></div>
        )
    }
}

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            list: [
                {name: '第一项', id: 1},
                {name: '第一项', id: 2},
                {name: '第一项', id: 3},
                {name: '第一项', id: 4},
                {name: '第一项', id: 5},
            ]
        }
    }

    handleOnClick = () => {

    }
    render() {
        return (
            <div className='sm-input-wrapper' style={this.props.style}>
                <input type='text' className={['sm-input'].join(' ')}
                    onClick={() => this.setState({showList: true})}
                    onBlur={() => this.setState({showList: false})} />
                <i className='iconfont icon-arrow-left'></i>
                <div className={['sm-select-list', 'bounceInDown animated'].join(' ')}
                    style={this.state.showList ? {'display': 'block'} : {'display': 'none'}}>
                    <ul>
                        <li data-value='1' onClick={this.handleOnClick}>第一项</li>
                        <li data-value='2'>第二项</li>
                        <li data-value='3'>第三项</li>
                        <li data-value='4'>第四项</li>
                        <li data-value='5'>第五项</li>
                    </ul>
                </div>
            </div>
        )
    }
}