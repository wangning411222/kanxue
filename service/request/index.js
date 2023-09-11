import Vue from 'vue'
import Request from './request.js'

const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */

	config.baseUrl = '';
	let Authorization = config.Authorization || uni.getStorageSync('accessToken');
	config.header = {
        'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': Authorization
    };
	
	return config
})

export {
	http
};


