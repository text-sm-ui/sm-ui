/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-15 13:40:50
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-18 16:34:53
 */
import React, { Component } from 'react';

import './index.less';

import PropTypes from 'prop-types';

class Checkbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.defaultChecked
        }
    }
    handleCheckboxClick = () => {
        if (this.props.group) {
            this.setState({
                checked: !this.state.checked
            },() => {
                this.props.onChange(this.props.value);
            })
        } else {
            this.setState({
                checked: !this.state.checked
            }, () => {
                try{
                    this.props.onChange(this.state.checked)
                }
                catch{
                    console.error('这里可以绑定一个onChange事件')
                }
            })
        }
    }

    render() {
        return(
            <div style={{ display: 'inline-block' }}>
                <div className={['sm-checkbox', this.props.disabled ? 'sm-checkbox-disabled' : null].join(' ')}
                    style={this.props.style}>
                    <span
                    onClick={!this.props.disabled ? this.handleCheckboxClick : () => false}
                    className={['sm-checkbox-wapper',
                    this.state.checked ?  `sm-checkbox-checked-${this.props.type}` : '',
                    this.props.disabled ? 'sm-checkbox-disabled-span' : null].join(' ')}
                >
                    {
                        this.state.checked ? <i className='iconfont icon-gouxuan-'></i> : null
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
                    console.error('这里可以绑定一个onChange事件')
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
    onChange: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.element
}

Checkbox.defaultProps = {
    defaultChecked: false,
    type: 'primary'
}