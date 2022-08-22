<template>
    <div class="login">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">後台管理系統</span>
                <el-form ref="ruleFormRef" :model="loginUser" :rules="rules" class="loginForm" label-width="120px">
                    <el-form-item label="電子郵件信箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="請輸入電子郵件信箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼" prop="password">
                        <el-input v-model="loginUser.password" placeholder="請輸入密碼" type="password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="register-btn">
                            <el-button @click="submitForm(ruleFormRef)" class="submit-btn">登入</el-button>
                            <el-button @click="resetForm(ruleFormRef)" class="reset-btn">取消</el-button>
                        </div>
                    </el-form-item>
                    <div class="tiparea">
                        <p>還沒有帳號？ 現在<router-link to="/register">註冊</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { loginType } from '../utils/types';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import axios from '../utils/http';
import { useRouter } from 'vue-router';
import jwt_decode from 'jwt-decode';
import { useAuthStore } from '../store';

const router = useRouter();
const store = useAuthStore();

const loginUser = ref<loginType>({
    email: 'test@example.com',
    password: '123456'
});

// 表單驗證
const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
    email: [
        {
            required: true,
            type: 'email',
            message: '電子郵件格式錯誤',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密碼不能為空',
            trigger: 'blur'
        },
        { min: 6, max: 30, message: '密碼長度6~30字元之間', trigger: 'blur' }
    ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const data = await axios.post('api/users/login', loginUser.value);
            // 解構賦值的寫法{ success, token }
            const { success, token } = data.data;
            // const token = data.data.token;

            if (success && token) {
                localStorage.setItem('token', token);
                // 解析token
                const decode = jwt_decode(token);
                console.log('decode', decode);

                // 存入全局狀態
                store.setAuth(!!decode);
                store.setUser(decode);

                ElMessage({
                    message: '登入成功',
                    type: 'success'
                });
                router.push('/');
            }
        } else {
            ElMessage.error('登入失敗！');
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style scoped></style>
