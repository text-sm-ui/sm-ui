/*
 * @Descripttion: message 组件
 * @Author: lvjing
 * @Date: 2019-10-18 16:49:03
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-18 18:11:48
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

import './index.less';

class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            time: 3
        }
    }

    handleRemoveDom = () => {
        setTimeout(() =>{
            this.setState({
                time: 0
            })
        }, this.state.time * 1000)
    }

    componentDidMount() {
        this.handleRemoveDom();
    }
    render() {
        return (
            !this.state.time ? null : (
                <div>
                    <div className='sm-message-success'>
                        <i className='iconfont icon-chenggong'></i>
                        这是一条成功的消息
                    </div>
                    <div className='sm-message-success'>
                        <i className='iconfont icon-shibai'></i>
                        这是一条失败的消息
                    </div>
                    <div className='sm-message-success'>
                        <i className='iconfont icon-jinggao'></i>
                        这是一条警告的消息
                    </div>
                </div>
            )
        )
    }
}



Message.success = (content) => {
    console.log(content);
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Message), div);
}

export default Message;