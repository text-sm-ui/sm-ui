/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-21 11:09:47
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-21 16:29:20
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

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
        pre_arr.sort();

        let _arr = []
        for(let i = 1; i < days + 1; i++){
            _arr.push({
                class: 1,
                dd: i
            })
        }

        let next_arr = []
        let c = 35 - _arr.length - pre_arr.length
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
        let { yy, mm, dd } = this.state;
        this.init(yy + 1, mm, dd)
    }

    handlePreYear = () => {
        let { yy, mm, dd } = this.state;
        this.init(yy - 1, mm, dd)
    }

    handleCurrent = (v) => {
        let { yy, mm } = this.state;
        this.setState({
            days: this.state.days.map(c => v.dd === c.dd && c.class === v.class ? {...c, choose: true} : {...c, choose: false}),
            choosed: Object.assign(v, {yy: yy, mm: mm})
        });
    }

    prefixInteger = (dd, n) => {
        return (Array(n).join(0) + dd).slice(-n);
    }

    handleYYorMMorDay = () => {
        const { mm, days, dd, choosed, chooseType } = this.state;
        let date = new Date();
        let current_mm = date.getMonth();
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
                                    dd === v.dd && current_mm === mm ? 'sm-datePicker-current' : null,
                                    v.choose || (v.class === choosed.class && v.dd === choosed.dd && current_mm === mm) ? 'sm-datePicker-choosed' : null]. join(' ')}
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
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                        <span className='sm-datePicker-yy'>2010</span>
                    </div>
                </div>
            )
        }
    }

    render() {
        const { yy, mm } = this.state;
        return (
            <div style={{ width: 220, position: 'relative' }}>
                <input type='text' className='sm-datePicker-input sm-input'/>
                <div className='sm-datePicker-list'>
                    <div className='sm-datePicker-header'>
                        <i className='iconfont icon-double-arrow-left' onClick={this.handlePreYear}></i>
                        <i className='iconfont icon-arrow-right' onClick={this.handlePreMonth}></i>
                        <p>
                            <span onClick={() => this.setState({chooseType: 2})}>{ yy }年</span>
                            <span onClick={() => this.setState({chooseType: 1})}>{ mm + 1 }月</span>
                        </p>
                        <i className='iconfont icon-arrow-right1' onClick={this.handleNextMonth}></i>
                        <i className='iconfont icon-double-arrow-left1' onClick={this.handleNextYear}></i>
                    </div>
                    <div className='sm-datePicker-content'>
                        {
                            this.handleYYorMMorDay()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const week = ['日', '一', '二', '三', '四', '五', '六']