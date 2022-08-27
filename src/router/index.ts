import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '',
                component: () => import('../views/Index.vue')
            },
            {
                path: '/userinfo',
                component: () => import('../views/Userinfo.vue')
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 路由守衛
router.beforeEach((to, from, next) => {
    // 確認瀏覽器本地端是否有token
    const isLogin: boolean = localStorage.token ? true : false;
    // 登入、註冊頁面不需要token都可以進入
    if (to.path === '/login' || to.path === '/register') {
        next();
    } else {
        isLogin ? next() : next('/login');
    }
});

export default router;
