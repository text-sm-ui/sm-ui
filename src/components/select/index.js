/*
 * @Descripttion: select
 * @Author: lvjing
 * @Date: 2019-10-14 11:27:19
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-14 23:04:18
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

    nodataDom = () => {
        return <div className='sm-select-nodata slideUpIn'>暂无数据</div>
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
        const options = this.props.options;
        return (
            <div className='sm-input-wrapper' style={this.props.style}>
                <input type='text' className={['sm-input'].join(' ')}
                    onClick={() => this.setState({showList: true})}
                    placeholder={this.props.placeholder}
                    value={this.state.label}
                    readOnly
                    onChange={(e) => this.setState({label: e.target.value})}
                    />
                <i className='iconfont icon-arrow-left'></i>
                {
                    options.length > 0 ? (<div className={['sm-select-list', 'slideUpIn'].join(' ')}
                            style={this.state.showList ? {'display': 'block'} : {'display': 'none'}}>
                            <ul>
                                { options.map((v, i) => {
                                    return (
                                        <li key={i} onClick={() => this.handleOnClick(v)} 
                                        className={this.state.value === v.value ? 'sm-select-checked' : null}>{v.label}</li>
                                    )
                                }) }
                            </ul>
                        </div>)
                    : this.nodataDom()
                }
            </div>
        )
    }
}

Select.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array
}

Select.defaultProps = {
    placeholder: '请选择',
    options: []
}