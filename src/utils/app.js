/*
 * 获取token等一系列操作 cookie
 */
import cookie from 'cookie_js'

const adminToken = 'admin_token'
const username = 'usernameKey'

export function getToken() {
    return cookie.get(adminToken)
}

export function setToken(token) {
    cookie.set(adminToken, token)
}

export function removeToken(token) {
    return cookie.remove(adminToken)
}
export function setUserName(value) {
    return cookie.set(username, value)
}

export function getUserName() {
    return cookie.get(username)
}
export function removeUserName() {
    return cookie.remove(username)
}