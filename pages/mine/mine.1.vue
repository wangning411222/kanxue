<template>
	<view class="mine">

		<!-- #ifdef APP-PLUS -->
		<view class="status_bar bg-gradual-blues">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		
		
		<view class="bg-gradual-blues top_wave">
			<view class="logo bg-white shadow" style="opacity: 0.9;" @click="goLogin">
				<image class="cu-avatar logoxl round" :src="isLogin ? userInfo.avatar_url : '../../static/mine/user.png'"></image>
				<view class="text-center">
					<view>
						<text v-if="isLogin" class="user-name ">{{ userInfo.username }}</text>
						<text v-else class="user-name ">您未登录<text class="cuIcon-right"></text></text>
					</view>
					<view>
						<view class="badge_box" v-if="img_item.length > 0">
							<image v-bind:key="index" v-for="(item,index) in img_item" class="icon" :src="item.imgs" mode=""></image>
							
							<!-- <text class="cuIcon-more text-gray"></text> -->
						</view>
						<navigator url="../bbs/children/thread?tid=247755" style="height: 60rpx;" v-else>
						暂无勋章
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view style="position: relative; height: 59px; background: #0081ff;">
			<view class="wrap__uc-waves">
				<view class="wave w1"></view>
				<view class="wave w2"></view>
			</view>
		</view>
		
		<view class="flex information bg-white ">
			<view style="flex: 1;" @click="jump_theme">
				<view><text class="font-13">{{ (threads != 0) ? threads:'-' }}</text></view>
				<text class="text-gray font-13">主题帖</text>
			</view>
			<view class="splitline"></view>
			<view style="flex: 1;" @click="jump_reply">
				<view><text class="font-13">{{ (posts != 0) ? posts:'-' }}</text></view>
				<text class="text-gray font-13">回帖</text>
			</view>
			<view class="splitline"></view>
			<view style="flex: 1;" @click="jump_collection">
				<view><text class="font-13">{{ (favors != 0) ? favors:'-' }}</text></view>
				<text class="text-gray font-13">收藏</text>
			</view>
			<view class="splitline"></view>
			<view style="flex: 1;">
				<view><text class="font-13">{{ (golds != 0) ? golds:'-' }}</text></view>
				<text class="text-gray font-13">雪币</text>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="sign_in">
				<view class="content">
					<image class="icon" src="../../static/mine/signin.png" mode=""></image>
					<text class="color515151 font-13">签到</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="jump_history">
				<view class="content">
					<image class="icon" src="../../static/mine/history.png" mode=""></image>
					<text class="color515151 font-13">浏览记录</text>
				</view>
			</view>
		</view>
		<view class="hr"></view>
		<view class="cu-list menu sm-border">

			<view class="cu-item arrow" @click="jump_setup">
				<view class="content">
					<image class="icon" src="../../static/mine/setup.png" mode=""></image>
					<text class="color515151 font-13">设置</text>
				</view>
			</view>


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
				img_item:[]
			}
		},
		computed: {
			...mapState(['isLogin', 'userInfo'])
		},
		onShow() {
			//获取用户数据
			this.getMyData();
		},
		mounted() {
			
		},
		methods: {
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

					}
				})
			},
			goLogin() {
				//登录
				if (!this.isLogin) {
					console.log("点击前往登录")
					uni.navigateTo({
						url: '../mine/children/login',
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
			}
		}
	}
</script>

<style lang="scss">
	@import "../../style/color/color.scss";

	.bg-gradual-blues {
		background: #0081ff;

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

	.icon {
		width: 42rpx !important;
		height: 42rpx !important;
		padding-right: 16rpx;
		vertical-align: sub !important;
	}



	.center {
		flex-direction: column;
	}

	.logo {
		width: 650upx;
		// height: 360upx;
		padding: 79upx 36upx 62upx;
		box-sizing: border-box;
		
		position: absolute;
		top: 180rpx;
		z-index: 12;
		border-radius: 10rpx;
		left: 50%;
		margin-left: -325rpx;
		.logoxl {
			width: 158upx;
			height: 158upx;
			border: 2upx solid #FFFFFF;
			box-sizing: border-box;
		}
		.cu-avatar {
			position: absolute;
			top: -79upx;
			left: 50%;
			
			margin-left: -79upx;
		}
		.user-name {
			display: block;
			padding: 10rpx 0;
			
			font-size: 38upx;
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
		padding-top: 130rpx;
		padding-bottom: 30rpx;

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



	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}


	.top_wave {
		position: relative;
		height: 250rpx;
	}
	/*css3波纹*/
	.wrap__uc-waves {
		overflow: hidden;
		height: 59px;
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.wrap__uc-waves .wave {
		width: 1920px;
		transform-origin: center bottom;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.wrap__uc-waves .w1 {
		
		background: url(../../static/mine/wave_01.png) no-repeat;
		background-size: 75.3% auto;
		background-position-y: bottom;
		height: 59px;
		z-index: 10;
		animation: anim_wave 6s linear infinite;
	}

	.wrap__uc-waves .w2 {
		background: url(../../static/mine/wave_02.png) no-repeat;
		background-size: 100% auto;
		background-position-y: top;
		height: 40px;
		animation: anim_wave 10s linear infinite;
	}

	@keyframes anim_wave {
		0% {
			transform: translateX(0);
		}

		50% {
			transform: translateX(-25%);
		}

		100% {
			transform: translateX(-50%);
		}
	}
</style>
