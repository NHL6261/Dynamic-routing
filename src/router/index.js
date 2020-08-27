import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 解决 重复点击报错问题
const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalReplace.call(this, location)
};

//  公共路由
const commonRoute = [

    {
        path: '/login',
        component: (resolve) => require(['@/views/login/idnex.vue'], resolve),
        meta: {
            title: '登 录'
        }
    },

]

// dynamic_routing 公共路由
const dynmicRoute = []
const router = new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: commonRoute
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()

    // to 将要访问的路径,from从哪个路径跳转而来,next 是一个函数表示放行 可以强制绑定跳转地址
    if (to.path === '/register') return next();

    if (to.path === '/login') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')

    if (!tokenStr) return next('/login')
        // 如果有就直接放行
    next()
});
export default router;