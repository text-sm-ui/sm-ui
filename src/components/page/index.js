/*
 * @Descripttion: 分页组件
 * @Author: lvjing
 * @Date: 2019-10-22 17:48:46
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-23 15:05:00
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
            pageSize: this.props.pageSize,

            pageList: [],
            groupCount: 5,
            startPage: 1
        }
    }

    init = () => {
        let { groupCount, startPage } = this.state;
        let pageList = [];
        let maxSize = Math.ceil(this.state.total / this.state.pageSize);
        if (!maxSize) {
            this.setState({
                pageList: [1]
            })
        } else if (maxSize < 6 && maxSize > 1) {
            for(let i = 1; i < maxSize + 1; i++) {
                pageList.push(i)
            }
            this.setState({
                pageList: pageList
            });
        } else {
            if (this.state.startPage > 1) {
                pageList.push(1, 2, 3, '....')
            }

            for (let i = startPage; i < groupCount + startPage; i++){
                pageList.push(i);
            }
            if ((maxSize - startPage) > 6) {
                pageList.push('...', maxSize - 1, maxSize);
            } else {
                pageList.push(maxSize);
            }

            this.setState({
                pageList: pageList
            });
        }
    }



    handleNextPage = () => {
        let maxSize = Math.ceil(this.state.total / this.state.pageSize)
        if (maxSize === this.state.page) return;
        this.setState({
            page: this.state.page + 1
        }, () => {
            if ((this.state.page % this.state.groupCount) === 1) {
                if (this.state.page !== maxSize) {
                    this.setState({
                        startPage: this.state.page
                    }, () => {
                        this.init()
                    })
                }
            }
        })
    }

    handlePrePage = () => {
        if (this.state.page === 1) return;
        this.setState({
            page: this.state.page - 1
        }, () => {
            if ((this.state.page % this.state.groupCount) === 0) {
                this.setState({
                    startPage: this.state.page - this.state.groupCount + 1
                }, () => {
                    this.init()
                })
            }
        })

    }

    handlePage = (v) => {
        this.setState({
            page: v,
            startPage: Math.ceil(this.state.total / this.state.pageSize) - 5
        }, () => {
            this.init();
            this.props.onChange(this.state.page, this.state.pageSize)
        })
    }

    handleChangePageSize = (v) => {
        this.handleHidden();
        if (this.state.page * v > this.state.total) {
            this.setState({
                pageSize: v,
                page: Math.ceil(this.state.total / v) ? Math.ceil(this.state.total / v) : 1
            }, () => {
                this.init()
                this.props.onShowSizeChange(this.state.page, this.state.pageSize)
            });
        } else {
            this.setState({
                pageSize: v
            }, () => {
                this.init();
                this.props.onShowSizeChange(this.state.page, this.state.pageSize)
            });
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

    // 后五页
    handleNextFivePage = () => {
        this.setState({
            page: this.state.page + 5,
            startPage: this.state.startPage + 5
        }, () => {
            this.init();
            this.props.onChange(this.state.page, this.state.pageSize)
        })
    }

    //向前五页
    handlePreFivePage = () => {
        this.setState({
            page: this.state.page - 5,
            startPage: this.state.startPage - 5
        }, () => {
            this.init();
            this.props.onChange(this.state.page, this.state.pageSize)
        })
    }

    componentDidMount() {
        this.init();
        window.addEventListener('click', () => {
            this.handleHidden();
        })
    }

    render() {
        const { animation, hidden, total, page, pageSize, pageList } = this.state;
        const maxSize = Math.ceil(total / pageSize);
        const { pageSizeOpts } = this.props;
        return (
            <div style={{ display: 'inline-block' }}>
                <div className='sm-page'>
                    <div className='sm-page-total'>
                        共 { total } 条
                    </div>
                    <div className='sm-page-page-list'>
                        <span onClick={this.handlePrePage} className={page === 1 ? 'sm-page-page-list-disabled' : null}><i className='iconfont icon-arrow-right'></i></span>
                        {
                            pageList.map((v, i) => {
                                return (
                                    typeof(v) !== 'number' ? v === '...' ? <div className='sm-page-page-next-wapper' key={i}>
                                        <i className='sm-page-page-next'></i>
                                        <i className='iconfont icon-double-arrow-left1' title='向后五页' onClick={this.handleNextFivePage}></i>
                                    </div> : <div className='sm-page-page-next-wapper' key={i}>
                                        <i className='sm-page-page-next'></i>
                                        <i className='iconfont icon-double-arrow-left' title='向前五页' onClick={this.handlePreFivePage}></i>
                                    </div>
                                    : <span key={i} className={ page === v ? 'sm-page-page-checked' : null }
                                        onClick={() => this.handlePage(v)}>{v}</span>
                                )
                            })
                        }
                        <span onClick={this.handleNextPage}
                            className={page === maxSize ? 'sm-page-page-list-disabled' : null}><i className='iconfont icon-arrow-right1'></i></span>
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
    total: 201,
    page: 1,
    pageSize: 10,
    pageSizeOpts: [10, 20, 50, 100]
}

Page.propTypes = {
    total: PropTypes.number,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pageSizeOpts: PropTypes.array,
    onShowSizeChange: PropTypes.func,
    onChange: PropTypes.func
}
