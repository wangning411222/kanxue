<template>
	
	<view>
		<view v-if="threadList.length > 0 && postype != 2">
			
			<view class="card_list" v-if="item" v-for="(item, index) in threadList" :key="index">
				
				<view class="card_list_body" @tap="goThread($event, item)">
					<view class="card_title text-black margin-bottom-sm">{{ item.subject }}</view>
					<view class="card_bottom flex">
						<view class="text-gray margin-right-lg">
							<img class="avatar_img" :src="item.user_avatar">
							<text class="padding-left-xs">{{ item.username }}</text>
						</view>
						
						<view class="text-gray text-sm flex-sub" style="text-align: right;">
							<text class="iconfont icon-liulan margin-right-xs" style="font-size: 28rpx;"></text> {{ item.views_fmt }}
							
							<text class="iconfont icon-xinxi margin-left-sm margin-right-xs" style="vertical-align: middle;"></text> {{ item.posts }}
						</view>
					</view>
				</view>
			</view>
			<view v-if="isShowBottomText" class="cu-load" style="color:#CCCCCC" :class="!isLoad ? 'loading' :'over'"></view>
		</view>
		
		<view v-if="threadList.length > 0 && postype == 2">
			<view class="card_list" v-if="item" v-for="(item, index) in threadList" :key="index">
				
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
			<view v-if="isShowBottomText" style="color:#CCCCCC" class="cu-load" :class="!isLoad ? 'loading' :'over'"></view>
		</view>
		<view v-if="isNullThreadList" class="text-center padding-top">
			<image src="../../../static/zanwu.png" mode="aspectFit" style="width: 400rpx;"></image>
			<view class="text-center">
				<text>暂无相关数据</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uParse from '@/components/uParse/src/wxParse.vue'
	const pagesize = 20;
	export default {
		data(){
			return {
				threadList:[],
				uid:0,
				page:1,
				ispost:false,
				postype:1,
				isShowBottomText:false,
				isLoad:false,
				isNullThreadList: false,
				optname:''
			}
		},
		components:{
			uParse
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			let uid = option.uid;
			if(uid == 0) {
				uni.showToast({
					'icon':'none',
					'title':'无用户标识'
				});
				setTimeout(function(){
					uni.navigateBack({
						delta:1
					})
				},800);
			}
			this.uid = uid;
			if (option.name == 'history') {
				uni.setNavigationBarTitle({
				    title: '浏览记录'
				});
				this.optname = 'history';
				this.postype = 1;
				this.getHistoryList();
			} else if(option.name == 'theme') {
				uni.setNavigationBarTitle({
				    title: '主题帖'
				});
				this.optname = 'theme';
				this.postype = 1;
				this.getThreadList();
			} else if(option.name == 'reply') {
				uni.setNavigationBarTitle({
				    title: '回帖'
				});
				this.postype = 2;
				this.optname = 'reply';
				this.getPostList();
			} else if(option.name == 'collection') {
				this.postype = 3;
				this.optname = 'collection';
				uni.setNavigationBarTitle({
				    title: '收藏'
				});
				this.getFavList();
			}
			
		},
		
		onReachBottom() {
			if(this.optname == 'history') return;
			let _this = this;
			if(this.ispost) return;
			//上拉加载。
			this.ispost = true;
			
			this.page ++;
			if(this.postype == 1) {
				
				this.getThreadList();
			} else if(this.postype == 2) {
				this.getPostList();
			} else if(this.postype == 3) {
				this.getFavList();
			}
		},
		methods:{
			detail() {
				uni.navigateTo({
					url: '/pages/bbs/children/thread',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			getHistoryList(){
				try {
					let value = uni.getStorageSync('historyList');
					if(value.length == 0) {
						this.isNullThreadList = true;
					} else {
						this.isNullThreadList = false;
					}
					this.threadList = value;
					this.isShowBottomText = true;
					this.isLoad = true;
				} catch (e) {
				    // error
				}
			
			},
			getPostList() {
				let _this = this;
				this.$http.post('bbs/app-postlist.htm', {uid:_this.uid, page:_this.page}).then(res=> {
					res = res.data;
					if(res.code == 0) {
						if(_this.page <= res.message.maxpage) {
							let tmplist = _this.threadList;
							tmplist = tmplist.concat(res.message.postlist);
							_this.threadList = tmplist;
							console.log(_this.threadList);
							if(_this.page > 1 && _this.threadList.length > pagesize) {
								_this.isShowBottomText = true;
							} else {
								_this.isShowBottomText = false;
							}
							_this.isLoad = false;
						} else {
							_this.isShowBottomText = true;
							_this.isLoad = true;
						}	
						
						_this.ispost = false;
						
						if(_this.threadList == 0) {
							_this.isNullThreadList = true;
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
			goThread(e,item) {
			
				let tid = item.tid;
				uni.navigateTo({
					'url': '../../bbs/children/thread?tid='+tid
				})
			},
			getFavList(){
				let _this = this;
				this.$http.post('bbs/app-myfavorite.htm', {uid:_this.uid, page:_this.page}).then(res=> {
					res = res.data;
					if(res.code == 0) {
						if(_this.page <= res.message.maxpage) {
							let tmplist = _this.threadList;
							tmplist = tmplist.concat(res.message.threadlist);
							_this.threadList = tmplist;
							_this.isLoad = true;
						} else {
							_this.isLoad = false;
						}	
						if(_this.page > 1 && _this.threadList.length > pagesize) {
							_this.isShowBottomText = true;
						} else {
							_this.isShowBottomText = false;
						}
						_this.ispost = false;
						
						if(_this.threadList == 0) {
							_this.isNullThreadList = true;
						}
					} else {
						uni.showToast({
							'icon':'none',
							'title':'出错啦！'
						});
						return;
					}
					_this.ispost = false;
				}).catch(r=>{
					uni.showToast({
						'icon':'none',
						'title':'网络状况不佳~'
					})
				});
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
						} else {
							_this.isShowBottomText = true;
							_this.isLoad = true;
						}	

						_this.ispost = false;
						
						if(_this.threadList == 0) {
							_this.isNullThreadList = true;
						}
					} else {
						_this.ispost = false;
						uni.showToast({
							'icon':'none',
							'title': '出错啦！'
						});
						return;
					}
				}).catch(r=>{
					uni.showToast({
						'icon':'none',
						'title': '网络状况不佳！'
					});
					return;
				})
			},
			userCenter(e,item) {
				let uid = item.uid;
				uni.navigateTo({
					'url': '../../bbs/children/ucenter?uid='+uid
				})
			}
		}
	}
</script>

<style lang="scss">
	
	/* 内容列表 */
	.card_list {
		width: 100%;
	
		display: flex;
	
		flex-direction: row;
		padding: 20rpx;
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
	
</style>
