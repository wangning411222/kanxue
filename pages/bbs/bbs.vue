<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<view>
		
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
				<view 
					v-for="(item,index) in tabBars" :key="item.fid"
					class="nav-item"
					:class="{current: index === tabCurrentIndex}"
					:id="'tab'+index"
					@click="changeTab(index)"
				>{{item.name}}</view>
			</scroll-view>
			<view class="more_forum text-center" style="line-height: 90rpx;" @click="onRedirect(999)">
				<span  class="iconfont icon-gengduo" style="font-size: 40rpx; vertical-align: baseline;"></span>
			</view>
		</view>
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" :reftext="reftext" class="panel-content" :top="90" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<!-- 内容部分 -->
			<swiper 
				id="swiper"
				class="swiper-box" 
				
				:current="tabCurrentIndex" 
				@change="changeTabTouch"
			>
				<swiper-item v-for="(tabItem,tabIndex) in tabBars" :key="tabIndex">
					<scroll-view 
						class="panel-scroll-box" 
						:scroll-y="enableScroll" 
						@scrolltolower="loadMore"
						>
						<!-- 
							* 新闻列表 
							* 和nvue的区别只是需要把uni标签转为weex标签而已
							* class 和 style的绑定限制了一些语法，其他并没有不同
						-->
						<view v-if="tabItem.newsList && tabItem.newsList.length > 0">
							<view v-for="(item, index) in tabItem.newsList" :key="index">
								
								<view class="card_list">
									<view class="card_list_body" @tap="goThread($event, item)">
										<view class="card_title text-black margin-bottom-sm">
										{{ item.subject }}
										<text v-if="item.digest == 3" class="iconfont icon-zuanshi margin-right-xs" style="font-size: 28rpx; color: #d84c48;"></text>
										<text v-if="item.digest == 2" class="iconfont icon-zuanshi margin-right-xs" style="font-size: 28rpx; color: #ff7800;"></text>
										</view>
										<view class="card_bottom flex">
											<view class="text-gray margin-right-lg">
												<img v-show="!(item.loadimg)" class="avatar_img" @tap="userCenter($event, item)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1Njk4YjhlYi1kNzQyLTQzNWItYTQ3Zi0yYzNjMWUxOTM1NWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTQ5NUUzN0EwNDRGMTFFQUIzODlEREY4RDc5QzdCODMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTQ5NUUzNzkwNDRGMTFFQUIzODlEREY4RDc5QzdCODMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1Njk4YjhlYi1kNzQyLTQzNWItYTQ3Zi0yYzNjMWUxOTM1NWQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTY5OGI4ZWItZDc0Mi00MzViLWE0N2YtMmMzYzFlMTkzNTVkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+c/Iu1gAAABhQTFRF5+fszs3R2tndvr3BwL/D4+PqwcDF8vDxJl2PVwAAAWlJREFUeNrslN2ChSAIhBkUev833iFPm2n+nKu9WW6y4nMAETm+NvlH/g6R8WavP0ThNKjtIsgph6Xk2ELEc/bLkssaEbpVlnum+4AHETorRJPnhtEF0gIR2hzR5J21MtJlEtV9IpgiBJKZp6rOXWTSVLiEoV4ptXVuVa7ANVpgR8WquA2UighztjFiOT/fgSIkQwQK7c+aIIaIW4/ERjZGKII3ZKIi8JfG9YxZkcW7yBQ2b0vret1tdV9amT67DmllXNd3/1keYGfC1PvqzriIttF7aXtzzK7xhSTbAxaclJyY+GIm05u2j7BtEOcnfEB2kAhK1BmXxjjHalrKCYhJBMbHG/R81QLQ2NOIxQnpGGEKBeBcUvWy4hcf3hc6fQCqyOHXmoyOEFwE0z9uJDIbIKgQxAWWojFBThXcSNkBCxUpSZ8+H4THI5jlokUlfE5Rpr6hEo7RMOb2qzLJ5YNY3Cxxe1X5EWAA+Bo73gX4K+kAAAAASUVORK5CYII=">
												<img v-show="item.loadimg" class="avatar_img" :src="item.user_avatar" @load="loadimg(index)" @tap="userCenter($event, item)">
												<!-- <text class="iconfont icon-ren1 margin-right-xs" style="font-size: 28rpx;"></text> -->
												<text class="padding-left-xs">{{ item.username }}</text>
											</view>
											<view class="text-gray text-sm flex-sub text-right" style="line-height: 1.5;">
												<text class="iconfont icon-liulan margin-right-xs" style="font-size: 28rpx;"></text> {{ item.views_fmt }}
												<!-- <text class="cuIcon-appreciatefill margin-lr-xs"></text> {{ item.thumbs }} -->
												<text class="iconfont icon-xinxi margin-left-lg margin-right-xs" style="vertical-align: middle;"></text> {{ item.posts }}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view v-if="tabItem.newsList.length <= 0" style="position: absolute; top: 400rpx;width: 100%;">
							<mix-load-more :status="1"></mix-load-more>
						</view>
						<!-- 上滑加载更多组件 -->
						<mix-load-more v-if="tabItem.newsList.length !=0 " :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		
		<!-- #ifdef APP-PLUS -->
		<view class="send_box " @click="goSend">
			<text class="text-xxl cuIcon-post"></text>
		</view>
		<!-- #endif -->
		
		<!-- 检测版本 -->
		<view class="cu-modal" :class="versionShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">有新版本更新</view>
					
				</view>
				<view class="padding-xl">
					确定下载？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-black" v-if="!is_force_up" @tap="loginOutHide">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="isDownload">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getVersion } from '../../service/api/version.js' //版本api
	import { mapState, mapMutations, mapGetters } from 'vuex';
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	
	let windowWidth = 0, scrollTimer = false, tabBar;
	const pagesize = 10;
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore,
			// loadMore
		},
		data() {
			return {

				scrollLeft: 0, //顶部选项卡左滑距离
				reftext:'刷新成功',
				is_force_up: false,
				versionShow: false, //新版本下载弹出
				version: "",//版本号
				vDownUrl: "" //最新版下载地址
			}
		},
		computed:{
			...mapState({
				'userInfo':state=>state.userInfo,
				'isLogin':state=>state.isLogin,
				'fid': state=> state.bbs.fid,
				'isShow': state=>state.bbs.isShow,
				'ispost': state => state.bbs.isPost,
				'imgUrls': state=>state.bbs.imgUrls,
				'indicatorDots': state=>state.bbs.indicatorDots,
				'autoplay': state=>state.bbs.autoplay,
				'interval': state=>state.bbs.interval,
				'duration': state=>state.bbs.duration,
				'plate': state=>state.bbs.plate,
				'tabCurrentIndex': state=>state.bbs.tabCurrentIndex,
				'enableScroll': state=>state.bbs.enableScroll,
				'tabBars': state=>state.bbs.tabBars,
				'navbar_height':state=>state.bbs.navbar_height,
				'screen_height':state=>state.bbs.setScreenHeight,
				'forumList': state=> state.forum.forumList,
			}),
			...mapGetters({
				swiperHeight: 'bbs/swiperHeight',
			}),

		},
		onLoad() {
			this.getVersionData();
			
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
			// 初始加载数据
			let _this = this;
			uni.getSystemInfo({
			    success: function (res) {
			       _this['bbs/setScreenHeight'](res.windowHeight);
			    }
			});
			this.getForumList();
			
		},
		onShow() {
			let app = getApp();
			if(app.globalData.isForumPage == 1) {
				app.globalData.isForumPage = 0;
				this.getForumList();
			}
		},
		onReady(){
			const query = uni.createSelectorQuery().in(this);
			let _this = this;
			query.select('#nav-bar').boundingClientRect(data => {
				_this['bbs/setNavbarHeight'](data.height);
			}).exec();
			 
		},
		mounted() {
			var _this = this;
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,function(inf){  
				_this.version = inf.version //赋值版本号
			});  
			//#endif
		},
	
		methods: {
			...mapMutations([
				'bbs/setTabBars',
				'bbs/setImgUrls',
				'bbs/setIsPost',
				'bbs/setIsShow',
				'bbs/setFid',
				'bbs/setEnableScroll',
				'bbs/setTabCurrentIndex',
				'bbs/setNavbarHeight',
				'bbs/setScreenHeight',
				'bbs/resetPage',
				'bbs/setPageInc'
			]),
			advertNavUrl(){
				let data = {
					title: '测试跳转新闻详情',
					author: '测试作者',
					time: '2019-04-26 21:21'
				}
				// return `/pages/details/details`;
			} ,
			loadimg(index){
				this.$set(this.tabBars[this.tabCurrentIndex].newsList[index], 'loadimg', true);
			},
			getForumList() {
		
				let _this = this;
				
				let tmpForumList = _this.getMyForum();
			
				if(tmpForumList == '') {
					_this.$http.get('bbs/app-forum_list.htm').then(res=>{
						res = res.data;
						if(res.code == 0) {
							_this.$store.dispatch('forum/forumListAsync', {forumList: res.message, type: 1, uid: _this.userInfo.uid}).then(r=>{
								
								let tmpBars = _this.forumList;
								tmpBars = [tmpBars[0],tmpBars[1]];
								tmpBars.forEach(item=> {
									_this.$set(item, 'newsList', []);
									_this.$set(item, 'loadMoreStatus', 0);
									_this.$set(item, 'refreshing', 0);
									_this.$set(item, 'page', 1);
								});
								_this['bbs/setTabBars'](tmpBars);
								
								_this.loadNewsList();
								
							});
						} else {
							uni.showToast({
								'icon':'none',
								'title': res.message
							})
						}
					}).catch(err=>{
						uni.showToast({
							'icon':'none',
							'title': '网络状况不佳哦~'
						})
					});
				} else {
					_this.$store.dispatch('forum/forumListAsync', {forumList: tmpForumList, type:2, uid: 0}).then(r=> {
						
						let tmpBars = _this.forumList;
						
						tmpBars.forEach(item=> {
							_this.$set(item, 'newsList', []);
							_this.$set(item, 'loadMoreStatus', 0);
							_this.$set(item, 'refreshing', 0);
							_this.$set(item, 'page', 1);
						});
						_this['bbs/setTabBars'](tmpBars);
						
						_this.loadNewsList();
					});
				}
			},
			getMyForum() {
				let myForum;
				if(this.userInfo != '') {
					myForum = uni.getStorageSync('myForum'+this.userInfo.uid);
				} else {
					myForum = uni.getStorageSync('myForum');
				}
				let app = getApp()
				app.globalData.myForum = myForum;
				return myForum;
			},
			onRedirect: function(e) {
				if(e == 999) {
					if(!this.isLogin) {
						uni.navigateTo({
						    url: '/pages/mine/children/login?loginMode=0'
						});
						return false;
					}
					uni.navigateTo({
					    url: './children/forum'
					});
					return;
				}
				uni.showToast({
					title: e.toString(),
					duration: 500
				});
			},

			loadNewsList(type){
				let _this = this;
				let tabItem = this.tabBars[_this.tabCurrentIndex];
				//type add 加载更多 refresh下拉刷新
				if(type === 'add'){

					
					if(tabItem.loadMoreStatus === 2){
						return;
					}
					tabItem.loadMoreStatus = 1;
					
				} else if(type === 'refresh'){
					tabItem.refreshing = true;
					tabItem.newsList = [];
				}
				
				_this.$http.post('bbs/app-list.htm', {type:this.fid, page: _this.tabBars[_this.tabCurrentIndex].page}).then(res=> {
					res = res.data;

					if(res.code == 0) {
						if(_this.fid > 0) {
							_this.reftext = '刷新成功';
							_this.$store.dispatch('bbs/threadListAsync', {
								'threadList':res.message.threadlist,
								'maxpage':res.message.maxpage,
								'pagesize':pagesize
							}).then(r=> {
								
								_this['bbs/setIsPost'](false);
								
							})
						} else {
							let count = res.message.count;
							_this.reftext = '推荐内容有'+count+'条更新';
							//更新条数 res.message.count;
							_this.$store.dispatch('bbs/threadListAsync', {
								'threadList':res.message.threadlist,
								'maxpage':999,
								'pagesize':pagesize
							}).then(r=> {
								_this['bbs/setIsPost'](false);
							})
						}
						//下拉刷新 关闭刷新动画
						if(type === 'refresh'){
							_this.$refs.mixPulldownRefresh && _this.$refs.mixPulldownRefresh.endPulldownRefresh();
							// #ifdef APP-PLUS
							tabItem.refreshing = false;
							// #endif
							_this.$refs.mixPulldownRefresh && _this.$refs.mixPulldownRefresh.showrefreshresult();
						}
					} else {
						uni.showToast({
							'icon':'none',
							'title': res.message
						});
						_this.reftext = '刷新失败';
						//下拉刷新 关闭刷新动画
						if(type === 'refresh'){
							_this.$refs.mixPulldownRefresh && _this.$refs.mixPulldownRefresh.endPulldownRefresh();
							// #ifdef APP-PLUS
							tabItem.refreshing = false;
							// #endif
						}
					}
					
					
					
				}).catch(err=> {
					console.log(err);
					uni.showToast({
						'icon':'none',
						'title':'错误'
					})
					return;
				});
			},
			//下拉刷新
			onPulldownReresh(){
				this['bbs/resetPage']();
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore(){
	
				if(this.ispost) return;
				this['bbs/setIsPost'](true);
				this['bbs/setPageInc']();

				this.loadNewsList('add');
			},
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable){
				if(this.enableScroll !== enable){
					this['bbs/setEnableScroll'](enable);
				}
			},
			//tab切换
			async changeTab(e){
				this['bbs/setTabCurrentIndex'](e);
				//this['bbs/resetPage']();
			},
			
			async changeTabTouch(e){
				let _this = this;

				
				if(scrollTimer){
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				// //e=number为点击切换，e=object为swiper滑动切换
				if(typeof e === 'object'){
					index = e.detail.current
				}
				if(typeof tabBar !== 'object'){
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0; 
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if(i === index){
						nowWidth = result.width;
					}
				}
				if (width - nowWidth/2 > windowWidth / 2) {
					//如果当前项越过中心点，将其放在屏幕中心
					this.scrollLeft = width - nowWidth/2 - windowWidth / 2;
				}else{
					this.scrollLeft = 0;
				}
				
				this['bbs/setTabCurrentIndex'](index);
				// //延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(()=>{
					this['bbs/resetPage']();
					//第一次切换tab，动画结束后需要加载数据
					
					let tmpBars = this.tabBars;
					let tabItem = tmpBars[this.tabCurrentIndex];
					tmpBars.forEach((item,index)=> {
						if(Math.abs(index - _this.tabCurrentIndex) > 1) {
							_this.$set(item, 'newsList', []);
							_this.$set(item, 'loadMoreStatus', 0);
							_this.$set(item, 'refreshing', 0);
							_this.$set(item, 'page', 1);
							
						}
					});
					if(tabItem.newsList.length == 0) {
						
						this.loadNewsList();
					}
					
				}, 800)
			},
			//获得元素的size
			getElSize(id) { 
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			goThread(e,item) {

				let tid = item.tid;
				uni.navigateTo({
					'url': './children/thread?tid='+tid
				})
			},
			userCenter(e,item) {
				let uid = item.uid;
				uni.navigateTo({
					'url': 'children/ucenter?uid='+uid
				})
			},
			goSend() {
				//是否已登录
				if(this.isLogin) {
					uni.navigateTo({
						'url': `children/send`
					})
				} else {
					uni.navigateTo({
						'url': '/pages/mine/children/login?loginMode=0'
					})
				}
				
			},
			getVersionData(){
				var _this = this;
				getVersion().then(res => {

					if( _this.version != '' && _this.version != res.data.message.version){
						_this.is_force_up = res.data.message.is_force_update;
						_this.vDownUrl=res.data.message.url //赋值下载地址
						_this.versionShow = true //弹窗
						uni.showToast({
							position: 'bottom',
							title: "有新版本"
						});
						uni.hideLoading();
					} 
				}).catch(err => {
					
					uni.hideLoading();
					uni.showToast({
						position: 'bottom',
						title: "检测失败！"
					});
				})
			},
			compare(curV, reqV) {
			  if (curV && reqV) {
			    //将两个版本号拆成数字
			    var arr1 = curV.split('.'),
			      arr2 = reqV.split('.');
			    var minLength = Math.min(arr1.length, arr2.length),
			      position = 0,
			      diff = 0;
			    //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
			    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
			      position++;
			    }
			    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
			    //若curV大于reqV，则返回true
			    return diff > 0;
			  } else {
			    //输入为空
			    console.log("版本号不能为空");
			    return false;
			  }
			},
			loginOutHide(){
				//版本下载弹窗隐藏
				this.versionShow=false;
			},
			isDownload(){
				var _this=this
				_this.loginOutHide();
				//下载更新包 整包下载（浪费 不推荐）
				var wgtUrl=_this.vDownUrl;
				
				var downToak=plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){  
					if ( status == 200 ) {   
						console.log("下载App成功："+d.filename);  
						plus.nativeUI.showWaiting("安装中...");  
						plus.runtime.install(d.filename,{},function(){  
							plus.nativeUI.closeWaiting();  
							console.log("安装成功！");  
							plus.nativeUI.alert("应用资源更新完成！",function(){  
								plus.runtime.restart();  
							});  
						},function(e){  
							plus.nativeUI.closeWaiting();  
							console.log("安装失败["+e.code+"]："+e.message);  
							plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);  
						});  
					} else {  
						console.log("下载App失败！");  
						plus.nativeUI.alert("下载App失败！");  
					}  
					plus.nativeUI.closeWaiting();  
				})
				downToak.start(); // 开启下载的任务
				var prg = 0;
				var showLoading = plus.nativeUI.showWaiting("正在下载,时间较长请勿关闭...");   //创建一个showWaiting对象 
				downToak.addEventListener("statechanged", function(task, status) {  //给下载任务设置一个监听 并根据状态  做操作
					switch(task.state) {
						case 1:
							showLoading.setTitle("正在下载");
						break;
						case 2:
							showLoading.setTitle("已连接到服务器");
						break;
						case 3:
							prg = parseInt(parseFloat(task.downloadedSize) / parseFloat(task.totalSize) * 100);
							if(prg % 1 == 0) {  // 让百分比 增长
								showLoading.setTitle("已下载" + prg + "%　　 ");
							}
						break; 
						case 4:
							plus.nativeUI.closeWaiting();
						break;
				
					}
				
				});
			
			}
		}
	
		
	}
