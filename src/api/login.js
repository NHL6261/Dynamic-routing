/*
 * login页面所有的请求方式
 */
import ajax from '@/utils/require'

/*
 *登录login 所有 api
 */

export default {
    // 获取验证码
    GetSms(data) {
        return ajax.request({
            method: "post",
            url: "/getSms/",
            data
        })
    },
    // 注册
    RegiSter(data) {
        return ajax.request({
            method: "post",
            url: "/register/",
            data
        })
    },
    // 登录
    Login(data) {
        return ajax.request({
            method: "post",
            url: "/login/",
            data
        })
    }
}