/*
 * @Descripttion: 高阶包裹表单 item
 * @Author: lvjing
 * @Date: 2019-11-04 10:21:56
 * @LastEditors: lvjing
 * @LastEditTime: 2019-11-04 10:57:47
 */

import React, { Component } from 'react';

function HOC (WapperFomrItem) {
    return class extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            return <WapperFomrItem {...this.props}></WapperFomrItem>
        }
    }
}

export default HOC;
