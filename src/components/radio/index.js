/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-15 18:15:59
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-15 18:30:36
 */

import React, { Component } from 'react';

import './index.less';

import PropTypes from 'prop-types';

export default class Radio extends Component {
    componentDidUpdate() {
        try{
            this.props.onChange(this.props.defaultChecked)
        }
        catch{
            console.error("error")
        }
    }
    render() {
        return(
            <div className={['sm-radio', this.props.disabled ? 'sm-radio-disabled' : null].join(' ')}
                style={this.props.style}>
                <span
                    onClick={!this.props.disabled ? this.props.onClick : () => false}
                    className={['sm-radio-wapper',
                    this.props.defaultChecked ? `sm-radio-checked-${this.props.type}` : '',
                    this.props.disabled ? 'sm-radio-disabled-span' : null].join(' ')}
                >
                    {
                        this.props.defaultChecked ? <i className='iconfont icon-gouxuan-'></i> : null
                    }
                </span>
                <div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

Radio.Prototype = {
    defaultChecked: PropTypes.oneOf([true, false]),
    type: PropTypes.oneOf(['primary', 'danger', 'warning']),
    onClick: PropTypes.func
}

Radio.defaultProps = {
    defaultChecked: false,
    type: 'primary'
}