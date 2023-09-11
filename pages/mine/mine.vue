<template>
	<view class="mine" v-if="isLogin" @touchstart="getStartPosition" @touchmove="getMovePosition" @touchend="getEndPosition">

		<view class="bg-gradual-blues top_wave" :class="transition_bk == true ? 'top_bak_transition' : ''" :style="'height:'+top_wave_height+'px;background-image: url(../../static/mine/bg.png);'">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar ">
				<view class="top_view"></view>
			</view>
			<!-- #endif -->
			
			
		</view>
		<view style="position: relative; padding-top: 100rpx;">
			<view class="logo bg-white " @click="goLogin">
				<view class="avatar_box">
					<image class="cu-avatar logoxl round margin-right-sm" :src="isLogin ? userInfo.avatar_url : '../../static/mine/user.png'"></image>
					<text v-if="isLogin" class="text-white text-lg">{{ userInfo.username }}</text>
					<text v-else class="text-white">您未登录<text class="cuIcon-right"></text></text>
					
					<view class="sign_btn" @click="sign_in">
						<image src="../../static/mine/signin_white.png" style="width: 40rpx; height: 40rpx; vertical-align: bottom;"></image>
						签到
					</view>
				</view>
				
				<view class="text-center">

					<!-- <view>
						<view class="badge_box" v-if="img_item.length > 0">
							<image v-bind:key="index" v-for="(item,index) in img_item" class="icon" :src="item.imgs" mode=""></image>
							
						</view>
						<navigator v-else url="../bbs/children/thread?tid=247755" style="height: 60rpx;">
						暂无勋章
						</navigator>
					</view> -->
					<view class="flex information bg-white ">
						<view style="flex: 1;" @click="jump_theme">
							<view><text class="font-13 color0099ee">{{ (threads != 0) ? threads:'-' }}</text></view>
							<text class="text-gray font-13">主题帖</text>
						</view>
						<view class="splitline"></view>
						<view style="flex: 1;" @click="jump_reply">
							<view><text class="font-13 color0099ee">{{ (posts != 0) ? posts:'-' }}</text></view>
							<text class="text-gray font-13">回帖</text>
						</view>
						<view class="splitline"></view>
						<view style="flex: 1;" @click="jump_collection">
							<view><text class="font-13 color0099ee">{{ (favors != 0) ? favors:'-' }}</text></view>
							<text class="text-gray font-13">收藏</text>
						</view>
						<view class="splitline"></view>
						<view style="flex: 1;">
							<view @click="jump_golds"><text class="font-13 color0099ee">{{ (golds != 0) ? golds:'-' }}</text></view>
							<text class="text-gray font-13">雪币</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow" @click="badge_fun">
					<view class="content">
						<span  class="iconfont icon-jiangzhang" style="font-size: 40rpx; vertical-align: middle; margin-right: 10rpx;"></span>
						<text class="color515151 font-13">我的成就</text>
						<text class="badge_box" v-if="img_item.length > 0" style="float: right; position: relative; top: 3rpx;">
							<image class="icon" :src="img_item[0].imgs" mode="" style="width: 40rpx; height: 40rpx;"></image>
						</text>
						<text v-else class="text-muted" style="float: right; position: relative; top: 3rpx;">
						暂无勋章
						</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="jump_history">
					<view class="content">
						<span  class="iconfont icon-lishishuju" style="font-size: 40rpx; vertical-align: middle; margin-right: 10rpx;"></span>
						<text class="color515151 font-13">浏览记录</text>
					</view>
				</view>
			</view>
			<view class="hr"></view>
			<view class="cu-list menu sm-border">

					<view class="cu-item arrow" @click="jump_setup">
						<view class="content">
							<span  class="iconfont icon-shezhi" style="font-size: 40rpx; vertical-align: middle; margin-right: 10rpx;"></span>
							<text class="color515151 font-13">设置</text>
						</view>
					</view>


				</view>
		</view>
		
		<view class="text-gray text-center padding-bottom-sm" style="position: absolute; bottom: 0; width: 100%;">
			<view class="text-xs"><text>看雪科技 版权所有</text></view>
			<view class="text-xs"><text>Copyright ©2019-{{ year }} Kanxue</text></view>
			<view class="text-xs"><text> All Rights Reserved</text></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				threads: 0,
				posts: 0,
				golds: 0,
				favors: 0,
				img_item:[],
				
				startY: 0,
				startX: 0,
				top_wave_height_start: 200,
				top_wave_height: 200,
				transition_bk:false,
				myuid:0,
				year: 0
			}
		},
		computed: {
			...mapState(['isLogin', 'userInfo'])
		},
		onLoad(){
			let d = new Date();
			this.year = d.getFullYear();
		},
		onShow() {
			//获取用户数据
			// uni.showLoading({
					
			// });
			this.getMyData();
		},
		onTabItemTap(e) {
			if(!this.isLogin) {
				uni.navigateTo({
				    url: '/pages/mine/children/login?loginMode=0'
				});
			}
			
		},
		
		methods: {
			badge_fun(){
				uni.navigateTo({
				    url: '/pages/mine/children/medal'
				});
				
			},
			getMyData() {
				let _this = this;
				this.$http.get('bbs/app-ucenter.htm').then(res => {
					//获取数据
					res = res.data;
					if (res.code == 0) {
						let tmpdata = res.message;
						_this.threads = tmpdata.threads;
						_this.posts = tmpdata.posts;
						_this.favors = tmpdata.favors;
						_this.golds = tmpdata.golds;
						_this.img_item = tmpdata.img_item;
						_this.myuid = tmpdata.myuid;
						if(tmpdata.myuid == 0) {
							//清空登录态
							_this.$store.dispatch("setUserDataAsync","").then(res=>{
								
								uni.removeTabBarBadge({
									index:2
								});
								uni.switchTab({
								    url: '/pages/mine/children/login'
								});
								
							}) //清空登录状态
						}
					}
					uni.hideLoading();
				}).catch(err=>{
					uni.showToast({
						'icon':'none',
						'title':'网络状况不佳'
					})
				})
			},
			goLogin() {
				//登录
				if (!this.isLogin) {
					console.log("点击前往登录")
					uni.navigateTo({
						url: '../mine/children/login?loginMode=0',
						animationType: 'pop-in',
						animationDuration: 200
					});
				}
			},

			verify_islogin() {
				if (!this.isLogin) {
					uni.showToast({
						'icon': 'none',
						'title': '请先登录'
					});
					return 0;
				}
				return this.userInfo.uid;
			},
			// 签到
			sign_in() {
				if (!this.isLogin) {
					uni.showToast({
						'icon': 'none',
						'title': '请先登录'
					});
					return false;
				}
				uni.navigateTo({
					url: '../mine/children/sign_in',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			jump_theme() {
				let uid = this.verify_islogin();
				if(uid == 0) return;
				uni.navigateTo({
					url: '../mine/children/post_template?name=theme&uid='+uid,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			jump_reply() {
				let uid = this.verify_islogin();
				if(uid == 0) return;
				uni.navigateTo({
					url: '../mine/children/post_template?name=reply&uid='+uid,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			jump_collection() {
				let uid = this.verify_islogin();
				if(uid == 0) return;
				uni.navigateTo({
					url: '../mine/children/post_template?name=collection&uid='+uid,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			jump_golds() {
				if (!this.isLogin) {
					uni.showToast({
						'icon': 'none',
						'title': '请先登录'
					});
					return false;
				}
				uni.navigateTo({
					url: '../mine/children/golds',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			jump_history() {
				if (!this.isLogin) {
					uni.showToast({
						'icon': 'none',
						'title': '请先登录'
					});
					return false;
				}
				uni.navigateTo({
					url: '../mine/children/post_template?name=history',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			jump_setup() {
				uni.navigateTo({
					url: '../mine/children/set_up',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			getStartPosition(event) {
				this.transition_bk = false;
				this.startY = event.touches[0].clientY;
				this.startX = event.touches[0].clientX;
			},
			getMovePosition(event) {
				let clientDistance = event.touches[0].clientY - this.startY;
				let clientXDistance = event.touches[0].clientX - this.startX;
				if(clientDistance > 0 && clientXDistance < clientDistance) {
					let distance = Math.round(clientDistance*0.4);
					if (clientDistance <= 350) {
						this.top_wave_height = this.top_wave_height_start + distance;
					}
					
				}
				
				
			},
			getEndPosition(event) {
				this.transition_bk = true;
				this.top_wave_height = this.top_wave_height_start;
			}
		
		}
	}
</script>

<style lang="scss">
	@import "../../style/color/color.scss";
	page,body, .mine {
		background: #f6f6f6;
		height: 100%;
	}
	.text-muted {
		color: #BBBBBB;
	}
	.color0099ee {
		color: #0099EE;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}

	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
	}

	.color515151 {
		color: #515151;
	}

	.font-13 {
		font-size: 32rpx;
	}

	.cu-list.menu>.cu-item .content {
		line-height: unset !important;
	}

	.center {
		flex-direction: column;
	}
	.top_wave {
		
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		position: relative;
	}
	.top_bak_transition {
		transition: all 140ms ease-in-out;
	}
	
	.logo {
		
		width: 680rpx;
		
		box-sizing: border-box;
		position: absolute;
		top: -76rpx;
		z-index: 12;
		border-radius: 10rpx;
		left: 50%;
		margin-left: -340rpx;
		.logoxl {
			width: 158rpx;
			height: 158rpx;
			border: 2rpx solid #FFFFFF;
			box-sizing: border-box;
		}
		.avatar_box {
			position: absolute;
			top: -210rpx;
			width: 100%;
			
			.sign_btn {
				float: right;
				display: inline-block;
				position: absolute;
				right: -35rpx;
				top: 50rpx;
				padding: 10rpx 20rpx;
				border-radius: 30px 0 0 30px;
				color: #FFFFFF; 
				background: #34adf1;
			}
		}
		.user-name {
			display: block;
			padding: 10rpx 0;
			
			font-size: 38rpx;
			color: #1f1f1f;
		}
		.badge_box image {
			width: 60rpx !important;
			height: 60rpx !important;
		}
		
	}
	
	

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.bg-white {
		background-color: #FFFFFF;
	}

	.information {
		padding-top: 38rpx;
		padding-bottom: 38rpx;
		border-radius: 10rpx;
		text-align: center;
	}

	.splitline {
		width: 2rpx;
		height: 40rpx;
		border-left: 1px solid #ccc;
		margin-top: 16rpx;
	}



	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #F6F6F6;
		border-bottom-style: solid;
	}

	.icon {
		margin-right: 0!important;
		padding-right: 10rpx !important;
		padding-left: 10rpx !important;
	}
	.hr {
		height: 20rpx !important;
	}
	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}

	.cu-list.menu>.cu-item:after {
	    content: "";
	    border-bottom: 0.5px solid #EEEEEE;
	}
</style>
