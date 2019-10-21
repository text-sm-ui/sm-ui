/*
 * @Description:
 * @Author: lvjing
 * @Date: 2019-10-19 22:00:53
 * @LastEditTime: 2019-10-21 11:06:42
 * @LastEditors: lvjing
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { SmButton } from '../index';

import './index.less';


export default class Modal extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }
    handleOk = () => {
        this.props.handleOk()
    }
    handleCancel = () => {
        this.setState({
            show: true
        }, () => {
            setTimeout(() => {
                this.props.handleCancel();
                this.setState({
                    show: false
                })
            }, 500)
        })
    }

    handleFooter = () => {
        if ( this.props.footer === null ) return null
        return (
            <div style={{ textAlign: 'right' }}>
                <SmButton style={{ marginRight: 15 }} onClick={this.handleCancel}>
                    { this.props.cancelText }
                </SmButton>
                <SmButton type='primary' onClick={this.handleOk}>
                    { this.props.onText }
                </SmButton>
            </div>
        )
    }

    onKeyDown = (e) => {
        if (e.keyCode === 27) {
           this.handleCancel();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown)
    }

    static getDerivedStateFromProps(preProps, countState) {
        if (preProps.visible && !countState.show) {
            document.body.style = 'overflow: hidden'
        }  else if (!preProps.visible && countState.show) {
            document.body.style = ''
        }
        return null;
    }

    render() {
        return (
            <div className='sm-modal-background' style={this.props.visible ? {'display': 'block'} : {'display': 'none'}}>
                <div className={['sm-modal-content', this.props.visible ? 'smEaseIn' : null, this.state.show ? 'smEaseOut' : null].join(' ')}
                    style={this.props.style}>
                    <div className='sm-modal-header'>
                        <div>
                            { this.props.title }
                        </div>
                        {
                            this.props.closable ? null : <i className='iconfont icon-guanbi' onClick={this.handleCancel}></i>
                        }
                    </div>
                    <div className='sm-modal-body'>
                        {
                            this.props.children
                        }
                    </div>
                    <div className='sm-modal-footer'>
                        {
                            this.props.footer ? this.props.footer : this.handleFooter()
                        }
                    </div>
                </div>
            </div>
        )
    }
}


Modal.Prototype = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    visible: PropTypes.bool,
    children: PropTypes.element,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    footer: PropTypes.element,
    cancelText: PropTypes.string,
    onText: PropTypes.string,
    style: PropTypes.object,
    closable: PropTypes.bool
}

Modal.defaultProps = {
    visible: false,
    title: '普通的Modal对话框标题',
    cancelText: '取消',
    onText: '确定',
    style: {
        minWidth: '520px'
    },
    closable: false
}