/*
 * @Descripttion: 
 * @Author: lvjing
 * @Date: 2019-10-12 20:33:07
 * @LastEditors: lvjing
 * @LastEditTime: 2019-10-12 20:33:07
 */
'use strict';

const output = process.env.BABEL_OUTPUT;
const modules = output == null ? false : output;

const options = {
  presets: [
    ['@babel/env', { loose: true, modules }], '@babel/react'
  ],
  plugins: [
    '@babel/proposal-object-rest-spread', ['@babel/proposal-class-properties', { loose: true }]
  ],
};

module.exports = options;
