/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-13 09:04:11
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-14 12:36:35
 */
import React from 'react';

import { SmButton, SmInput, SmSelect } from './components';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1
        }
    }
    hangleClick = () => {
        console.log('点击事件')
    }

    handleChange = (val) => {
        console.log(val);
    }

    render() {
        return (
            <div style={{ marginLeft: '30px' }}>
                <SmButton type='danger' onClick={this.hangleClick} style={{ marginBottom: 10, marginRight: 20 }}>按钮</SmButton>
                <SmInput style={{ width: '180px' }}
                    type='password'
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                    placeholder='请输入文字'
                    omit
                    allowClear></SmInput>

                <SmSelect></SmSelect>
            </div>
        )
    }
}


