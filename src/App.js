/*
 * @Descripttion:
 * @Author: lvjing
 * @Date: 2019-10-13 09:04:11
 * @LastEditors: lvjing
 * @LastEditTime: 2019-11-02 23:07:09
 */
import React from 'react';

import { SmTable, SmButton, SmSelect, SmInput, SmCheckbox, SmRadio, SmMessage, SmNotice,
    SmModal, SmDatePicker, SmPage, SmTooltip, SmDrawer, SmCascader } from './components';

const { Column } = SmTable

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            defaultChecked: true,
            defaultSelect: '2',
            options: [
                {label: '第一项', value: 1, disabled: true},
                {label: '第二项', value: 2},
                {label: '第三项', value: 3},
                {label: '第四项', value: 4}
            ],
            dataSource: [
                {
                  name: '胡彦斌',
                  age: 32,
                  address: '西湖区湖底公园1号',
                  checked: false
                },
                {
                  name: '胡彦祖',
                  age: 42,
                  address: '西湖区湖底公园9999号',
                  checked: true
                },
            ],
            visibility: false,
            visible2: false
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

    handleTableChange = (selected, v, i, data) => {
        console.log(selected, v, i, data);
        // this.setState({
        //     dataSource: data
        // })
    }

    handleRadioChange = (val) => {
        console.log(val)
    }
    handleMessage = () => {
        SmMessage.warning('成功了没');
        // SmMessage.success('成功了没')
    }
    handleNotice = () => {
        SmNotice.success("这是notice")
    }

    handleModal = () => {
        this.setState({
            visibility: !this.state.visibility
        })
    }

    handleOnShowSizeChange = (page, pageSize) => {
        console.log(page, pageSize)
    }

    handlePageOnChange = (page, pageSize) => {
        console.log(page, pageSize)
    }

    render() {
        return (
            <div style={{ margin: '30px', padding: 20}}>
                <div style={{ margin: '30px' }}>
                    <SmCascader style={{ width: 200 }} options={cascaderOptions}></SmCascader>
                    <SmButton type='danger' onClick={() => this.setState({visible2: true})}>打开抽屉</SmButton>
                <SmDrawer 
                    visible={this.state.visible2}
                    width={400}
                    closable
                    onClose={() => this.setState({visible2: false})}></SmDrawer>
                <SmTooltip content='这里据说时这里时tooltip, 这里据说时这里时tooltip'>
                    <SmButton>这里时tooltip0000</SmButton>
                </SmTooltip>
                    <SmDatePicker></SmDatePicker>
                    <br></br>

                    <SmPage onShowSizeChange={this.handleOnShowSizeChange}
                        onChange={this.handlePageOnChange}></SmPage>

                    <br></br>
                    <SmButton type='warning' disabled>danger</SmButton>
                    <SmSelect style={{ width: 200 }}
                        onChange={this.hangleSelectChange}
                        options={this.state.options}
                        // defaultValue={4}
                        showSearch
                        allowClear
                        >
                    </SmSelect>
                    <SmInput style={{ width: '180px' }}
                        type='password'
                        onChange={this.handleChange}
                        defaultValue={this.state.value}
                        placeholder='请输入文字'
                        omit
                        allowClear>
                    </SmInput>
                    <br/>
                    <SmCheckbox onChange={this.handleCheckChange}
                        defaultChecked>
                        <span style={{ marginLeft: 12 }}>默认选择</span>
                    </SmCheckbox>
                    <SmCheckbox.Group onChange={this.handleCheckChange}
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
                    </SmCheckbox>
                    <br/>
                    <SmTooltip content='这里据说时这里时tooltip, 这里据说时这里时tooltip'>
                        <SmButton>这里时tooltip0000</SmButton>
                    </SmTooltip>
                    <div>
                        <SmRadio.Group
                            onChange={this.handleRadioChange}
                            defaultChecked={'2'}
                        >
                            <SmRadio value={1}><span style={{ padding: '0 10px' }}>苹果</span></SmRadio>
                            <SmRadio value={'2'} style={{ margin: '0 20px' }}><span style={{ padding: '0 10px' }}>橘子</span></SmRadio>
                            <SmRadio value={3} disabled><span style={{ padding: '0 10px' }}>樱桃</span></SmRadio>
                        </SmRadio.Group>
                        <SmRadio onChange={this.handleCheckChange} defaultChecked={this.state.defaultChecked}><span style={{ padding: '0 10px' }}>樱桃</span></SmRadio>
                    </div>
                    <SmTable dataSource={this.state.dataSource}
                        height={300}
                        rowSelect onChange={this.handleTableChange}>
                        <Column title='姓名' dataIndex='name' render={(row, index) => {
                            return (
                                <span>{ row.name + index }</span>
                            )
                        }}
                        width={100}>
                        </Column>
                        <Column title='年龄' dataIndex='age'></Column>
                        <Column title='地址' dataIndex='address'></Column>
                        <Column title='身份证' dataIndex='address'></Column>
                        <Column title='婚姻关系' dataIndex='address'></Column>
                        <Column title='恋爱关系' dataIndex='address'></Column>
                        <Column title='是否生育' dataIndex='address'></Column>
                    </SmTable>
                </div>
                <div>
                    <SmButton type='danger' onClick={ this.handleMessage }>SmMessage</SmButton>
                    <SmButton type='primary' onClick={ this.handleNotice }>SmNotice</SmButton>
                </div>
                <div>
                    <SmButton type='primary' onClick={ this.handleModal }>SmModal</SmButton>
                </div>
                <SmModal
                    visible={this.state.visibility}
                    title={
                        <span>可以自定义标题， render</span>
                    }
                    // footer={
                    //     <span>自定义footer</span>
                    // }
                    cancelText="cancel"
                    onText='ok'
                    handleCancel={() => this.setState({visibility: false})}
                    handleOk={() => this.setState({visibility: false})}
                >
                    <p>对话框内容</p>
                    <p>对话框内容</p>
                    <p>对话框内容</p>
                </SmModal>
            </div>
        )
    }
}

const cascaderOptions = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            {
              value: 'xihu',
              label: '西湖',
            },
            {
                value: 'shizilin',
                label: '狮子林',
                children: [
                    {
                        value: 'xiaoshizi',
                        label: '小狮子',
                      },
                ]
              },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京',
          children: [
            {
              value: 'zhonghuamen',
              label: '中华门',
            },
          ],
        },
        {
            value: 'wuxi',
            label: '无锡',
            children: [
              {
                value: 'zhonghuamen',
                label: '常山区',
              },
            ],
          },
      ],
    },
  ];

