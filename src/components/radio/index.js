/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-15 18:15:59
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-18 16:33:26
 */

import React, { Component } from 'react';

import './index.less';

import PropTypes from 'prop-types';

class Radio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.defaultChecked,
        }
    }
    handleRadioClick = () => {
        if (this.props.group) {
            this.props.onClick(this.props.value)
        } else {
            this.setState({
                checked: !this.state.checked
            }, () => {
                try{
                    this.props.onChange(this.state.checked);
                }
                catch{
                    console.error("这里可以绑定一个onChange事件");
                }
            })
        }
    }

    render() {
        return(
            <div style={{ display: 'inline-block' }}>
                <div className={['sm-radio', this.props.disabled ? 'sm-radio-disabled' : null].join(' ')}
                    style={this.props.style}>
                    <span
                        onClick={!this.props.disabled ? this.handleRadioClick : () => false}
                        className={['sm-radio-wapper',
                        (this.state.checked && !this.props.group) || this.props.defaultChecked === this.props.value ? `sm-radio-checked-${this.props.type}` : '',
                        this.props.disabled ? 'sm-radio-disabled-span' : null].join(' ')}
                    >
                        {
                            (this.state.checked && !this.props.group) || this.props.defaultChecked === this.props.value ? <i className='sm-icon-radio'></i> : null
                        }
                    </span>
                    <div>
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}

class Group extends Component {
    constructor(props){
        super(props)
        this.state = {
            checked: this.props.defaultChecked
        }
    }
    handleDetailOnChange = (val) => {
        this.setState({
            checked: val
        }, () => {
            try{
                this.props.onChange(val)
            }
            catch{
                console.error("这里可以绑定一个onChange事件")
            }
        })
    }
    render() {
        return (
            <div>
                {
                    React.Children.map(this.props.children, child => {
                        return React.cloneElement(child, {
                            defaultChecked: this.state.checked,
                            onClick: this.handleDetailOnChange,
                            group: true
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
    defaultChecked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.oneOf(['primary', 'danger', 'warning']),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    style: PropTypes.object
}

Radio.defaultProps = {
    defaultChecked: '',
    type: 'primary',
    disabled: false
}