/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-15 13:40:50
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-16 17:42:38
 */
import React, { Component } from 'react';

import './index.less';

import PropTypes from 'prop-types';

class Checkbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }
    handleCheckboxClick = () => {
        try{
            if (this.props.group) {
                this.setState({
                    checked: !this.state.checked
                },() => {
                    this.props.onChange(this.props.value);
                })
            } else {
                this.props.onClick();
            }
        }
        catch{
            this.props.onClick();
        }
    }

    render() {
        return(
            <div style={{ overflow: 'hidden', display: 'inline-block' }}>
                <div className={['sm-checkbox', this.props.disabled ? 'sm-checkbox-disabled' : null].join(' ')}
                    style={this.props.style}>
                    <span
                    onClick={!this.props.disabled ? this.handleCheckboxClick : () => false}
                    className={['sm-checkbox-wapper',
                    this.props.defaultChecked || this.state.checked ?  `sm-checkbox-checked-${this.props.type}` : '',
                    this.props.disabled ? 'sm-checkbox-disabled-span' : null].join(' ')}
                >
                    {
                        this.props.defaultChecked || this.state.checked ? <i className='iconfont icon-gouxuan-'></i> : null
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
    constructor(props) {
        super(props);
        this.state = {
            checkedValues: []
        }
    }
    handleChange = (val) => {
        if (this.state.checkedValues.indexOf(val) === -1) {
            let arr = this.state.checkedValues;
            arr.push(val);
            this.setState({
                checkedValues: arr
            }, () => {
                try{
                    this.props.onChange(this.state.checkedValues)
                }
                catch{
                    console.error('error')
                }
            })
        } else {
            this.setState({
                checkedValues: this.state.checkedValues.filter(v => v !== val)
            }, () => {
                try{
                    this.props.onChange(this.state.checkedValues)
                }
                catch{
                    console.error('error')
                }
            });
        }
    }
    render() {
        return (
            <div>
                {
                    React.Children.map(this.props.children, child => {
                        return React.cloneElement(child, {
                            onChange: this.handleChange,
                            checkedValues: this.state.checkedValues,
                            group: true
                        })
                    })
                }
            </div>
        )
    }
}

Checkbox.Group = Group;

export default Checkbox


Checkbox.Prototype = {
    defaultChecked: PropTypes.oneOf([true, false]),
    type: PropTypes.oneOf(['primary', 'danger', 'warning']),
    onChange: PropTypes.func
}

Checkbox.defaultProps = {
    defaultChecked: false,
    type: 'primary'
}