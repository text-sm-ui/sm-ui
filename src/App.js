/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-13 09:04:11
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-14 22:57:37
 */
import React from 'react';

import { SmButton, SmInput, SmSelect } from './components';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            options: [
                {label: '第一项第一项第一项第一项第一项第一项第一项', value: 1},
                {label: '第二项', value: 2},
                {label: '第三项', value: 3},
                {label: '第四项', value: 4},
                {label: '第五项', value: 5},
            ]
        }
    }
    hangleClick = () => {
        console.log('点击事件')
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    hangleSelectChange = (val) => {
        console.log(val);
    }

    render() {
        return (
            <div style={{ marginLeft: '30px' }}>
                <SmButton type='danger' onClick={this.hangleClick} style={{ marginBottom: 10, marginRight: 20 }}>按钮</SmButton>
                <br/>
                <SmInput style={{ width: '180px' }}
                    type='password'
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                    placeholder='请输入文字'
                    omit
                    allowClear></SmInput>
                <br/>
                <br/>
                <SmSelect style={{ width: 180 }}
                    onChange={this.hangleSelectChange}
                    defaultValue={4}></SmSelect>
            </div>
        )
    }
}


