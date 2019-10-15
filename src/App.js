/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-13 09:04:11
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-15 18:31:32
 */
import React from 'react';

import { SmButton, SmInput, SmSelect, SmCheckbox, SmRadio } from './components';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            defaultChecked: true,
            options: [
                {label: '第一项', value: 1},
                {label: '第二项', value: 2},
                {label: '第三项', value: 3},
                {label: '第四项', value: 4}
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

    handleCheckChange = () => {
        this.setState({
            defaultChecked: !this.state.defaultChecked
        })
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
                    options={this.state.options}
                    defaultValue={4}
                    showSearch>
                </SmSelect>
                <br/>
                <br/>
                <SmCheckbox defaultChecked={this.state.defaultChecked}
                    onClick={this.handleCheckChange}
                    disabled>
                    <span style={{ marginLeft: 12 }}>苹果</span>
                </SmCheckbox>
                <br/>
                <div>
                    <SmRadio></SmRadio>
                </div>
            </div>
        )
    }
}


