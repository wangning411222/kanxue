import Vue from 'vue'
import Vuex from 'vuex'
import {http} from '../service/request/index.js' //请求拦截
import util from '../common/util.js'
//modules
import bbsModule from './module/bbs/bbsModule.js' //社区
import forumModule from './module/bbs/forumModule.js' //板块
import threadModule from './module/bbs/threadModule.js' //帖子
import activityModule from './module/activity/activityModule.js' //活动
import noticeModule from './module/notice/noticeModule.js' //消息
import ucenterModule from './module/ucenter/ucenterModule.js' //个人中心
Vue.use(Vuex)
let isloginflag = !(typeof uni.getStorageSync('setUserData') == 'undefined' || uni.getStorageSync('setUserData') == '');

export default new Vuex.Store({
	//全局状态
    state: {
		config:{},
		userInfo: uni.getStorageSync('setUserData') || '',
		appSid: uni.getStorageSync('appSid') || '',
		isLogin: isloginflag,
		tabText:(isloginflag ? '我的':'未登录'),
		pm_number: 0,
		system_message_number: 0,
		pminterval: '',
		//默认版块
		plate:[] 
		
		
	},
	mutations:{
		//用户信息
		setUserData(state,userData) {
			state.userInfo = userData;
			
		},
		setAppSid(state, AppSid) {
			//验证码标识赋值
			state.appSid = AppSid;
		},
		setIsLogin(state, islogin) {
			//是否登录
			state.isLogin = islogin;
		},
		setTabText(state, text) {
			state.text = text;
			
		},
		setNoticeNum(state, {pm_number, system_message_number}) {
			state.pm_number = parseInt(pm_number);
			state.system_message_number = parseInt(system_message_number);
		},
		setPlate(state, plate) {
			state.plate = plate;
		},
		
		
	},
	actions:{
		setUserDataAsync( { commit, state, rootState } , userData) {
		    //用户信息
			return new Promise((resolve, reject)=> {
				let app = getApp();
				if(userData == "") {
					uni.removeStorageSync('setUserData');
					uni.removeStorageSync('accessToken');
					commit("setUserData", userData);
					commit("setIsLogin", false);
					commit('setNoticeNum', {pm_number:0, system_message_number: 0});
					commit('notice/setPmList', [], {root:true});
					commit('notice/setNoticeList', [], {root:true});
					commit("setTabText", "未登录");
					app.globalData.myForum = [];
					resolve(true);
				} else {
				
					uni.setStorageSync('setUserData', userData);
					uni.setStorageSync('accessToken', userData.accessToken);
					commit("setUserData", userData);
					commit("setIsLogin", true);
						
					resolve(true);
					
				}
			});
			
			
		},
		setAppSidAsync(context) {
			//验证码设置标识
			let tmpsid = '';
			try{
				tmpsid = uni.getStorageSync('appSid');	
			}catch(e){
				//TODO handle the exception
			}
			if(tmpsid != '' && typeof tmpsid != 'undefined') {
				context.commit('setAppSid',tmpsid);
				return;
			}
			http.post("ucenter/app-app_sid.htm").then(function(res){
				res = res.data
				if(res.code==0){
					uni.setStorageSync('setAppSid', res.message);
					context.commit('setAppSid',res.message);
				} else {
					
				}
			})
			
		},
		setIsLoginAsync({commit}, islogin) {
			if(islogin) {
				try {
					const value = uni.getStorageSync('setUserData');
					if (value) {
						commit("setIsLogin", islogin);
						commit("setTabText", "我的");
					} 
				} catch (e) {
					// error
				}
			} else {
				uni.removeStorageSync('setUserData');
				commit("setIsLogin", islogin);
				commit('setNoticeNum',{pm_number:0, system_message_number: 0});
				commit("setTabText", "未登录");
			}
		},
		getNoticeNum(context) {
		
			return new Promise((resolve, reject)=> {
					http.get("pm/pm-app_newnotice.htm").then(function(res){
						res = res.data
						if(res.code==0){
							let a = res.message.newpms;
							let b = res.message.system_pms;
							
							context.commit('setNoticeNum', {pm_number:a, system_message_number:b});
							resolve({pm_number:a, system_message_number:b});
						} else {
							context.commit('setNoticeNum', {pm_number:0, system_message_number:0});
							resolve();
						} 
					})
			})
			
		}
	},
	getters:{
		getUserData(state){
		    //获取用户信息
			try{
				const value = uni.getStorageSync('setUserData');
				if (value) {
					
					commit("setIsLogin", true);
					commit("setTabText", "我的");
			    }
			}catch(e){
				//TODO handle the exception
			}
		    return state.userInfo;
		},
		getAppSid(state){
			//获取sid
			return state.appSid;
		},
		getNoticeNum(state) {
			return parseInt(state.pm_number) + parseInt(state.system_message_number);
		} 
	},
    modules:{
        bbs: bbsModule,
		activity: activityModule,
		notice: noticeModule,
		ucenter: ucenterModule,
		forum: forumModule,
		thread: threadModule
    }

})