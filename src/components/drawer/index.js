/*
 * @Description:  抽屉组件
 * @Author: lvjing
 * @Date: 2019-11-02 08:33:59
 * @LastEditTime: 2019-11-02 13:20:50
 * @LastEditors: lvjing
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class Drawer extends Component {
    static Prototype = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.number]),
        visible: PropTypes.bool,
        closable: PropTypes.bool,
        width: PropTypes.number,
        onClose: PropTypes.func
    }
    
    static defaultProps = {
        title: 'Basic Drawer title',
        children: '',
        visible: false,
        closable: false,
        width: 300,
        onClose: () => {}
    }

    componentDidUpdate (props) {
        if (props.visible) {
            document.body.style = 'overflow: hidden';
        } else {
            document.body.style = ''; 
        }
    }


    onClose = () => {
        try{
            this.props.onClose();
        }
        catch {
        }
    }

    render() {
        const { closable, width, visible } = this.props;
        return (
            <div className='sm-drawer-wapper' style={{ display: visible ? 'block' : 'none' }}>
                <div className={['sm-drawer-content', visible ? 'drawer-left-in' : null].join(' ')} style={{ width: width }}>
                    <div className='sm-drawer-header'>
                        { this.props.title }
                        {
                            closable ? <i className='iconfont icon-guanbi' onClick={ this.onClose }></i> : null
                        }
                    </div>
                    <div className='sm-drawer-body'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
} 