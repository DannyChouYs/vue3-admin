<template>
    <div class="fillcontain">
        <div>
            <el-form :inline="true">
                <el-form-item class="btn-right">
                    <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%" max-height="450" border v-if="tableData.length > 0">
            <el-table-column type="index" label="序號" align="center" width="70" />
            <el-table-column label="時間" align="center" prop="date">
                <template #default="scope">
                    <el-icon><Timer /></el-icon>
                    <span style="margin-left: 10px">
                        {{ scope.row.date.slice(0, 10) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="收支類型" align="center" prop="type" />
            <el-table-column label="收支描述" align="center" prop="describe" />
            <el-table-column label="收入" align="center" prop="income">
                <template #default="scope">
                    <span style="color: #00d053"> +{{ scope.row.income }} </span>
                </template>
            </el-table-column>
            <el-table-column label="支出" align="center" prop="expend">
                <template #default="scope">
                    <span style="color: #f56767"> -{{ scope.row.income }} </span>
                </template>
            </el-table-column>
            <el-table-column label="現金" align="center" prop="cash">
                <template #default="scope">
                    <span style="color: #4db3ff">
                        {{ scope.row.income }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="備註" align="center" prop="remark" />
            <el-table-column label="操作" align="center" prop="operation">
                <template #default="scope">
                    <!-- scope.$index，拿該欄的index -->
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">編輯</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                        >刪除</el-button
                    >
                </template>
            </el-table-column>
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

getProfiles();

function handleEdit(item: any) {
    console.log(item);
}

function handleDelete(index: any, item: any) {
    console.log(index, item);
}

function handleAdd() {
    console.log('test');
}
// watchEffect(() => {
//     getProfiles();
// });
</script>

<style scoped>
.fillcontain {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.btn-right {
    float: right;
}
</style>
