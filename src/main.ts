import { createApp } from 'vue'
import App from '@/App.vue'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import router from '@/router/index'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import './styles/style.less'
let app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(Antd)
app.component('svg-icon', SvgIcon)
app.mount('#app')