/*
 * @Descripttion: message 组件
 * @Author: lvjing
 * @Date: 2019-10-18 16:49:03
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-19 21:59:41
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

import './index.less';

class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            time: this.props.time ? this.props.time : 3,
            returnNull: false
        }
    }

    handleRemoveDom = () => {
        setTimeout(() =>{
            this.setState({
                time: 0
            })
        }, this.state.time * 1000)
    }

    componentDidUpdate() {
        if (!this.state.time && !this.state.returnNull) {
            setTimeout(() => {
                this.setState({
                    returnNull: true
                })
            }, 750)
        }
    }

    componentDidMount() {
        this.handleRemoveDom();
    }
    render() {
        return (
            !this.state.returnNull ? <div className='sm-message-wapper'>
                                    <div className={['sm-message', this.state.time ? 'aniDown' : 'aniToptOut'].join(' ')} >
                                        <i className={['iconfont', this.props.className].join(' ')}></i>
                                        { this.props.text }
                                    </div>
                                </div> 
            : null
        )
    }
}



Message.success = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Message, { text: text, time: time, className: 'icon-chenggong' }), div);
}

Message.error = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Message, { text: text, time: time, className: 'icon-shibai' }), div);
}

Message.warning = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Message, { text: text, time: time, className: 'icon-jinggao' }), div);
}

Message.info = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Message, { text: text, time: time, className: 'icon-info1' }), div);
}

export default Message;

Message.propTypes = {
    text: PropTypes.string,
    time: PropTypes.number
}

