import Vue from 'vue'
import App from './App'
import md5 from './common/md5.min.js';
import {http} from './service/request/index.js' //请求拦截
import store from './store/index.js' //状态管理
// import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.prototype.$md5 = md5

Vue.prototype.$http = http

Vue.prototype.$store = store

Vue.config.productionTip = false
//Vue.component('cu-custom',cuCustom)
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
