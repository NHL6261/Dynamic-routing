// 创建请求拦截器以及携带的请求头
import axios from 'axios'
import qs from 'querystring'
import { getToken, getUserName } from './app.js'
import { Message } from 'element-ui';
// 当前的环境 开发 && 生产
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API;
const ajax = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});

/*
 * 请求头里添加token userid 等 
 */
// 添加请求拦截器
ajax.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    config.headers['Tokey'] = getToken()
    config.headers['UserName'] = getUserName()
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
ajax.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    let data = response.data
    if (data.resCode !== 0) {
        Message.error(data.message)
        return false
    } else {
        return response
    }
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default ajax