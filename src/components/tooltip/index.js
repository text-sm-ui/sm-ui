/*
 * @Descripttion: Tooltip 组件
 * @Author: lvjing
 * @Date: 2019-10-23 18:19:04
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-26 11:29:56
 */

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import './index.less';

export default class Tooltip extends Component {
    constructor(props){
        super(props)
        this.state = {
            left: 0,
            top: 0,
            hover: false,
            direction: ''
        }
    }

    handleMouse = () => {
        // this.setState({
        //     hover: true,
        //     hidden: true
        // })
        this.handleSetDifference(true)
    }
    onMouseOut = () => {
        this.setState({
            hover: false
        })
    }

    handleSetDifference = (hover) => {
        let wapper = ReactDOM.findDOMNode(this.refs.wapper).offsetWidth / 2;
        let sm = (ReactDOM.findDOMNode(this.refs.sm).offsetWidth) / 2;
        this.setState({
            hover: hover,
            left:  sm - wapper
        },() => {
            let domHeigh = ReactDOM.findDOMNode(this.refs.wapper).clientHeight;

            let winheight = window.innerHeight;

            let top = ReactDOM.findDOMNode(this.refs.wapper).parentElement.offsetTop;

            let difference = winheight - top;


            if ( difference > domHeigh ) {
                this.setState({
                    direction: 'button',
                    top: domHeigh
                })
            } else {
                this.setState({
                    direction: 'top',
                    top: domHeigh - 2
                });
            }
        });
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            if (this.state.hover) {
                this.handleSetDifference(true);
            }
        });
    }
    render() {
        const { hover, direction, top } = this.state;
        return (
            <div className='sm-tooltip'>
                <div ref='sm' onMouseOver={this.handleMouse} onMouseOut={this.onMouseOut} style={{ cursor:'pointer' }}>
                    {
                        this.props.children
                    }
                </div>
                <div className={['sm-tooltip-wapper', hover ? 'tooptilFadeIn' : null ].join(' ')}
                    style={ hover ? { top: direction === 'top' ? -(top + 10) : null, marginTop: direction === 'top' ? 0 : null  } : null } ref='wapper'>
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