</script>

<style lang='scss'>
	
	page, .content {
		background-color: #FFFFFF;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		.nav-item{
			display: inline-block;
			/* width: 150upx; */
			height: 90upx;
			padding: 0 30rpx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #0099EE;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		.current{
			color: #0099EE;
			&:after{
				width: 50%;
			}
		}
	}
	#nav-bar .nav-item:last-child {
		margin-right: 60px;
	}
	.more_forum {
		height: 90upx;
		width: 50px; 
		position: absolute;
		top: 0;
		right: 0; 
		z-index: 10; 
		background: #FFFFFF;
		border-left: 1px solid #EEEEEE;
	}
	
	.swiper-box{
		height: 100%;
	}

	.panel-scroll-box{
		height: 100%;
		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	

	
	/* 内容列表 */
	.card_list {
		width: 100%;
	
		display: flex;
	
		flex-direction: row;
		padding: 20rpx  20rpx  15rpx;
		border-bottom: 1px solid #f6f6f6;
		box-sizing: border-box;
	}
	
	.avatar_img {
		width: 50rpx;
		height: 50rpx;
		
		border-radius: 80rpx;
		vertical-align: middle;
	}
	
	.card_list .card_list_body {
		/* height: 120rpx; */
		padding-left: 20rpx;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
	}
	
	.card_list .card_title {
		width: 100%;
		line-height: 36upx;
		font-size: 30rpx;
		font-weight: 500;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.card_list .card_bottom {
		width: 100%;
		line-height: 30upx;
		letter-spacing: 0px;
	}
	
	.card_list .card_bottom view,
	.card_list .card_bottom .uni-icon {
		font-size: 28rpx !important;
	}
	
	/*  */
	
	/* #ifdef APP-PLUS */
	
	.send_box {
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		position: fixed;
		bottom: 60rpx;
		right: 60rpx;
		z-index: 11;
		border-radius: 100rpx;
		color: #FFFFFF;
		box-shadow: 0 0 6px 1px #5aacfc;
		background: #0099EE;
	}
	/* #endif */
</style>
