/*
 * @Descripttion: select
 * @Author: lvjing
 * @Date: 2019-10-14 11:27:19
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-15 09:30:27
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            label: '',
            value: this.props.defaultValue ? this.props.defaultValue : ''
        }
    }

    handleOnClick = (v) => {
        this.setState({
            label: v.label,
            value: v.value,
            showList: false
        }, () => {
            this.props.onChange(v)
        })
    }

    handleInputOnClick = () => {
        this.setState({showList: true})
    }

    haveDataDom = () => {
        if (!this.state.showList) return;
        return (
            <div className={['sm-select-list', 'slideUpIn'].join(' ')}
                style={this.state.showList ? {'display': 'block'} : {'display': 'none'}}>
                <ul>
                    { this.props.options.map((v, i) => {
                        return (
                            <li key={i} onClick={() => this.handleOnClick(v)}
                            className={this.state.value === v.value ? 'sm-select-checked' : null}>{v.label}</li>
                        )
                    }) }
                </ul>
            </div>
        )
    }

    handleBlur = () => {
        setTimeout(() => {
            this.setState({showList: false})
        }, 200);
    }

    nodataDom = () => {
        if (!this.state.showList) return;
        return <div className='sm-select-nodata slideUpIn'>
            <p>暂无数据</p>
        </div>
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.defaultValue === prevState.value) && !prevState.label) {
            const filterLabel = nextProps.options.filter(v => v.value === prevState.value)[0];
            const label = filterLabel ? filterLabel.label : ''
            return {
                label: label
            }
        }
        return null;
    }

    render() {
        return (
            <div className='sm-input-wrapper' style={this.props.style}>
                <input type='text' className={['sm-input'].join(' ')}
                    onClick={this.handleInputOnClick}
                    onBlur={this.handleBlur}
                    placeholder={this.props.placeholder}
                    value={this.state.label}
                    readOnly
                    onChange={(e) => this.setState({label: e.target.value})}
                    />
                <i className='iconfont icon-arrow-left'></i>
                {
                    this.props.options.length > 0 ? this.haveDataDom() : this.nodataDom()
                }
            </div>
        )
    }
}

Select.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func
}

Select.defaultProps = {
    placeholder: '请选择',
    options: []
}