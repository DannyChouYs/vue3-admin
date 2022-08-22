import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    // 建立變數
    state: () => {
        return { isAuthenticated: false, user: {} };
    },
    // 讀取變數
    getters: {
        getAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user
    },
    // 修改變數
    actions: {
        setAuth(isAuth: boolean) {
            if (isAuth) {
                this.isAuthenticated = isAuth;
            } else {
                this.isAuthenticated = false;
            }
        },
        setUser(user: any) {
            if (user) {
                this.user = user;
            } else {
                this.user = {};
            }
        }
    }
});
