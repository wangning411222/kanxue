//forum数据
const state = {
   isEditing: false,
   forumList:[]
}
const mutations = {
	setForumList(state, forumList) {
	   state.forumList = forumList;
	},
	setEditStatus(state, isEditing) {
	   state.isEditing = isEditing
	},
	setForumLocalStorage(state, {uid}) {
		uni.setStorageSync('forumList'+uid, state.forumList);
	}
} 


const actions = {
    forumListAsync({commit, state, rootState}, {forumList, type, uid}) {
		return new Promise((resolve, reject)=> {
			commit('setForumList', forumList);
			resolve(true);
			
		})
		
	},
	forumListReset({commit, state, rootState}, {i, uid}) {
		let tmpArr = state.forumList;
		if(typeof uid == 'undefined') uid = 0; 
		let app = getApp()
		if(tmpArr[i].status) {
			tmpArr.forEach((item, index)=> {
				if(index == i) {
					tmpArr[i].status = false;
				}
			})
			commit('setForumList', tmpArr);
		} else {
			let currentForum = tmpArr[i];
			currentForum.status = true;
			tmpArr.splice(i, 1);
			tmpArr.push(currentForum);
			commit('setForumList', tmpArr);
		}
		let myforum = [];
		tmpArr.forEach((item,index)=> {
			if(item.status) {
				myforum.push(item);
			}
		})
		uni.setStorageSync('myForum'+uid, myforum);
		app.globalData.myForum = myforum;
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