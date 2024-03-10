import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
// main.js，注意要在use方法之后执行
import uviewPlus from 'uview-plus'

export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus)
	// 如此配置即可
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = `https://ljguo.com/api`; /* 根域名 */
		config.unit = 'rpx';
		return config
	})
	return {
		app,
	};
}
// #endif