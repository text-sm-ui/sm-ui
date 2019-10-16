/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-16 14:42:56
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-16 18:45:45
 */


import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { SmCheckbox } from '../index'

import './index.less';
import { tsThisType } from '@babel/types';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
            checkedAll: false
        }
    }
    handlOnclickBox = (v, i) => {
        this.setState({
            dataSource: this.state.dataSource.map((c, d) => d === i ? {...c, checked: !c.checked} : {...c})
        }, () => {
            this.props.onChange(this.state.dataSource.filter(f => f.checked), v, i, this.state.dataSource)
        })
    }

    handleCheckAll = () => {
        this.setState({
            dataSource: this.state.dataSource.map(c => c.checked === this.state.checkedAll ? {...c, checked: !c.checked} : {...c}),
            checkedAll: !this.state.checkedAll
        })
    }

    hanndleSelect = (v, i, a) => {
        return this.props.rowSelect ?
            <td><SmCheckbox defaultChecked={ a ? this.state.checkedAll : v ? v.checked : false}
                onClick={() => a ? this.handleCheckAll() : this.handlOnclickBox(v, i)}></SmCheckbox></td>
            : null
    }

    render() {
        return (
            <table className='sm-table'>
                <thead>
                    <tr>
                        {
                            this.hanndleSelect('', '', 'a')
                        }
                        {
                            React.Children.map(this.props.children, child => {
                                return React.cloneElement(child, {
                                    dataSource: this.state.dataSource,
                                    isTitle: true
                                })
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.dataSource.map((v, i) => {
                            return <tr key={i}>
                                {
                                    this.hanndleSelect(v, i)
                                }
                                {
                                    React.Children.map(this.props.children, child => {
                                        return React.cloneElement(child, {
                                            dataSource: v,
                                            index: i,
                                            isTitle: false
                                        })
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        )
    }
}


class Column extends Component{
    handleChild = () => {
        if (this.props.isTitle) {
            return <td>{ this.props.title }</td>
        } else {
            if (this.props.render) {
                return <td>{ this.props.render(this.props.dataSource, this.props.index) }</td>
            }
            return <td>{ this.props.dataSource[this.props.dataIndex] }</td>
        }
    }
    render() {
        return this.handleChild()
    }
}


Table.Column = Column;


Table.propTypes = {
    data: PropTypes.array
}

Table.defaultProps = {
    data: []
}