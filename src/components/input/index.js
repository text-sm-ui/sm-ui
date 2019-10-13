/*
 * @Author: lvjing
 * @Date: 2019-10-13 14:55:54
 * @LastEditTime: 2019-10-13 18:19:43
 * @LastEditors: lvjing
 * @Description: 
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class Input extends Component {
    
    static defaultProps = {
        type: 'text',
        omit: false,
        placeholder: '请输入',
        allowClear: false
    }

    static propTypes = {
        type: PropTypes.oneOf(['text', 'number', 'password']),
        omit: PropTypes.oneOf([true, false]),
        placeholder: PropTypes.any,
        allowClear: PropTypes.oneOf([true, false]),
    }
    
    handleClear = () => {
        console.log(this.props.allowClear)
    }

    render() {
        console.log()
        return (
            <div  className='sm-input-wrapper' style={this.props.style}>
                <input type='text' className={['sm-input', this.props.omit ? 'sm-input-omit' : ''].join(' ')} 
                    value={this.props.defaultValue}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}/>
                { this.props.allowClear ? <i className='iconfont icon-danseshixintubiao-'></i> : null }
            </div>
        )
    }
}
