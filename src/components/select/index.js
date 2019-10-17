/*
 * @Descripttion: select
 * @Author: lvjing
 * @Date: 2019-10-14 11:27:19
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-17 18:27:11
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
            count: 0,
            aniClass: false // 动画的class
        }
    }

    handleOnClick = (e, v) => {
        e.stopPropagation();
        this.setState({
            label: v.label,
            value: v.value,
            aniClass: true,
            showListData: this.props.options
        }, () => {
            setTimeout(() => {
                this.setState({
                    showList: false,
                    aniClass: false,
                })
            }, 750)
            try{
                this.props.onChange(v)
            }
            catch{
                console.error("请绑定一个onChange事件")
            }
        })
    }

    handleInputOnClick = (e) => {
        e.stopPropagation();
        if (this.props.disabled) return;
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
                showListData: showListData.length ? showListData : []
            });
        }
    }

    haveDataDom = () => {
        if (!this.state.showList) return;
        return (
            <div className={['sm-select-list', !this.state.aniClass ? 'aniShow' : 'aniHidden'].join(' ')}
                style={this.state.showList ? {'display': 'block'} : {'display': 'none'}}>
                <ul onClick={(e) => e.stopPropagation()}>
                    { this.state.showListData.map((v, i) => {
                        return (
                            <li key={i} onClick={!v.disabled ? (e) => this.handleOnClick(e, v) : null }
                            className={
                                this.state.value === v.value ? 'sm-select-checked' : null,
                                v.disabled ? 'sm-select-options-disabled' : null}>{v.label}</li>
                        )
                    }) }
                </ul>
            </div>
        )
    }

    nodataDom = () => {
        if (!this.state.showList) return;
        return <div className='sm-select-nodata slideUpIn'>
            <p><i className='iconfont icon-wushuju' style={{position: 'relative',color: 'black' }}></i><span>暂无数据</span></p>
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

    componentDidUpdate() {
        window.addEventListener("click", () => {
            let filterLabel = this.props.options.filter(v => v.value === this.state.value)[0];
            let label = filterLabel ? filterLabel.label : ''
            this.setState({
                showList: false,
                label: label,
                showListData: this.props.options,
            });
        })
    }

    render() {
        return (
            <div className={['sm-input-wrapper', this.props.disabled ? 'sm-select-disabled' : null].join(' ')} style={this.props.style}>
                <input type='text' className={['sm-input', this.props.disabled ? 'sm-select-disabled' : null].join(' ')}
                    onClick={this.handleInputOnClick}
                    placeholder={this.props.placeholder}
                    value={this.state.label}
                    readOnly={!this.props.showSearch || this.props.disabled }
                    onChange={this.handleInputOnChange}
                    />
                <i className={['iconfont icon-arrow-left', this.state.showList ? 'rotating' : ''].join(' ')}></i>
                {
                    this.state.showListData.length > 0 ? this.haveDataDom() : this.nodataDom()
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