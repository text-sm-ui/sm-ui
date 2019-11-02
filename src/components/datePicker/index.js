/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-21 11:09:47
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-26 12:07:05
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

import './index.less';

export default class DatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            row: 5,
            col: 7,
            yy: '',
            mm: '',
            dd: '',
            week: '',
            days: [],
            current_month_array: [],
            pre_month_array: [],
            next_month_array: [],
            choosed: '', // 当前点击的时间
            chooseType: 0, // 选择类型 2 年 1 月 0 天
            year_arr: [],

            chooseDay: '', // 选择的具体时间

            animation: false, // 动画
            hidden: true, // 初始隐藏日期列表,

            direction: '',
            top: 0

        }
    }

    componentDidMount() {
        let date = new Date();
        let yy = date.getFullYear();
        let mm = date.getMonth();
        let dd = date.getDate();
        this.init(yy, mm, dd);
    }

    init = (yy, mm, dd) => {
        let week = new Date(yy, mm, '01');
        let days = this.getCountDays(yy, mm + 1);
        let preDays = this.getCountDays(yy, mm);

        let pre_arr = [];
        for(let i = 0; i < week.getDay(); i++) {
            pre_arr.push({
                class: 0,
                dd: preDays - i
            })
        }
        pre_arr.sort((a, b) => {
            return a.dd - b.dd
        });

        let _arr = []
        for(let i = 1; i < days + 1; i++){
            _arr.push({
                class: 1,
                dd: i
            })
        }

        let next_arr = []
        let c = 42 - _arr.length - pre_arr.length
        for (let i = 1; i < c + 1; i++) {
            next_arr.push({
                class: 2,
                dd: i
            })
        }

        this.setState({
            yy: yy,
            mm: mm,
            dd: dd,
            week: week.getDay(),
            current_month_array: _arr,
            pre_month_array: pre_arr,
            days: pre_arr.concat(_arr, next_arr),
            next_month_array: next_arr
        })
    }

    getCountDays = (yy, mm) => {
        let days = new Date(yy, mm, 0).getDate()
        return days
    }

    handleNextMonth = () => {
        let { yy, mm, dd } = this.state;
        if (mm === 11) {
            this.init(yy + 1, 0, dd)
        } else {
            this.init(yy, mm + 1, dd)
        }
    }

    handlePreMonth = () => {
        let { yy, mm, dd } = this.state;
        if (mm === 0) {
            this.init(yy - 1, 11, dd)
        } else {
            this.init(yy, mm - 1, dd)
        }
    }

    handleNextYear = () => {
        let { yy, mm, dd, chooseType } = this.state;
        if (chooseType === 0) {
            this.init(yy + 1, mm, dd)
        } else if (chooseType === 2) {
            this.setState({
                yy: yy + 10
            }, () => {
                this.handleChooseYear()
            })
        }
    }

    handlePreYear = () => {
        let { yy, mm, dd, chooseType } = this.state;
        if (chooseType === 0) {
            this.init(yy - 1, mm, dd)
        } else if (chooseType === 2) {
            this.setState({
                yy: yy - 10
            }, () => {
                this.handleChooseYear()
            })
        }
    }

    handleCurrent = (v) => {
        let { yy, mm } = this.state;
        this.setState({
            days: this.state.days.map(c => v.dd === c.dd && c.class === v.class ? {...c, choose: true} : {...c, choose: false}),
            choosed: Object.assign(v, {yy: yy, mm: mm}),
            chooseDay: v.yy + '-' + v.mm + '-' + v.dd
        });
    }

    handleChange = (e) => {
        this.setState({
            chooseDay: e.target.value
        })
    }

    prefixInteger = (dd, n) => {
        return (Array(n).join(0) + dd).slice(-n);
    }

    // 跳转选择年
    handleChooseYear = () => {
        const { yy } = this.state;
        let parseIntNum = parseInt(yy / 10);
        let _arr = [];
        for (let i = 0; i < 10; i++) {
            _arr.push((parseIntNum * 10) + i)
        }
        this.setState({
            year_arr: _arr,
            chooseType: 2
        })
    }

    // 选择具体的年
    hanldeChooseDetailYear = (v) => {
        this.setState({
            yy: v,
            chooseType: 0
        }, () => {
            let { yy, mm, dd } = this.state;
            this.init(yy, mm, dd)
        })
    }

    // 选择月份
    handleChooseMonth = () => {
        this.setState({
            chooseType: 1
        })
    }
    hanldeChooseDetailMonth = (v) => {
        this.setState({
            mm: v.value,
            chooseType: 0
        }, () => {
            let { yy, mm, dd } = this.state;
            this.init(yy, mm, dd)
        })
    }

    handleYYorMMorDay = () => {
        const { mm, days, dd, choosed, chooseType, yy, year_arr } = this.state;
        let date = new Date();
        let current_mm = date.getMonth();
        let current_yy = date.getFullYear();
        if ( chooseType === 0) {
            return (
                <div>
                    <div className='sm-datePicker-cells'>
                        {
                            week.map((v, i) => {
                                return <span key={i}>{ v }</span>
                            })
                        }
                    </div>
                    <div className='sm-datePicker-cells'>
                        {
                            days.map((v, i) => {
                                return <span key={i} onClick={() => this.handleCurrent(v) }
                                    className={['sm-datePicker-detail',
                                    dd === v.dd && current_mm === mm  && current_yy === yy ? 'sm-datePicker-current' : null,
                                    v.choose || (v.class === choosed.class && v.dd === choosed.dd && current_mm === mm) ? 'sm-datePicker-choosed' : null].join(' ')}
                                    style={v.class === 1 ? {color: '#515a6e'}: null}>{ v.dd }</span>
                            })
                        }
                    </div>
                </div>
            )
        } else if (chooseType === 2) {
            return (
                <div>
                    <div className='sm-datePicker-cells sm-choose-yy'>
                        {
                            year_arr.map((v, i) => {
                                return <span className='sm-datePicker-yy' onClick={() => this.hanldeChooseDetailYear(v)}
                                    style={ current_yy < v || current_yy === v  ? { color: '#515a6e'} : null } key={i}>{ v }</span>
                            })
                        }
                    </div>
                </div>
            )
        } else if (chooseType === 1) {
            return (
                <div>
                    <div className='sm-datePicker-cells sm-choose-yy'>
                        {
                            month_list.map((v, i) => {
                                return <span className='sm-datePicker-month' key={i}
                                onClick={() => this.hanldeChooseDetailMonth(v)}>{ v.name }</span>
                            })
                        }
                    </div>
                </div>
            )
        }
    }

    // 取消按钮
    hanldeCancel = () => {
        this.setState({
            animation: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    hidden: true
                })
            }, 700)
        })
    }
    handleSetDifference = () => {
        let domHeigh = ReactDOM.findDOMNode(this.refs.wapper).clientHeight;

        let winheight = window.innerHeight;

        let top = ReactDOM.findDOMNode(this.refs.wapper).parentElement.offsetTop;

        let difference = winheight - top;

        if ( difference > domHeigh ) {
            this.setState({
                direction: 'button',
                top: domHeigh
            })
        } else {
            this.setState({
                direction: 'top',
                top: domHeigh - 2
            });
        }
    }

    // componentDidMount() {
    //     this.handleSetDifference();
    //     window.addEventListener("resize", () => {
    //         this.handleSetDifference();
    //     });
    // }

    // 开始选择日期
    handleChooseTime = () => {
        this.setState({
            animation: true, 
            hidden: false
        },() => {
            
        })
    }

    render() {
        const { yy, mm, chooseType, animation, hidden } = this.state;
        const { placeholder } = this.props;
        return (
            <div style={{ width: 220, position: 'relative' }}>
                <input type='text' className='sm-datePicker-input sm-input'
                    value={this.state.chooseDay} onChange={this.handleChange}
                    placeholder={placeholder}
                    onClick={this.handleChooseTime}/>
                <i className='iconfont icon-riqi'></i>
                <div className={['sm-datePicker-list', animation ? 'aniMoveUpIn' : 'aniMoveUpPut'].join(' ')}
                    style={ hidden ? { display: 'none' } : null}>
                    <div className='sm-datePicker-header'>
                        <i className='iconfont icon-double-arrow-left' onClick={this.handlePreYear}></i>
                        {
                            chooseType === 0 ? <i className='iconfont icon-arrow-right' onClick={this.handlePreMonth}></i> : null
                        }
                        <p>
                            <span onClick={this.handleChooseYear}>{ yy }年</span>
                            {
                                chooseType === 2 ? null : <span onClick={ this.handleChooseMonth }>{ mm + 1 }月</span>
                            }
                        </p>
                        {
                            chooseType === 0 ? <i className='iconfont icon-arrow-right1' onClick={this.handleNextMonth}></i> : null
                        }
                        <i className='iconfont icon-double-arrow-left1' onClick={this.handleNextYear}></i>
                    </div>
                    <div className='sm-datePicker-content'>
                        {
                            this.handleYYorMMorDay()
                        }
                    </div>
                    <div className='sm-datePicker-footer'>
                        <button style={{ marginRight: 5, background: 'white', color: '#515a6e' }}
                            onClick={this.hanldeCancel}>取消</button>
                        <button onClick={this.hanldeCancel}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

const week = ['日', '一', '二', '三', '四', '五', '六']
const month_list = [
    { name: '1月',value: 0 },
    { name: '2月',value: 1 },
    { name: '3月',value: 2 },
    { name: '4月',value: 3 },
    { name: '5月',value: 4 },
    { name: '6月',value: 5 },
    { name: '7月',value: 6 },
    { name: '8月',value: 7 },
    { name: '9月',value: 8 },
    { name: '10月',value: 9 },
    { name: '11月',value: 10 },
    { name: '12月',value: 11 },
]

DatePicker.defaultProps = {
    placeholder: '请选择'
}

DatePicker.propTypes = {
    placeholder: PropTypes.string,
}