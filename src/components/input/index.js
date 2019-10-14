/*
 * @Author: lvjing
 * @Date: 2019-10-13 14:55:54
 * @LastEditTime: 2019-10-14 13:30:26
 * @LastEditors: lvjing
 * @Description:
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue
        }
    }

    handleOnChange = (e) => {
        let val = e ? e.target.value : '';
        this.setState({
            value: val
        }, () => {
            this.props.onChange(this.state.value)
        })
    }

    render() {
        const allowClearType = this.state.value;
        return (
            <div  className='sm-input-wrapper' style={this.props.style}>
                <input className={['sm-input', this.props.omit ? 'sm-input-omit' : ''].join(' ')}
                    type={this.props.type}
                    disabled={this.props.disabled}
                    maxLength={this.props.maxlength}
                    max={this.props.max}
                    min={this.props.min}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.handleOnChange}/>
                { this.props.allowClear && allowClearType && this.props.type !== 'password' ? <i className='iconfont icon-danseshixintubiao-' onClick={() => this.handleOnChange('')}></i> : null }
            </div>
        )
    }
}

Input.defaultProps = {
    type: 'text',
    omit: false,
    placeholder: '请输入~~',
    allowClear: false,
    disabled: false
}

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'password']),
    placeholder: PropTypes.any,
    allowClear: PropTypes.oneOf([true, false]),
    disabled: PropTypes.oneOf([true, false]),
    omit: PropTypes.oneOf([true, false]),
    onChange: PropTypes.func.isRequired,
    maxlength: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number
}