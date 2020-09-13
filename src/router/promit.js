import router from './index'
import store from '../store/index'
import { getToken, removeToken, removeUserName } from '../utils/app'
// 声名白名单
const whitRouter = ['/login'];

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            removeToken()
            removeUserName()
            store.commit("app/SET_TOKEN", '');
            store.commit("app/SET_USERNAME", '');
            next()
        } else {
            // 获取用户角色
            // 动态分配权限
            next()
        }
        console.log('token存在')
    } else {
        if (whitRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})