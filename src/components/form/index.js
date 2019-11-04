/*
 * @Descripttion: 表单组件
 * @Author: lvjing
 * @Date: 2019-11-04 09:17:31
 * @LastEditors: lvjing
 * @LastEditTime: 2019-11-04 18:23:59
 */

import React, { Component } from 'react';

import './index.less';

import Schema from 'async-validator';

import { isArray } from 'util';


class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            object: {},
            rules: {},
            errors: ''
        }
    }

    handleFormData = (v) => {
        this.setState({
            object: Object.assign(this.state.object, v)
        })
    }

    handleErrors = (errors) => {
        this.setState({
            errors: errors
        })
    }

    validate = (callback) => {
        let { object, rules } = this.state;
        let validator = new Schema(rules);
        validator.validate(object, (errors, fields) => {
            if(errors) {
              // validation failed, errors is an array of all errors
              // fields is an object keyed by field name with an array of
              // errors per field
              return this.handleErrors(errors, fields);
            }
            this.setState({
                errors: ''
            }, () => {
                callback(this.state.object)
            })
        });
    }

    resetFields = () => {
        this.setState({
            errors: ''
        })
    }

    componentDidMount() {
        let rules = {};
        let object = {};
        this.props.children.forEach(v => {
            if (v.props.rules) {
                rules = Object.assign({[v.props.name] : v.props.rules}, rules);
                object = Object.assign({[v.props.name] : ''}, object);
            }
        })
        this.setState({
            rules: rules,
            object: object
        })
    }

    render() {
        return (
            <div className='sm-form'>
                {
                    React.Children.map(this.props.children, child => {
                        return React.cloneElement(child, {
                            handleFormData: this.handleFormData,
                            errors: this.state.errors ? this.state.errors.filter(v => v.field === child.props.name)[0] : null
                        })
                    })
                }
            </div>
        )
    }
}

class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            err: false
        }
    }

    handleInputChange = (e, name) => {
        console.log(this.props.errors)
        let valueType = typeof(e)
        let value;
        if (isArray(e)) {
            value = e;
            this.setState({
                err: true
            })
        } else {
            value = valueType === 'object' ? e.target.value : e;
        }
        this.setState({
            [name]: value
        }, () => {
            this.props.handleFormData({[name]: value});
        })
    }

    render() {
        const { errors } = this.props;
        return (
            <div className='sm-form-wapper'>
                <label className='sm-form-label'>
                    { this.props.rules.some(v => v.required) ? <i className='iconfont icon-must-fill2'></i> : null }
                    {this.props.label}
                </label>
                <div className='sm-form-item-content'>
                    {
                        React.cloneElement(this.props.children, {
                            onChange: (e) => this.handleInputChange(e, this.props.name),
                            errors: errors ? true : false
                        })
                    }
                    {
                        errors ? <span className='sm-form-item-message errFadeIn'>{ errors.message }</span> : null
                    }
                </div>
                {/* <span className='sm-form-item-suffix'>姓名解释</span> */}
            </div>
        )
    }
}


Form.Item = Item;


export default Form;



