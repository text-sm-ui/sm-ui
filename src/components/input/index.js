/*
 * @Author: lvjing
 * @Date: 2019-10-13 14:55:54
 * @LastEditTime: 2019-10-17 23:46:05
 * @LastEditors: lvjing
 * @Description:
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class Input extends Component {
    handleOnChange = () => {
        try{
            this.props.handleClearClick()
        }
        catch{
            console.log('这里可以绑定一个点击清楚按钮时的事件')
        }
    }
    render() {
        return (
            <div className='sm-input-wrapper' style={this.props.style}>
                <input className={['sm-input', this.props.omit ? 'sm-input-omit' : ''].join(' ')}
                    type={this.props.type}
                    disabled={this.props.disabled}
                    maxLength={this.props.maxlength}
                    max={this.props.max}
                    min={this.props.min}
                    readOnly={this.props.readOnly}
                    value={this.props.defaultValue}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}/>
                { this.props.allowClear && this.props.defaultValue ? <i className='iconfont icon-danseshixintubiao-' onClick={this.handleOnChange}></i> : null }
            </div>
        )
    }
}

Input.defaultProps = {
    type: 'text',
    omit: false,
    placeholder: '请输入',
    allowClear: false,
    disabled: false,
    readOnly: false
}

Input.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    type: PropTypes.oneOf(['text', 'number', 'password']),
    placeholder: PropTypes.string,
    allowClear: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    omit: PropTypes.bool,
    onChange: PropTypes.func,
    maxlength: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number
}