/*
 * @Descripttion: Tooltip 组件
 * @Author: lvjing
 * @Date: 2019-10-23 18:19:04
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-23 23:00:23
 */

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import './index.less';

export default class Tooltip extends Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: true,
            left: 0,
            top: 0,
            hover: false,
            direction: ''
        }
    }

    handleMouse = () => {
        this.setState({
            hover: true,
            hidden: false
        })
    }
    onMouseOut = () => {
        this.setState({
            hover: false
        })
    }

    componentDidMount() {
        let wapper = ReactDOM.findDOMNode(this.refs.wapper).offsetWidth / 2;
        let sm = (ReactDOM.findDOMNode(this.refs.sm).offsetWidth) / 2;
        
        let domHeigh = ReactDOM.findDOMNode(this.refs.wapper).scrollHeight;

        let winheight = window.innerHeight;

        let top = ReactDOM.findDOMNode(this.refs.wapper).offsetParent.offsetTop;

        let difference = winheight - top;

        if ( difference > domHeigh) {
            this.setState({
                direction: 'button',
                top: domHeigh
            })
        } else {
            this.setState({
                direction: 'top',
                top: domHeigh
            })
        }
        this.setState({
            left:  sm - wapper
        });
    }
    render() {
        const { left, hover, hidden, direction, top } = this.state;
        return (
            <div className='sm-tooltip'>
                <div ref='sm' onMouseOver={this.handleMouse} onMouseOut={this.onMouseOut} style={{ cursor:'pointer' }}>
                    {
                        this.props.children
                    }
                </div>
                <div className={['sm-tooltip-wapper', hover ? 'tooptilFadeIn' : 'tooptilFadeOut' ].join(' ')} 
                    style={ !hidden ? { left: left, visibility: 'visible', top: direction === 'top' ? -top - 10 : null, marginTop: direction === 'top' ? 0 : null  } : null } ref='wapper'>
                    <div className='sm-tooltip-content'>
                        { this.props.content }
                    </div>
                    <div className={['sm-tooltip-jiantou', direction === 'top' ? 'sm-jiantou-top' : null ].join(' ')} 
                        style={ direction === 'top' ? { top: top} : null}>
                    </div>
                </div>
            </div>
        )
    }
}


Tooltip.Prototype = {
    children: PropTypes.element,
    content: PropTypes.string
}

Tooltip.defaultProps = {
    content: ''
}