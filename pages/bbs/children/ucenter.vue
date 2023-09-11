<template>
	<view class="content">

		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabBars" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<!-- 内容部分 -->
		<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
			<swiper-item>
				<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" @scroll="scroll_webview">
					<!-- 
						* 新闻列表 
						* 和nvue的区别只是需要把uni标签转为weex标签而已
						* class 和 style的绑定限制了一些语法，其他并没有不同
					-->
					<view v-if="threadList.length > 0 && postype != 2">
						
						<view class="card_list" v-if="item" v-for="(item, index) in threadList" :key="index">
							
							<view class="card_list_body" @tap="goThread($event, item)">
								<view class="card_title text-black margin-bottom-sm">{{ item.subject }}</view>
								<view class="card_bottom flex">
									<view class="text-gray flex-sub">{{ item.create_date_fmt }}</view>
									<view class="text-gray text-sm flex-sub" style="text-align: right;">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{ item.views_fmt }}
										
										<text class="cuIcon-messagefill margin-lr-xs"></text> {{ item.posts }}
									</view>
								</view>
							</view>
						</view>
						<view v-if="isShowBottomText" class="cu-load bg-grey" :class="!isLoad ? 'loading' :'over'"></view>
						<view style="height: 36px;"></view>
					</view>
					
					<view v-if="isNullThreadList" class="text-center padding-top">
						<image src="/static/zanwu.png" mode="aspectFit" style="width: 400rpx;"></image>
						<view class="text-center">
							<text>暂无相关数据</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore" @scroll="scroll_webview">
					<!-- 
						* 新闻列表 
						* 和nvue的区别只是需要把uni标签转为weex标签而已
						* class 和 style的绑定限制了一些语法，其他并没有不同
					-->
					
					<view v-if="postList.length > 0 && postype == 2">
						<view class="card_list" v-if="item" v-for="(item, index) in postList" :key="index">
							
							<view class="card_list_body" @tap="goThread($event, item)">
								<view class="text-black text-lg">{{ item.subject }}</view>
								<view style="width: 100%;" class="padding-tb-sm">
									<u-parse :content="item.message_fmt" @preview="preview" @navigate="navigate" />
								</view>
								
								<view class="card_bottom flex">
									<view class="text-gray flex-sub">{{ item.create_date_fmt }}</view>
									
								</view>
							</view>
						</view>
						<view v-if="isShowBottomText" class="cu-load bg-grey" :class="!isLoad ? 'loading' :'over'"></view>
						<view style="height: 36px;"></view>
					</view>
					<view v-if="isNullThreadList" class="text-center padding-top">
						<image src="/static/zanwu.png" mode="aspectFit" style="width: 400rpx;"></image>
						<view class="text-center">
							<text>暂无相关数据</text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

		<view class="user_detail_box" :class="{expanded:top_card_state,contract:!top_card_state}">
			<view class="menu">
				<view class="toggle" @click="card_toggle">
					<text class="cuIcon-close text-gray" style="padding: 0; font-size: 40rpx;"></text>
				</view>

				<view class="detail_card" :class="{hidden: !top_card_state, show: top_card_state}">
					<view class="flex">
						<view>
							<img :src="avatar_url" class="round" style="width: 100rpx; height: 100rpx;" />
						</view>
						<view class="flex-sub detail_card_box">
							<view class="padding-bottom-sm text-df flex">
								<text class="flex-sub username">{{ username }}</text>
								
							</view>

							<view>
								<text @tap="gonotice" class="text-blue message text-df">私信</text>
								
							</view>
							
						</view>
						
					</view>
					<view class="margin-tb-xs" style="height: 1px; border-bottom: 1px solid #EEEEEE;"></view>
					<view style="height: 60rpx; overflow: hidden;">
						<view v-if="img_item.length > 0">
							<image v-for="(item, index) in img_item" :key="index" :src="item.imgs" style="width: 60rpx;height: 60rpx;" mode=""></image>
						</view>
						<view v-else>
							<text>暂无勋章</text>
						</view>
					</view>
					<view class="flex text-gray margin-top-xs">
						<view class="flex-sub">
							<text class="cuIcon-time margin-right-xs"></text>{{ last_active }}
						</view>
						<view class="flex-sub text-right">
							<text class="margin-lr-xs">访问量：{{ views }}</text>
						</view>
					</view>
					
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import uParse from '../../../components/uParse/src/wxParse.vue'
	const pagesize = 20;
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {

		data() {
			return {
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				tabBars: [],
				threadList:[],
				postList:[],
				uid:0,
				page:1,
				page2:1,
				ispost:false,
				postype:1,
				isShowBottomText:false,
				isLoad:false,
				isNullThreadList: false,
				top_card_state: true,
				username: '未知',
				avatar_url:'../../../static/mine/user.png',
				views: 0,
				img_item:[],
				last_active:'',
				ispost:false
			}
		},
		components:{
			uParse
		},
		computed: {

		},
		onLoad(options) {
			let uid = options.uid || 0;
			if(options.uid > 0) {
				this.uid = options.uid;
			}
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.loadTabbars();
			
			this.userCenterData();
		},
		onReady() {

		},
		methods: {
			/**
			 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
			 * 这里直接写的
			 * mixin使用方法看index.nuve
			 */
			//获取分类
			userCenterData() {
				let _this = this;
				this.$http.post('bbs/app-user_center.htm', {cuid:_this.uid}).then(res => {
					//获取数据
					res = res.data;
					if (res.code == 0) {
						let tmpdata = res.message;
						_this.threads = tmpdata.threads;
						_this.posts = tmpdata.posts;
						_this.favors = tmpdata.favors;
						_this.golds = tmpdata.golds;
						_this.img_item = tmpdata.img_item;
						_this.avatar_url = tmpdata.avatar;
						_this.username = tmpdata.username;
						_this.views = tmpdata.views;
						_this.last_active = tmpdata.last_active;
					}
					uni.hideLoading();
				}).catch(err=>{
					uni.showToast({
						'icon':'none',
						'title':'网络状况不佳'
					});
					return;
				})
			},
			gonotice() {
				
				uni.navigateTo({
					'url':'../../notice/create?username='+this.username
				})
			},
			
			
			loadTabbars() {
				let tabList = [{
					name: '主题',
					id: '1',
				}, {
					name: '回帖',
					id: '2'
				}];
				tabList.forEach(item => {
					item.newsList = [];

				})
				this.tabBars = tabList;
				this.loadNewsList('add');
			},
			//新闻列表
			loadNewsList(type) {
				
				let _this = this;
				if(_this.tabCurrentIndex == 0) {
					_this.postype = 1;
					//_this.page++;
					_this.getThreadList();
					
				} else {
					
					_this.postype = 2;
					//_this.page2++;
					_this.getPostList();
				}
			},
			goThread(e,item) {
				let tid = item.tid;
				uni.navigateTo({
					'url': '../../bbs/children/thread?tid='+tid
				})
			},

			//下拉刷新
			onPulldownReresh() {
				this.loadNewsList('refresh');
			},
			//上滑加载
			loadMore() {
				if(this.ispost) return;
				this.ispost = true;
				if(this.postype == 1) {
					this.page++;
				} else {
					this.page2++;
				}
				this.loadNewsList('add');
			},
			//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			},
			getThreadList() {
				
				let _this = this;
				this.$http.post('bbs/app-threadlist.htm', {uid:_this.uid, page:_this.page}).then(res=>{
					res = res.data;
					if(res.code == 0) {
						if(_this.page <= res.message.maxpage) {
							let tmplist = _this.threadList;
							tmplist = tmplist.concat(res.message.threadlist);
							_this.threadList = tmplist;
							if(_this.page > 1 && _this.threadList.length > pagesize) {
								_this.isShowBottomText = true;
							} else {
								_this.isShowBottomText = false;
							}
							_this.isLoad = false;
							_this.ispost = false;
						} else {
							_this.isShowBottomText = true;
							_this.isLoad = true;
						}	
			
						_this.ispost = false;
						
						if(_this.threadList.length == 0) {
							_this.isNullThreadList = true;
						} else {
							_this.page++;
							_this.isNullThreadList = false;
						}
					} else {
						_this.ispost = false;
						uni.showToast({
							'icon':'none',
							'title': '出错啦！'
						});
						return;
					}
				}).catch(err=>{
					console.log(err);
					return;
				})
			},
			getPostList() {
				let _this = this;
				this.$http.post('bbs/app-postlist.htm', {uid:_this.uid, page:_this.page2}).then(res=> {
					res = res.data;
					if(res.code == 0) {
						if(_this.page2 <= res.message.maxpage) {
							let tmplist = _this.postList;
							tmplist = tmplist.concat(res.message.postlist);
							_this.postList = tmplist;
							
							if(_this.page > 1 && _this.postList.length > pagesize) {
								_this.isShowBottomText = true;
							} else {
								_this.isShowBottomText = false;
							}
							_this.isLoad = false;
							_this.ispost = false;
						} else {
							_this.isShowBottomText = true;
							_this.isLoad = true;
						}	
						
						_this.ispost = false;
						
						if(_this.postList.length == 0) {
							_this.isNullThreadList = true;
						} else {
							_this.isNullThreadList = false;
						}
						
					} else {
						uni.showToast({
							'icon':'none',
							'title':'出错啦'
						})
					}
					this.ispost = false;
				}).catch(r=>{
					uni.showToast({
						'icon':'none',
						'title':'网络状况不佳'
					})
				});
			},
			//tab切换
			async changeTab(e) {

				if (scrollTimer) {
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if (typeof e === 'object') {
					index = e.detail.current
				}
				if (typeof tabBar !== 'object') {
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
					if (i === index) {
						nowWidth = result.width;
					}
				}
				if (typeof e === 'number') {
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index;
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(() => {
					if (width - nowWidth / 2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
					} else {
						this.scrollLeft = 0;
					}
					if (typeof e === 'object') {
						this.tabCurrentIndex = index;
					}
					this.tabCurrentIndex = index;
					console.log(index);
					this.threadList = [];
					this.postList = [];
					
					if(this.tabCurrentIndex == 0) {
						this.page2 = 1;
						this.postype = 1;
						
					} else {
						this.page = 1;
						this.postype = 2;
					}
					
					this.loadNewsList('add');
					
				}, 300)

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

			scroll_webview(event) {
				
				
				// this.top_card_state= false;
			
			},
			
			card_toggle() {
				this.top_card_state= false;
			}
		}
	}
</script>

<style lang='scss'>
	.top_detail_show {
		display: none;
	}
	.card_list {
		width: 100%;
	
		display: flex;
	
		flex-direction: row;
		padding: 20rpx;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}
	
	.avatar_img {
		width: 120rpx;
		height: 120rpx;
		
		border-radius: 6rpx;
	}
	
	.card_list .card_list_body {
		
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
	
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}

	.swiper-box {
		height: 100%;
	}

	.panel-scroll-box {
		height: 100%;

		.panel-item {
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}

	/**
	 * 新闻列表 直接拿的nvue样式修改，,
	 * 一共需要修改不到10行代码, 另外px需要直接修改为upx，只有单位不一样，计算都是一样的
	 * 吐槽：难道不能在编译的时候把nuve中的upx转为px? 这样就不用修改单位了
	 */
	.video-wrapper {
		width: 100%;
		height: 440upx;

		.video {
			width: 100%;
		}
	}

	

	.img {
		width: 100%;
		height: 100%;
	}

	.news-item {
		position: relative;
	}

	/* 修改结束 */

	/* 新闻列表  emmm 仅供参考 */
	.news-item {
		width: 750upx;
		padding: 24upx 30upx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;
	}

	.title {
		font-size: 32upx;
		color: #303133;
		line-height: 46upx;
	}

	.bot {
		flex-direction: row;
	}

	.author {
		font-size: 26upx;
		color: #aaa;
	}

	.time {
		font-size: 26upx;
		color: #aaa;
		margin-left: 20upx;
	}

	.img-list {
		flex-shrink: 0;
		flex-direction: row;
		background-color: #fff;
		width: 220upx;
		height: 140upx;
	}

	.img-wrapper {
		flex: 1;
		flex-direction: row;
		height: 140upx;
		position: relative;
		overflow: hidden;
	}

	.img {
		flex: 1;
	}

	.img-empty {
		height: 20upx;
	}

	/* 图在左 */
	.img-list1 {
		position: absolute;
		left: 30upx;
		top: 24upx;
	}

	.title1 {
		padding-left: 240upx;
	}

	.bot1 {
		padding-left: 240upx;
		margin-top: 20upx;
	}

	/* 图在右 */
	.img-list2 {
		position: absolute;
		right: 30upx;
		top: 24upx;
	}

	.title2 {
		padding-right: 210upx;
	}

	.bot2 {
		margin-top: 20upx;
	}

	/* 底部3图 */
	.img-list3 {
		width: 700upx;
		margin: 16upx 0upx;
	}

	.img-wrapper3 {
		margin-right: 4upx;
	}

	/* 底部大图 */
	.img-list-single {
		width: 690upx;
		height: 240upx;
		margin: 16upx 0upx;
	}

	.img-wrapper-single {
		height: 240upx;
		margin-right: 0upx;
	}

	.video-tip {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
	}

	.video-tip-icon {
		width: 60upx;
		height: 60upx;
	}

	.user_detail_box {
		position: fixed; 
		bottom: 100rpx; 
		left: 50%; 
		margin-left: -340rpx; 
		width: 680rpx; 
		/* height: 280rpx; */
		padding: 20rpx;

		box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15);
		background: white;
		
		border-radius: 6px;
		box-sizing: border-box;
		transform: scale(1);
		transition: all .5s ease-in-out;
		.toggle {
			position: absolute;
			right: 0rpx;
			top: 0rpx;
		}
		.detail_card_box {
			padding-left: 20rpx;
		}
		.username {
			font-size: 32rpx;
		}
		.message {
			font-size: 24rpx;
			border-radius: 6rpx;
			border: 1px solid #0081ff;
			padding: 0 5rpx;
		}
	}
	
	.user_detail_box.contract {
		transform: scale(0);
	}
	.user_detail_box.expanded {
		
		animation: expanded 1s;
	}
	@keyframes expanded
	        {
	        from {transform: scale(0);}
	        to {transform: scale(1);}
	}
	
	

</style>
