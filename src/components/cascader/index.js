/*
 * @Description:  联机选择
 * @Author: lvjing
 * @Date: 2019-11-02 13:21:28
 * @LastEditTime: 2019-11-04 09:19:31
 * @LastEditors: lvjing
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.less';


export default class Cascader extends Component{
    constructor(props){
        super(props)
        this.state = {
            showList: false,
            value: '',
            options: [
                this.props.options.map(v => {
                    return {
                        ...v,
                        key: 1
                    }
                })
            ],
            checked: [],
            backupChecked: [],
            backupOption: []

        }
    }

    static Prototype = {
        style: PropTypes.object,
        placeholder: PropTypes.string,
        options: PropTypes.array,
        defaultValue: PropTypes.array
    }

    static defaultProps = {
        style: {},
        placeholder: '请选择',
        options: [],
        defaultValue: ['zhejiang', 'hangzhou', 'xihu']
    }

    // 无数据
    NoData = () => {
        if (!this.state.showList) return
        return (
            <div className='sm-cascader-nodata aniShow'>
                <p><i className='iconfont icon-wushuju' style={{position: 'relative',color: 'black' }}></i><span>暂无数据</span></p>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.defaultValue.length) {
            this.handleTree(this.props.options, this.props.defaultValue, 0, () => {
                let str = ''
                this.state.checked.forEach((v) => {
                    str+=v.label + ' / '
                });
                this.setState({
                    value: str.slice(0, str.length - 2)
                });
            });
        }
        window.addEventListener('click', () => {
            if (!this.state.value) {
                this.setState({
                    showList: false,
                    checked: [],
                    options: [
                        this.props.options.map(v => {
                            return {
                                ...v,
                                key: 1
                            }
                        })
                    ]
                });
            } else {
                this.setState({
                    showList: false,
                    checked: this.state.backupChecked,
                    options: this.state.backupOption
                });
            }
        });
    }


    // 有数据
    haveData = () => {
        const { options, showList, checked } = this.state;
        const { defaultValue } = this.props;
        if (defaultValue.length) {

        }
        return (
            <div style={{ display: showList ? 'block' : 'none' }}>
                <div className='sm-cascader-list aniShow'>
                    {
                        options.map((j, k) => {
                            return (
                                <ul className='sm-cascader-menu' key={k}>
                                    {
                                        j.map((v, i) => {
                                            return (
                                                <li key={i} onClick={(e) => this.handleCheck(e, v)}
                                                className={['sm-cascader-menu-item',
                                                checked.length > k && v.value === checked[k].value  ? 'sm-cascader-menu-item-checked' : null].join(' ')}
                                                >
                                                    {v.label} {v.value}
                                                    {
                                                        v.children ? <i className='iconfont icon-arrow-right1'></i> : null
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        )
    }


    handleCheck = (e, v) => {
        e.stopPropagation();
        const _arr = this.state.options.slice(0, v.key);
        const checkedArr = v.key === 1 ? [] : this.state.checked.slice(0, v.key - 1);
        checkedArr.push(v);
        if (v.children) {
            const nextArr = v.children.map(j => {
                return {...j, key: v.key + 1}
            });
            _arr.push(nextArr);
            this.setState({
                options: _arr,
                checked: checkedArr
            });
        } else {
            this.setState({
                checked: checkedArr,
                backupChecked: checkedArr,
                backupOption: this.state.options.slice(0, v.key),
                options: this.state.options.slice(0, v.key)
            }, () => {
                let str = ''
                this.state.checked.forEach((v) => {
                    str+=v.label + ' / '
                });
                this.setState({
                    value: str.slice(0, str.length - 2),
                    showList: false
                });
            });
        }
    }

    handleOnchange = (e) => {
        e.stopPropagation();
        this.setState({
            value: e.target.value
        })
    }

    handleTree = (data, defaultValue, count, callback) => {
        data.forEach(v => {
            if (v.value === defaultValue[count]) {
                let c = this.state.checked.map(a => a);
                let o = this.state.backupOption.map(a => a);
                c.push({...v, key: count + 1});
                o.push(data.map(j => j  ? {...j, key: count + 1} : null));
                this.setState({
                    checked: c,
                    backupChecked: c,
                    backupOption: this.state.backupOption.length === defaultValue.length ? this.state.backupOption : o
                }, () => {
                    this.setState({
                        options: this.state.backupOption
                    });
                    if (v.children) {
                        this.handleTree(v.children, defaultValue, count + 1, callback)
                    }
                    callback();
                })
            }
        })
    }

    handleShow = (e) => {
        e.stopPropagation();
        this.setState({showList: true})
    }

    render() {
        const { showList, value } = this.state;
        const { options } = this.props;
        return (
            <div style={this.props.style} className='sm-cascader-wapper'>
                <input type='text' className={['sm-input', this.props.disabled ? 'sm-select-disabled' : null].join(' ')}
                    placeholder={this.props.placeholder}
                    onClick={(e) => this.handleShow(e)}
                    value={value}
                    onChange={this.handleOnchange}
                />
                <i className={['iconfont icon-arrow-left', showList ? 'rotating' : ''].join(' ')}></i>
                {
                    options.length ? this.haveData() : this.NoData()
                }
            </div>
        )
    }
}




