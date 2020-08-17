// 获取token

export function getToken() {
    let token = window.localStorage.getItem('token')
    return token
}