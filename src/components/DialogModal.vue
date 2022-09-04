<template>
    <el-dialog v-model="show" title="添加收支訊息" :before-close="emitHandleClose">
        <el-form :model="formData" ref="form" label-width="120px" style="margin: 10px">
            <el-form-item label="收支類型">
                <el-select v-model="formData.type" placeholder="收支类型">
                    <el-option
                        v-for="(formType, index) in typeList"
                        :key="index"
                        :label="formType"
                        :value="formType"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="describe" label="收支描述">
                <el-input v-model="formData.describe"></el-input>
            </el-form-item>
            <el-form-item prop="income" label="收入">
                <el-input v-model="formData.income"></el-input>
            </el-form-item>
            <el-form-item prop="expend" label="支出">
                <el-input v-model="formData.expend"></el-input>
            </el-form-item>
            <el-form-item prop="cash" label="帳戶現金">
                <el-input v-model="formData.cash"></el-input>
            </el-form-item>
            <el-form-item label="備註">
                <el-input v-model="formData.remark"></el-input>
            </el-form-item>
            <el-form-item class="text-right">
                <el-button>取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 注意！不需要使用props.show額外賦值另一個變數，當父元件更新數值，子元件不會跟著變動
const props = defineProps<{
    show: boolean;
}>();

/**
 * ! 這樣的寫法，會導致父元件更新數值的時候，子元件不會跟著變動，除非只需要一次性接收父元件數值
 */
// const show = props.show

// 使用computed監聽傳過來的數值，return props.show給show
const show = computed(() => props.show);

// ts寫法，定義emits事件，名稱為closeDialog，傳遞數值類型為boolean
const emits = defineEmits<{
    // event名稱, 要攜帶的數值名稱與類型
    (e: 'closeDialog', value: boolean): void;
}>();

const emitHandleClose = () => {
    // 傳送事件名稱為closeDialog，並且攜帶數值出去為false
    emits('closeDialog', false);
};

const typeList = ref(['現金', '微信', '支付寶']);
const form = ref({});
const formData = ref({
    type: '現金',
    describe: '購買課程',
    income: '1580',
    expend: '158',
    cash: '2000',
    remark: '提升技能'
});

const handleSubmit = () => {
    console.log(formData.value);
};
</script>

<style scoped></style>
