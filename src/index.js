/*
 * @Descripttion: 
 * @Author: lvjing
 * @Date: 2019-10-12 20:11:46
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-12 20:11:46
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
