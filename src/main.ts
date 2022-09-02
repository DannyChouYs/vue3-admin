import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { HomeFilled, InfoFilled, Money, ArrowDown } from '@element-plus/icons-vue';

const app = createApp(App);

const icons = {
    HomeFilled,
    InfoFilled,
    Money,
    ArrowDown
};

for (const [key, value] of Object.entries(icons)) {
    app.component(key, value);
}

app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount('#app');
