//bbs数据
const state = {
	// isShow: false,
	isPost: false,
	isLoad: false,
	imgUrls: [
		"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg",
		"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
	],
	indicatorDots: true,
	autoplay: true,
	interval: 3000,
	duration: 1000,
	tabCurrentIndex: 1, 
	enableScroll: true,
	page: 1,
	fid:1,
	tabBars: [],
	plate:[{
		name: '区块链',
		url: '/static/home/qukuai.png'
	},
	{
		name: 'Android',
		url: '/static/home/android.png'
	},
	{
		name: '编程技术',
		url: '/static/home/biancheng.png'
		
	}],
	screen_height: 0,
	navbar_height: 0,
}
const mutations = {
	setImgUrls(state, imgurls) {
		state.imgUrls = imgurls;
	},
	// setIsShow(state, isshow) {
	// 	state.isShow = isshow;
	// },
	setFid(state, fid) {
		state.fid = fid;
	},
	setEnableScroll(state, enableScroll) {
	   state.enableScroll = enableScroll;
	},
	setTabBars(state, tabBars) {
	   state.tabBars = tabBars;
	},
	setTabBarsContent(state, list) {
	   state.tabBars[state.tabCurrentIndex]['newsList'] = list;
	},
	setTabCurrentIndex(state, tabCurrentIndex) {
	   state.tabCurrentIndex = tabCurrentIndex;
	   let tmpTabBars = state.tabBars;
	   tmpTabBars.forEach((item, index)=> {
		   if(index == tabCurrentIndex) {
			   state.fid = item.fid;
		   }
	   })
	},
	setNavbarHeight(state, navbarh) {
	   state.navbar_height = navbarh;
	},
	setScreenHeight(state,screenh) {
		state.screen_height = screenh;
	},
	setIsPost(state, ispost) {
	   state.isPost = ispost;
	},
	setPageInc(state) {
		state.tabBars[state.tabCurrentIndex].page++;
	},
	setPage(state, page) {
		state.tabBars[state.tabCurrentIndex].page = page;
	},
	resetPage(state) {
		state.tabBars[state.tabCurrentIndex].page = 1;
	},
	setShowBottomText(state, isshow) {
		state.isShowBottomText = isshow;
	},
	setisLoad(state, isLoad) {
		state.isLoad = isLoad;
	}
} 


const actions = {
    threadListAsync({commit, state, rootState}, {threadList, maxpage, pagesize}) {
    	return new Promise((resolve, reject) =>{
			
					
    		if(state.tabBars[state.tabCurrentIndex].page > maxpage) {
    			commit('setPage', maxpage);
    
    		}
    		if(state.tabBars[state.tabCurrentIndex].page <= maxpage) {
    			//数据累加
    			let ctlist = state.tabBars[state.tabCurrentIndex]['newsList'];
    			let threadlength = threadList.length;
    			
    			if(threadlength < pagesize) {
    				//不足一页，已经到底了
    				ctlist = ctlist.concat(threadList);
    				commit('setShowBottomText', true);
    				commit('setisLoad', true);
    				commit('setTabBarsContent', ctlist);
    				
    				resolve(true);
    				
    			} else if(threadlength == pagesize) {
    				//够一页，判断page是否等于maxpage。相等到底，不相等未到底。
    				
    				if(state.tabBars[state.tabCurrentIndex].page <= maxpage) {
						
    					ctlist = ctlist.concat(threadList);
						
    					commit('setShowBottomText', false);
						commit('setTabBarsContent', ctlist);
						resolve(true);
					} else {
    					ctlist = ctlist.concat(threadList);
    					commit('setShowBottomText', true);
    					commit('setisLoad', true);
    					commit('setTabBarsContent', ctlist);
						
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
	resetData({commit, state}, {}) {
		commit('');
	}
}
const getters = {
	swiperHeight(state){
		return state.screen_height - state.navbar_height
	}
}

//暴露出去
export default {
	namespaced:true,
    state,
    mutations,
    actions,
    getters
}