/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-13 09:04:11
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-16 17:21:59
 */
import React from 'react';

import { SmTable } from './components';

const { Column } = SmTable

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            defaultChecked: true,
            defaultSelect: '2',
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

    handleCheckChange = (val) => {
        console.log(val);
        this.setState({
            defaultChecked: !this.state.defaultChecked
        })
    }

    render() {
        return (
            <div style={{ marginLeft: '30px' }}>
                {/* <SmButton type='danger' onClick={this.hangleClick} style={{ marginBottom: 10, marginRight: 20 }}>按钮</SmButton>
                <br/>
                <SmInput style={{ width: '180px' }}
                    type='text'
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                    placeholder='请输入文字'
                    omit
                    allowClear></SmInput>
                <br/> */}
                {/* <br/>
                <SmSelect style={{ width: 180 }}
                    onChange={this.hangleSelectChange}
                    options={this.state.options}
                    defaultValue={4}
                    showSearch>
                </SmSelect>
                <br/> */}
                <br/>
                {/* <SmCheckbox.Group onChange={this.handleCheckChange}
                    >
                    <SmCheckbox value={1}
                        >
                        <span style={{ marginLeft: 12 }}>苹果</span>
                    </SmCheckbox>
                    <SmCheckbox value={2}
                        style={{margin: '0 20px'}}
                        >
                        <span style={{ marginLeft: 12 }}>橘子</span>
                    </SmCheckbox>
                    <SmCheckbox value={3}
                        >
                        <span style={{ marginLeft: 12 }}>樱桃</span>
                    </SmCheckbox>
                </SmCheckbox.Group>
                <SmCheckbox defaultChecked={this.state.defaultChecked}
                    onClick={this.handleCheckChange}>
                        <span style={{ marginLeft: 12 }}>默认选择</span>
                </SmCheckbox> */}
                <br/>
                <div>
                    {/* <SmRadio.Group
                        onChange={this.handleCheckChange}
                        defaultSelect={this.state.defaultSelect}
                    >
                        <SmRadio value={1}><span style={{ padding: '0 10px' }}>苹果</span></SmRadio>
                        <SmRadio value={'2'} style={{ margin: '0 20px' }}><span style={{ padding: '0 10px' }}>橘子</span></SmRadio>
                        <SmRadio value={3} disabled><span style={{ padding: '0 10px' }}>樱桃</span></SmRadio>
                    </SmRadio.Group> */}
                    {/* <SmRadio onClick={this.handleCheckChange} defaultChecked={this.state.defaultChecked}><span style={{ padding: '0 10px' }}>樱桃</span></SmRadio> */}
                </div>
                <SmTable dataSource={dataSource}>
                    <Column title='姓名' dataIndex='name' render={(row, index) => {
                        console.log(row, index)
                        return (
                            <span>{ row.name }</span>
                        )
                    }}>
                    </Column>
                    <Column title='年龄' dataIndex='age'></Column>
                    <Column title='地址' dataIndex='address'></Column>
                </SmTable>
            </div>
        )
    }
}

const dataSource = [
    {
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园9999号',
    },
];


