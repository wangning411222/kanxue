/**
 * 首页api
 */
import {http} from '../../service/request/index.js' //请求拦截
import util from '../../common/util.js'
/**
 * 检测登录状态 只是通过请求触发过滤器，用以判断是否登录 否则跳转到登录
 * @returns {Promise}
 */

export function getisLogin(){
    let datas = {}
	let e = uni.getStorageSync('setUserData');
	if(e == '') {
		return false;
	} 
		return true;
}

/**
 * 密码登录
 * @returns {Promise}
 */
export function getLogin(datas, loginflag){
	
	//datas = util.toQueryString(datas);
	let e = '';
	loginflag = loginflag || 1;
	if(loginflag == 1) {
		e = http.post("ucenter/app-login_password.htm",datas);
	} else if(loginflag == 2) {
		e = http.post("ucenter/app-login_mobile.htm",datas);
	} else if(loginflag == 3) {
		e = http.post("ucenter/app-login_wx2.htm", datas);
	}
    return e;
}
/**
 * 获取验证码
 * @returns {Promise}
 */
export function getVerCode(datas){
	
	//datas = util.toQueryString(datas);
	let e = http.post("ucenter/app-get_verifycode.htm",datas);

    return e;
}
/**
 * 滑块验证码
 * @@returns {promise}
 * 
 */

export function getHkCode(datas){
	let e = http.post("ucenter/app-get_hkcode.htm",datas);
	
	return e;
}

/**
 * 获取sid
 * @@returns {promise}
 * 
 */
export function getAppSid(){
	let e = http.post("ucenter/app-app_sid.htm");
	return e;
}
