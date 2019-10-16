/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-16 14:42:56
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-16 17:20:58
 */


import React, { Component } from 'react'

import PropTypes from 'prop-types';

import './index.less';

export default class Table extends Component {
    render() {
        return (
            <table className='sm-table'>
                <thead>
                    <tr>
                        {
                            React.Children.map(this.props.children, child => {
                                return React.cloneElement(child, {
                                    dataSource: this.props.dataSource,
                                    isTitle: true
                                })
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.dataSource.map((v, i) => {
                            return <tr key={i}>
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