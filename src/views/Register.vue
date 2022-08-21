<template>
    <div class="register">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">後台管理系統</span>
                <el-form
                    ref="ruleFormRef"
                    :model="registerUser"
                    :rules="rules"
                    class="registerForm"
                    label-width="120px"
                >
                    <el-form-item label="用戶名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="請輸入用戶名"></el-input>
                    </el-form-item>
                    <el-form-item label="電子郵件信箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="請輸入電子郵件信箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼" prop="password">
                        <el-input v-model="registerUser.password" placeholder="請輸入密碼" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="確認密碼" prop="password2">
                        <el-input v-model="registerUser.password2" placeholder="請確認密碼" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="選擇登入身份">
                        <el-select v-model="registerUser.identity" placeholder="選擇身份">
                            <el-option label="管理員" value="manager"></el-option>
                            <el-option label="員工" value="employee"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <div class="register-btn">
                            <el-button @click="submitForm(ruleFormRef)" class="submit-btn">註冊</el-button>
                            <el-button @click="resetForm(ruleFormRef)" class="reset-btn">取消</el-button>
                        </div>
                    </el-form-item>
                    <div class="tiparea">
                        <p>已有帳號？ 轉跳<router-link to="/login">登入頁面</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { registerType } from '../utils/types';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerUser = ref<registerType>({
    name: 'tester',
    email: 'test@example.com',
    password: '123456',
    password2: '123456',
    identity: '管理員'
});

// 表單驗證
const ruleFormRef = ref<FormInstance>();

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('請再次輸入密碼'));
    } else if (value !== registerUser.value.password) {
        callback(new Error('兩次密碼不一致'));
    } else {
        callback();
    }
};

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '用戶名不能為空', trigger: 'change' },
        { min: 3, max: 30, message: '用戶名長度2~30字元之間', trigger: 'blur' }
    ],
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
    ],
    password2: [
        { min: 6, max: 30, message: '密碼長度6~30字元之間', trigger: 'blur' },
        { validator: validatePass2, trigger: 'blur' }
    ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const data = await axios.post('api/users/register', registerUser.value);
            console.log('data', data);

            if (data.status === 200) {
                ElMessage({
                    message: '註冊成功',
                    type: 'success'
                });
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }

            // router.push('/');
        } else {
            ElMessage.error('註冊失敗！');
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style scoped></style>
