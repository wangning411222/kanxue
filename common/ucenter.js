import json from '@/json'
export default{
	data: {
		tabBars: [],
		tabCurrentIndex: 0,
	},
	
	methods: {
		loadTabbars(){
			let tabList = json.tabList;
			tabList.forEach(item=>{
				item.newsList = [];
				
			})
			this.tabBars = tabList;
			this.loadNewsList('add');
			
			
		},
		//新闻列表
		loadNewsList(type,times){
			
			let tabItem = this.tabBars[this.tabCurrentIndex];
			
			
			
			//setTimeout模拟异步请求数据
			setTimeout(()=>{
				let list = json.newsList;
				list.sort((a,b)=>{
					return Math.random() > .5 ? -1 : 1; //静态数据打乱顺序
				})
				if(type === 'refresh'){
					tabItem.newsList = []; //刷新前清空数组
				}
				list.forEach(item=>{
					tabItem.newsList.push(item);
				})
				
				
			}, 600)
			
			
		},
		//新闻详情
		navToDetails(item){
			let data = {
				id: item.id,
				title: item.title,
				author: item.author,
				time: item.time
			}
			let url = item.videoSrc ? 'videoDetails' : 'details'; 
			uni.navigateTo({
				url: `/pages/details/${url}?data=${JSON.stringify(data)}`
			})
		},
	}
	
}