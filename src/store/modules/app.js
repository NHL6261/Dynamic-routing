import Vue from 'vue'
import Login from '@/api/login'
import { setToken, setUserName, getUserName, removeToken, removeUserName } from '@/utils/app'
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    token: '',
    // getToken() ||
    username: getUserName() || '',
}
const mutations = {
    CHANGE_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state, value) {
        state.token = value
    },
    SET_USERNAME(state, value) {
        state.username = value
    },
}
const actions = {
    ObtainLoginDataActions({ commit }, loginData) {
        return new Promise((resolve, reject) => {
            Login.Login(loginData).then((response) => {
                if (response.data.resCode !== 0) {
                    return false
                } else {
                    commit('SET_TOKEN', response.data.data.token)
                    commit('SET_USERNAME', response.data.data.username)
                    setToken(response.data.data.token)
                    setUserName(response.data.data.username)
                    resolve(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 退出
    Exit({ commit }) {
        return new Promise((resolve) => {
            this.$confirm = Vue.prototype.$confirm
            this.$confirm('此操作将退出该系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeToken()
                removeUserName()
                commit('SET_TOKEN', '')
                commit('SET_USERNAME', '')
                resolve()
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
            })
        })
    }
}
export default {
    state,
    actions,
    mutations
}