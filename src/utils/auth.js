// 获取token

export function getToken() {
    let token = sessionStorage.getItem('token')
    return token
}