/*
 * @Author: lvjing
 * @Date: 2019-10-13 14:55:54
 * @LastEditTime: 2019-10-14 10:00:32
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
                <input type='text' className={['sm-input', this.props.omit ? 'sm-input-omit' : ''].join(' ')}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.handleOnChange}/>
                { this.props.allowClear && allowClearType ? <i className='iconfont icon-danseshixintubiao-' onClick={() => this.handleOnChange('')}></i> : null }
            </div>
        )
    }
}
