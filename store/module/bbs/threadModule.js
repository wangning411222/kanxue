//thread数据
const state = {
	showPannel:false,
	page: 1,
	maxpage: 1,
	isLoad:false,
	tid:0,
	quotepid: 0,
	isShowBottomText:false,
	showEditBox: false,
	thread:'',
	postList:[],
	isShowView:false,
	emojiIcon:'cuIcon-emoji',
	sendbtnIsDisabled:false,
	sendbtn: '发送',
	placeText:'发表评论...'
}
const mutations = {
	setTid(state, tid) {
		state.tid = tid;
	},
	setPlaceText(state, text){
		state.placeText = text;
	},
	setShowEditBox(state, isshow) {
		state.showEditBox = isshow;
	},
	setIsPost(state, ispost) {
		state.ispost = ispost;
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
	setisShowView(state, isShowView) {
		state.isShowView = isShowView;
	},
	setemojiIcon(state, icon) {
		state.emojiIcon = icon
	},
	setsendbtn(state, text) {
		state.sendbtn = text;
	},
	setsendbtnIsDisabled(state, isdisabled) {
		state.sendbtnIsDisabled = isdisabled
	},
	setThread(state, thread) {
		state.thread = thread;
	},
	setPostList(state, postList) {
		state.postList = postList;
	},
	setshowPannel(state, showPannel) {
		state.showPannel = showPannel
	},
	setFocus(state, focus) {
		state.focus = focus
	},
	setQuotepid(state, quotepid) {
		state.quotepid = quotepid;
	},
	setisLoad(state, isload) {
		state.isLoad = isload;
	}
} 

const actions = {
	getThreadAsync({commit, state, rootState }, { thread, postList, maxpage, pagesize }) {
		return new Promise((resolve, reject) =>{
			
			if(state.page > maxpage) {
				commit('setShowBottomText', true);
				commit('setisLoad', true);
				resolve(false);
			}
			if(state.page == 1) {
				commit('setThread', thread);
			}
			
			if(state.page <= maxpage) {
				//数据累加
			
				let postlist = state.postList;
				let plength = postlist.length;

				//够一页，判断page是否等于maxpage。相等到底，不相等未到底。
				if(state.page < maxpage) {
					
					postlist = postlist.concat(postList);
					commit('setShowBottomText', false);
					commit('setPostList', postlist);
					resolve(false);
					
				} else {
					//当前页等于最大页，已经到底。
					postlist = postlist.concat(postList);
					if(state.page > 1 && postlist.length > pagesize) {
						commit('setShowBottomText', true);
					} else {
						commit('setShowBottomText', false);
					}
					commit('setisLoad', true);
					commit('setPostList', postlist);
					resolve(true);
				}
			} else {
				if(state.page > 1) {
					commit('setShowBottomText', false);
				}
				commit('setisLoad', true);
				resolve(false);
			}		
				
				
				
			
		})
	},
	resetData({commit, state}) {
		return new Promise((resolve, reject)=> {
			commit('setPostList', []);
			commit('setThread', '');
			commit('setPage', 1);
			commit('setShowBottomText', false);
			resolve(true);
		});
	}
}
const getters = {
   

}

//暴露出去
export default {
	namespaced:true,
    state,
    mutations,
    actions,
    getters
}