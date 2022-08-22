<template>
    <div>初始化頁面</div>
    <el-button @click="logout">登出</el-button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from '../utils/http';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
    try {
        const data = await axios.get('/api/users/current');
        console.log('data', data);
    } catch (error) {
        console.log(error);
    }
});

function logout() {
    localStorage.clear();
    router.push('/login');
}
</script>

<style></style>
