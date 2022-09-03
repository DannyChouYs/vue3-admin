<template>
    <div class="home">
        <Navbar />
        <Sidebar />
        <div class="container-right">
            <!-- 主要畫面渲染 -->
            <router-view></router-view>
        </div>
    </div>
    <el-button @click="logout">登出</el-button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from '../utils/http';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';

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

<style scoped>
.home {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.container-right {
    position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: auto;
}
</style>
