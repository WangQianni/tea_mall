/*
 * @Description: 
 * @Author: wangzv
 * @Date: 2019-08-07 14:50:42
 * @LastEditors: wangzv
 * @LastEditTime: 2019-08-20 17:44:33
 */
import axios from "axios";
import qs from "qs";
import { message } from 'antd';
// react 中使用antd  此处自定义
// import { message } from "antd";
// vue中使用element-ui 此处自定义
// import { Loading} from "element-ui";

// 创建axios默认请求
axios.defaults.baseURL = "http://47.112.118.84:7001/cy/";
// axios.defaults.baseURL = "http://127.0.0.1";

// 配置超时时间
axios.defaults.timeout = 100000;
// axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'};
axios.defaults.headers = { 
    'Content-Type': 'application/json;charset=utf-8',
};

// const time = document.cookie.split('; ').find(item => {
//   let array = item.split('=');
//   if (array[0] === 'token_expires') return item
// });

// 配置请求拦截
axios.interceptors.request.use(config => {
    // if (time.substr(14) * 1000 < new Date().getTime() && time.substr(14).length) {
    //   document.cookie = `token_expires=`;
    //   document.cookie = `name=`;
    //   document.cookie = `name=`;
    //   message.error('身份验证过期，请重新登录');
    //   window.location.hash = '#/login';
    // }
    return config;
});

// 添加响应拦截器
// axios.interceptors.response.use(
//   function(response) {
//     console.log(response);
//     return response;
//   },
//   function(error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );
/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
var get = function (url, params, loading) {
    return new Promise((resolve, reject) => {
        // {
        //   params: params
        // }
        axios
            .get(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
var post = function (url, data) {
    return new Promise((resolve, reject) => {
        // qs.stringify(data)
        axios
            .post(url, data)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
export default { get, post };