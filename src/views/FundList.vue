<template>
    <div class="fundlist">
        <el-table :data="tableData" style="width: 100%" max-height="450" border v-if="tableData.length > 0">
            <el-table-column type="index" label="序號" align="center" width="70" />
            <el-table-column label="時間" align="center" prop="date" />
            <el-table-column label="收支類型" align="center" prop="type" />
            <el-table-column label="收支描述" align="center" prop="describe" />
            <el-table-column label="收入" align="center" prop="income" />
            <el-table-column label="支出" align="center" prop="expend" />
            <el-table-column label="現今" align="center" prop="cash" />
            <el-table-column label="備註" align="center" prop="remark" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import axios from '../utils/http';

const tableData = ref([]);

const getProfiles = async () => {
    const { data } = await axios('/api/profiles');
    tableData.value = data;
};

watchEffect(() => {
    getProfiles();
});
</script>

<style scoped></style>
