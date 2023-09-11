import http from '@/service/request/index.js' //请求拦截
import util from '@/common/util.js'
const state = {
}
const getters = {
}
const actions = {
    getLogin({state}, datas, loginflag = 1) {
        return new Promise((resolve, reject) => {
			loginflag = loginflag || 1;
			if(loginflag == 1) {
				http.post("ucenter/app-login_password.htm",datas).then(function (res) {
					res = res.data
					resolve(res)
				});
			} else if(loginflag == 2) {
				http.post("ucenter/app-login_mobile.htm",datas).then(function (res) {
					res = res.data
					resolve(res)
				});
			} else if(loinflag == 3) {
				//微信登录
				http.post("ucenter/app-login_wx2.htm", datas).then(function (res) {
					res = res.data
					resolve(res)
				});
			}
			
        })
    },

	getHkCode({state}, datas) {
		return new Promise((resolve, reject) => {
			http.post("ucenter/app-get_hkcode.htm",datas).then(res=>{
				res = res.data;
				resolve(res);
			}).catch(err=>{
				resolve(false);
			});
			
		})
	}
	

}
const mutations = {
}
export default {
  state,
  getters,
  actions,
  mutations
}