/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-15 18:15:59
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-16 11:30:19
 */

import React, { Component } from 'react';

import './index.less';

import PropTypes from 'prop-types';

class Radio extends Component {
    handleRadioClick = () => {
        try{
            this.props.onChange(this.props.value)
        }
        catch{
            this.props.onClick();
        }
    }

    render() {
        return(
            <div className={['sm-radio', this.props.disabled ? 'sm-radio-disabled' : null].join(' ')}
                style={this.props.style}>
                <span
                    onClick={!this.props.disabled ? this.handleRadioClick : () => false}
                    className={['sm-radio-wapper',
                    this.props.defaultChecked || this.props.defaultSelect === this.props.value ? `sm-radio-checked-${this.props.type}` : '',
                    this.props.disabled ? 'sm-radio-disabled-span' : null].join(' ')}
                >
                    {
                        this.props.defaultChecked || this.props.defaultSelect === this.props.value ? <i className='sm-icon-radio'></i> : null
                    }
                </span>
                <div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

class Group extends Component {
    render() {
        return (
            <div onChange={this.props.onChange}>
                {
                    React.Children.map(this.props.children, child => {
                        return React.cloneElement(child, {
                            defaultSelect: this.props.defaultSelect,
                            onChange: this.props.onChange
                        })
                    })
                }
            </div>
        )
    }
}

Radio.Group = Group;

export default Radio;


Radio.Prototype = {
    defaultSelect: PropTypes.any,
    type: PropTypes.oneOf(['primary', 'danger', 'warning']),
    onChange: PropTypes.func
}

Radio.defaultProps = {
    defaultSelect: '',
    type: 'primary'
}