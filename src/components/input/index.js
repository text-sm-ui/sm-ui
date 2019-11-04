/*
 * @Author: lvjing
 * @Date: 2019-10-13 14:55:54
 * @LastEditTime: 2019-11-04 17:31:37
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
        const { errors, style, omit, type, disabled, maxlength, max,
            min, readOnly, defaultValue, placeholder, allowClear
        } = this.props;
        return (
            <div className='sm-input-wrapper' style={style}>
                <input className={['sm-input', omit ? 'sm-input-omit' : '', errors ? 'sm-input-danger' : null].join(' ')}
                    type={ type }
                    disabled={ disabled }
                    maxLength={ maxlength }
                    max={ max }
                    min={ min }
                    readOnly={ readOnly }
                    value={ defaultValue }
                    placeholder={ placeholder }
                    onChange={this.props.onChange}/>
                { allowClear && defaultValue ? <i className='iconfont icon-danseshixintubiao-' onClick={this.handleOnChange}></i> : null }
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
    readOnly: false,
    style: {},
    maxlength: '',
    errors: false
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
    min: PropTypes.number,
    errors: PropTypes.bool
}