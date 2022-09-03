<template>
    <el-dialog v-model="show" title="添加收支訊息" :before-close="emitHandleClose">
        <span>This is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button>取消</el-button>
                <el-button type="primary">確定</el-button>
            </span>
        </template>
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
</script>

<style scoped></style>
