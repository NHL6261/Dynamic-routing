import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@/plugins/element.js'
import '@/css/global.css'
import '@/utils/adaptation'
import '@/utils/Time-formatting'
import "@/router/promit"
import '@/icons'
import { closeFun } from '@/utils/close'
import Api from '@/api/index'
import scss from '@/styles/main.scss'
Vue.prototype.$http = Api
Vue.config.productionTip = false;

Vue.use(scss)
Vue.use(closeFun)
Vue.use(VueCompositionApi)
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');