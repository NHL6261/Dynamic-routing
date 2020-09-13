import Vue from 'vue';
import VueRouter from 'vue-router';
import { resolve } from 'path';
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 引入布局组件
import Layout from '@/views/Layout'

Vue.use(VueRouter);
//  公共路由
const commonRoute = [

    {
        path: "/",
        redirect: "/login",
        hidden: true,
        meta: {
            name: "主页"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: (resolve) => require(['@/views/login/idnex.vue'], resolve),
        hidden: true,
        meta: {
            name: '登录'
        }
    },
    {
        path: "/console",
        redirect: '/index',
        name: "Console",
        component: Layout,
        meta: {
            name: '控制台',
            icon: 'console'
        },
        children: [

            {
                path: "/index",
                name: "Index",
                component: resolve => (require(["@/views/console/index.vue"], resolve)),
                meta: {
                    name: '主页'
                }
            },
        ]
    },
    {
        path: "/info",
        name: "Info",
        component: Layout,
        meta: {
            name: '信息管理',
            icon: 'info'
        },
        children: [

            {
                path: "/infoIndex",
                name: "infoIndex",
                component: resolve => (require(["@/views/info/index.vue"], resolve)),
                meta: {
                    name: '信息列表'
                }
            },
            {
                path: "/indexCategory",
                name: "IndexCategory",
                component: resolve => (require(["@/views/info/category.vue"], resolve)),
                meta: {
                    name: '信息分类'
                }
            },
        ]
    },

    /*
     * 用户管理
     */
    {
        path: "/user",
        name: "User",
        component: Layout,
        meta: {
            name: '用户管理',
            icon: 'user'
        },
        children: [

            {
                path: "/userIndex",
                name: "userIndex",
                component: resolve => (require(["@/views/user/index.vue"], resolve)),
                meta: {
                    name: '用户列表'
                }
            }
        ]
    },

]

// dynamic_routing 公共路由
const dynmicRoute = []
const router = new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: commonRoute
});

// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     // if (to.meta.title) {
//     //     document.title = to.meta.title
//     // }
//     // next()

//     // to 将要访问的路径,from从哪个路径跳转而来,next 是一个函数表示放行 可以强制绑定跳转地址

//     // 获取token
//     const tokenStr = window.sessionStorage.getItem('token')

//     if (!tokenStr || "") return next('/login')
//     next()
// });
export default router;