/*
 * @Descripttion: select
 * @Author: lvjing
 * @Date: 2019-10-14 11:27:19
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-15 11:02:09
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            showListData: this.props.options,
            label: '',
            value: this.props.defaultValue ? this.props.defaultValue : '',
            count: 0

        }
    }

    handleOnClick = (v) => {
        this.setState({
            label: v.label,
            value: v.value,
            showList: false,
            showListData: this.props.options
        }, () => {
            this.props.onChange(v)
        })
    }

    handleInputOnClick = () => {
        this.setState({showList: true})
    }

    handleInputOnChange = (e) => {
        if (!this.props.showSearch) {
            this.setState({
                label: e.target.value
            });
        } else {
            let showListData = this.props.options.filter(v => v.label.indexOf(e.target.value) !== -1);
            this.setState({
                label: e.target.value,
                showListData: showListData
            });
        }
    }


    handleBlur = () => {
        setTimeout(() => {
            let filterLabel = this.props.options.filter(v => v.value === this.state.value)[0];
            let label = filterLabel ? filterLabel.label : ''
            this.setState({
                showList: false,
                label: label,
                showListData: this.props.options,
            });
        }, 200);
    }

    haveDataDom = () => {
        if (!this.state.showList) return;
        return (
            <div className={['sm-select-list', 'slideUpIn'].join(' ')}
                style={this.state.showList ? {'display': 'block'} : {'display': 'none'}}>
                <ul>
                    { this.state.showListData.map((v, i) => {
                        return (
                            <li key={i} onClick={() => this.handleOnClick(v)}
                            className={this.state.value === v.value ? 'sm-select-checked' : null}>{v.label}</li>
                        )
                    }) }
                </ul>
            </div>
        )
    }

    nodataDom = () => {
        if (!this.state.showList) return;
        return <div className='sm-select-nodata slideUpIn'>
            <p>暂无数据</p>
        </div>
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.defaultValue === prevState.value) && !prevState.label && !prevState.count) {
            const filterLabel = nextProps.options.filter(v => v.value === prevState.value)[0];
            const label = filterLabel ? filterLabel.label : ''
            return {
                label: label,
                count: 1
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
                    readOnly={!this.props.showSearch}
                    onChange={this.handleInputOnChange}
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
    showSearch: PropTypes.oneOf([true, false]),
    onChange: PropTypes.func
}

Select.defaultProps = {
    placeholder: '请选择',
    showSearch: false,
    options: []
}