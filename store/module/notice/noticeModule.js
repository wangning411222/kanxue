//notice数据 by wang
const state = {
	page: 1,
	maxpage: 1,
	isLoad:false,
	npage:1,
	maxnpage:1,
	isShowBottomText:false,
	selected: 0,
	pmList:[],
	noticeList:[],
	toggleImg: true,
	navbar_height:0,
	screen_height:0,
	ispost:false,
	// 详情页
	pmThread:'',
	pmReplyList:[],
	showPannel: false,
	focus: false,
	replybtn:'发送',
	rbIsDisabled:false,
	isShowView:false,
	//写短信
	userSearchList:[],
	searchListIsShow:false,
	selectUid:0,
	emojiIcon:'cuIcon-emoji',
	sendbtnIsDisabled:false,
	sendbtn: '发送'
	
}
const mutations = {
	setIsPost(state, ispost) {
		state.ispost = ispost;
	},
	setPmList(state, pmlist) {
		state.pmList = pmlist;
	},
	setNavbarHeight(state, height){
		state.navbar_height = height;
	},
	setScreenHeight(state, height) {
		state.screen_height = height;
	},
	setNoticeList(state, noticelist) {
		state.noticeList = noticelist;
	},
	setisLoad(state, isload) {
		state.isLoad = isload;
	},
	setShowBottomText(state, isshow) {
		state.isShowBottomText = isshow;
	},
	setPageInc(state) {
		state.page++;
	},
	setPage(state, page) {
		state.page = page;
	},
	resetPage(state) {
		state.page = 1;
	},
	setSelected(state, selected) {
		state.selected = selected;
	},
	setPmThread(state, pmthread) {
		state.pmThread = pmthread;
	},
	setPmReplyList(state, pmReplyList) {
		state.pmReplyList = pmReplyList;
	},
	setshowPannel(state, showPannel) {
		state.showPannel = showPannel
	},
	setFocus(state, focus) {
		state.focus = focus
	},
	setReplyBtn(state, text) {
		state.replybtn = text;
	},
	setrbIsDisabled(state, isdisabled) {
		state.rbIsDisabled = isdisabled
	},
	setisShowView(state, isShowView) {
		state.isShowView = isShowView;
	},
	setsearchListIsShow(state, isshow) {
		state.searchListIsShow = isshow;
	},
	setuserSearchList(state, userList) {
		state.userSearchList = userList;
	},
	setselectUid(state, uid) {
		state.selectUid = uid;
	},
	setemojiIcon(state, icon) {
		state.emojiIcon = icon
	},
	setsendbtn(state, text) {
		state.sendbtn = text;
	},
	setsendbtnIsDisabled(state, isdisabled) {
		state.sendbtnIsDisabled = isdisabled
	}


} 


const actions = {
    pmListAsync({commit, state, rootState}, {tmp_pmlist, maxpage, pagesize}) {
		return new Promise((resolve, reject) =>{
			if(state.page > maxpage) {
				commit('setPage', maxpage);
	
			}
			if(state.page <= maxpage) {
				//数据累加
				let cplist = state.pmList;
				let pmlength = tmp_pmlist.length;
				
				if(pmlength < pagesize) {
					//不足一页，已经到底了
					cplist = cplist.concat(tmp_pmlist);
					if(state.page > 1) {
						commit('setShowBottomText', true);
					}
					commit('setisLoad', true);
					commit('setPmList', cplist);
					
					resolve(true);
					
				} else if(pmlength == pagesize) {
					//够一页，判断page是否等于maxpage。相等到底，不相等未到底。
					
					if(state.page < maxpage) {
					
						cplist = cplist.concat(tmp_pmlist);
						commit('setShowBottomText', false);
						commit('setPmList', cplist);
						resolve(false);
						
					} else {
						cplist = cplist.concat(tmp_pmlist);
						if(state.page > 1) {
							commit('setShowBottomText', true);
						}
						commit('setisLoad', true);
						commit('setPmList', cplist);
						resolve(true);
					}
					
				} 
				
				
			} else {
				if(state.page > 1) {
					commit('setShowBottomText', true);
				}
				commit('setisLoad', true);
				resolve(false);
			}
			
		})
	},
	noticeListAsync({commit, state, rootState}, {tmp_noticelist,maxpage,pagesize}) {
		return new Promise((resolve, reject) =>{
			let cnlist = state.noticeList;
			if(state.page > maxpage) {
				commit('setPage', maxpage);
			}
			
			if(state.page <= maxpage) {
				//数据累加
				let cnlist = state.noticeList;
				let nlength = tmp_noticelist.length;
				
				if(nlength < pagesize) {
					//不足一页，已经到底了
					cnlist = cnlist.concat(tmp_noticelist);
					commit('setShowBottomText', true);
					commit('setisLoad', true);
					commit('setNoticeList', cnlist);
					
					resolve(true);
					
				} else if(nlength == pagesize) {
					//够一页，判断page是否等于maxpage。相等到底，不相等未到底。
					
					if(state.page < maxpage) {
						cnlist = cnlist.concat(tmp_noticelist);
						commit('setShowBottomText', false);
						commit('setNoticeList', cnlist);
						resolve(false);
						
					} else {
						cnlist = cnlist.concat(tmp_noticelist);
						commit('setShowBottomText', true);
						commit('setisLoad', true);
						commit('setNoticeList', cnlist);
						resolve(true);
					}
					
				} 
				
				
			} else {
		
				commit('setShowBottomText', true);
				commit('setisLoad', true);
				resolve(false);
			}
			
		})
	},
	noticeReadAsync({commit, state}, {pmtid, pmthread, pmReplyList}) {
		return new Promise((resolve, reject)=> {
			commit('setPmThread', pmthread);
			commit('setPmReplyList', pmReplyList);
			//已读
			let tmpPmList = state.pmList;
			tmpPmList.forEach((item, index)=> {
				if(item.pmtid == pmtid) {
					tmpPmList[index]['isread'] = 1;
				}
			})
			commit('setPmList', tmpPmList);
			resolve();
		}) 
	},
	pmSendBefore({commit, state, rootState}, postData) {
		return new Promise((resolve, reject)=> {
			commit('setsendbtnIsDisabled', true);
			commit('setsendbtn', '发送中');
			commit('setemojiIcon', 'cuIcon-emoji');
			commit('setshowPannel', false);
			resolve();
		})
	},
	pmSendAfter({commit, state, rootState}) {
		return new Promise((resolve,reject)=> {
			commit('setsendbtnIsDisabled', false);
			commit('setsendbtn', '发送');
			commit('setselectUid', 0);
			resolve();
		})
	}
}
const getters = {
	scrollHeight(state, getters) {
		return state.screen_height - state.navbar_height;
	},
	replyHeight(state, getters) {
		return state.screen_height * 0.75;
	}
 }

//暴露出去
export default {
	namespaced: true,
    state,
    mutations,
    actions,
    getters
}