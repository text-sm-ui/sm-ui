/*
 * @Description: notice 组件
 * @Author: lvjing
 * @Date: 2019-10-18 22:34:32
 * @LastEditTime: 2019-10-19 22:00:43
 * @LastEditors: lvjing
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

import './index.less';

class Notice extends Component{
    constructor(props){
        super(props)
        this.state = {
            time: this.props.time ? this.props.time : 5,
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

    handleClose = () => {
        this.setState({
            time: 0
        });
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
            !this.state.returnNull ? <div className='sm-notice-wapper'>
                                <div className={['sm-notice', this.state.time ? 'aniRightIn' : 'aniRightOut'].join(' ')} >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className={['iconfont', this.props.className].join(' ')}></i>
                                            <p className='sm-notice-title'>这是通知标题</p>
                                        </div>
                                        <i className='iconfont icon-guanbi' onClick={ this.handleClose }></i>
                                    </div>
                                    <div style={{ color: '#515a6e' }}>
                                        这条通知不会自动关闭，需要点击关闭按钮才可以关闭。
                                    </div>
                                </div>
                            </div> 
            : null
        )
    }
}


Notice.success = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Notice, { text: text, time: time, className: 'icon-chenggong' }), div);
}

Notice.error = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Notice, { text: text, time: time, className: 'icon-shibai' }), div);
}

Notice.warning = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Notice, { text: text, time: time, className: 'icon-jinggao' }), div);
}

Notice.info = (text, time) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Notice, { text: text, time: time, className: 'icon-info1' }), div);
}

export default Notice;

Notice.propTypes = {
    text: PropTypes.string,
    time: PropTypes.number
}
