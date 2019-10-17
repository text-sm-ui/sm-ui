/* eslint-disable no-sequences */
/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-16 14:42:56
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-17 22:26:55
 */


import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { SmCheckbox } from '../index'

import './index.less';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minHeight: this.props.height,
            tableWidth: 0,
            dataSource: this.props.dataSource,
            checkedAll: false
        }
    }
    handlOnclickBox = (v, i) => {
        this.setState({
            dataSource: this.state.dataSource.map((c, d) => d === i ? {...c, checked: !c.checked} : {...c})
        }, () => {
            this.props.onChange(this.state.dataSource.filter(f => f.checked), v, i, this.state.dataSource);
            this.setState({
                checkedAll: this.state.dataSource.filter(f => f.checked).length === this.props.dataSource.length
            })
        })
    }

    handleCheckAll = () => {
        this.setState({
            dataSource: this.state.dataSource.map(c => c.checked === this.state.checkedAll ? {...c, checked: !c.checked} : {...c}),
            checkedAll: !this.state.checkedAll
        }, () => {
            this.props.onChange(this.state.dataSource);
        })
    }

    hanndleSelect = (v, i, a) => {
        return this.props.rowSelect ?
            <td><SmCheckbox defaultChecked={ a ? this.state.checkedAll : v ? v.checked : false}
                className={a ? 'sm-table-all' : ''}
                disabled={!this.props.dataSource || this.props.dataSource.length === 0}
                onClick={() => a ? this.handleCheckAll() : this.handlOnclickBox(v, i)}></SmCheckbox></td>
            : null
    }

    componentDidMount() {
        let px = this.refs.table.offsetTop + 60 + 'px';
        this.setState({
            minHeight: this.props.height ? this.props.height : (this.props.auto ? 'calc(100vh - '+ px +')' : 240),
            tableWidth: this.refs.table.clientWidth
        })
        window.onresize = () => {
            this.setState({
                minHeight: this.props.height ? this.props.height : (this.props.auto ? 'calc(100vh - '+ px +')' : 240),
                tableWidth: this.refs.table.clientWidth
            })
        };
    }

    componentDidUpdate() {
        let px = this.refs.table.offsetTop + 60 + 'px';
        if (this.state.tableWidth === this.refs.table.clientWidth) return;
        this.setState({
            minHeight: this.props.height ? this.props.height : (this.props.auto ? 'calc(100vh - '+ px +')' : 240),
            tableWidth: this.refs.table.clientWidth
        })
    }

    render() {
        return (
            <div ref='table' style={this.props.auto || this.props.height ? { minHeight: this.state.minHeight } : { minHeight: 240}} 
                className='sm-table-wapper'>
                <table className='sm-table' style={ this.props.style, { width: this.state.tableWidth }}>
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
                            this.props.dataSource && this.props.dataSource.length !== 0 ? this.state.dataSource.map((v, i) => {
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
                            }) : null
                        }
                    </tbody>
                </table>
                { !this.props.dataSource || this.props.dataSource.length === 0 ? <div className='sm-table-nodata'>{ this.props.noDataText }</div> : null }
            </div>
        )
    }
}


class Column extends Component{
    handleChild = () => {
        if (this.props.isTitle) {
            return <td style={{ width: this.props.width }}>{ this.props.title }</td>
        } else {
            if (this.props.render) {
                return <td style={{ width: this.props.width }}>{ this.props.render(this.props.dataSource, this.props.index) }</td>
            }
            return <td style={{ width: this.props.width }}>{ this.props.dataSource[this.props.dataIndex] }</td>
        }
    }
    render() {
        return this.handleChild()
    }
}


Table.Column = Column;


Table.propTypes = {
    data: PropTypes.array,
    auto: PropTypes.oneOf([true, false]),
    height: PropTypes.number,
    noDataText: PropTypes.string,
    rowSelect: PropTypes.oneOf([true, false]),
    width: PropTypes.oneOf([PropTypes.string, PropTypes.number])
}

Table.defaultProps = {
    data: [],
    auto: false,
    noDataText: '暂无数据',
    rowSelect: false
}