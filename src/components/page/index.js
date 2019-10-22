/*
 * @Descripttion: 分页组件
 * @Author: lvjing
 * @Date: 2019-10-22 17:48:46
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-22 22:04:38
 */


import React, { Component } from 'react'

import PropTypes from 'prop-types';

import './index.less';

export default class Page extends Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: true,
            animation: true,
            total: this.props.total,
            page: this.props.page,
            pageSize: this.props.pageSize
        }
    }

    handleShow = (e) => {
        e.stopPropagation();
        this.setState({hidden: false})
    }

    handleHidden = () => {
        if (!this.state.hidden) {
            this.setState({
                animation: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        hidden: true,
                        animation: true
                    })
                }, 700)
            })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            page: e.target.value
        });
    }

    handleChangePageSize = (v) => {
        this.handleHidden();
        this.setState({
            pageSize: v
        });
    }

    componentDidMount() {
        window.addEventListener('click', () => {
            this.handleHidden();
        })
    }

    render() {
        const { animation, hidden, total, page, pageSize } = this.state;
        const { pageSizeOpts } = this.props;
        return (
            <div style={{ display: 'inline-block' }}>
                <div className='sm-page'>
                    <div className='sm-page-total'>
                        共 { total } 条
                    </div>
                    <div className='sm-page-page-list'>
                        <span><i className='iconfont icon-arrow-right'></i></span>
                        <span className='sm-page-page-checked'>1</span>
                        <span>2</span>
                        <span>3</span>
                        <div className='sm-page-page-next-wapper'>
                            <i className='sm-page-page-next'></i>
                            <i className='iconfont icon-double-arrow-left1' title='向后五页'></i>
                        </div>
                        <span>10</span>
                        <span><i className='iconfont icon-arrow-right1'></i></span>
                    </div>
                    <div className={['sm-page-pageSize', !hidden ? 'sm-page-pageSize-focus' : null].join(' ')} 
                        onClick={this.handleShow} >
                        { pageSize } 条/页
                        <i className='iconfont icon-arrow-left'></i>
                        <div className={['sm-page-pageSize-list', animation ? 'aniMoveUpIn' : 'aniMoveUpOut'].join(' ')}
                            style={ !hidden ? { display: 'block' } : { display: 'none' } }>
                            <ul>
                                { 
                                    pageSizeOpts.map((v, i) => {
                                        return <li key={i} className={[ v === pageSize ? 'sm-page-pageSize-checked' : null ]}
                                                onClick={() => this.handleChangePageSize(v)}>{v} 条/页</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='sm-page-elevator'>
                        <div style={{ marginRight: 7 }}>跳至</div>
                        <input type='text' className='sm-input' value={page} onChange={this.handleInputChange}/>
                        <span style={{ marginLeft: 7 }}>页</span>
                    </div>
                </div>
            </div>
        )
    }
}

Page.defaultProps = {
    total: 100,
    page: 1,
    pageSize: 50,
    pageSizeOpts: [10, 20, 50, 100]
}

Page.propTypes = {
    total: PropTypes.number,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pageSizeOpts: PropTypes.array
}
