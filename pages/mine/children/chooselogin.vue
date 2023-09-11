<template>
	<view>
		<view class="bg_arc">
			<view class="logo_box">
				<img src="../../../static/mine/logo.png" alt="">
			</view>
		</view>
		<view class="zhanwei"></view>
		<view style="padding: 70rpx;">
			<button type="primary" style="margin-bottom: 50rpx; background: #0099ee; border-radius: 0;">
				<svg t="1578887927331" class="icon" style="width: 40rpx; height: 40rpx; vertical-align: middle; fill: currentcolor; overflow: hidden; font-size: 32px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1935" width="32" height="32"><path d="M514.553 814.817c-28.167 0-51.083 22.914-51.083 51.084 0 28.167 22.916 51.084 51.083 51.084 28.169 0 51.086-22.915 51.086-51.084-0.001-28.17-22.917-51.084-51.086-51.084z" fill="#ffffff" p-id="1936"></path><path d="M767.288 10.74H261.82c-42.523 0-77.118 34.595-77.118 77.118v848.284c0 42.524 34.595 77.118 77.118 77.118h505.467c42.523 0 77.117-34.594 77.117-77.118V87.858c0.001-42.523-34.593-77.118-77.116-77.118zM261.82 62.153h505.467c14.175 0 25.707 11.533 25.707 25.707v635.529H236.115V87.859c0-14.174 11.532-25.706 25.706-25.706z m505.468 899.693H261.82c-14.174 0-25.707-11.531-25.707-25.706V779.199h556.88v156.942c0.001 14.175-11.531 25.705-25.706 25.705z" fill="#ffffff" p-id="1937"></path></svg>
				<span style="padding: 5rpx;"></span>
				<span style="font-size: 28rpx;">手机号登录</span>
			</button>
			
			<button type="primary" plain="true" style="margin-bottom: 50rpx; border-color: #0099EE; color: #0099EE; border-radius: 0;">
				<svg t="1578887999873" class="icon" style="width: 40rpx; height: 40rpx; vertical-align: middle; fill: currentcolor; overflow: hidden; font-size: 32px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2906" width="32" height="32"><path d="M822.994944 382.206976l-78.337024 0 0-97.92c0-129.585152-105.418752-235.014144-235.015168-235.014144-129.593344 0-235.01312 105.428992-235.01312 235.014144l0 97.92-78.337024 0c-32.398336 0-58.753024 26.35776-58.753024 58.753024l0 470.018048c0 32.39936 26.355712 58.754048 58.753024 58.754048l626.702336 0c32.398336 0 58.754048-26.354688 58.754048-58.754048L881.748992 440.96C881.748992 408.564736 855.392256 382.206976 822.994944 382.206976zM313.798656 284.286976c0-107.993088 87.863296-195.846144 195.844096-195.846144 107.981824 0 195.844096 87.853056 195.844096 195.846144l0 97.92L313.798656 382.206976 313.798656 284.286976zM842.579968 910.978048c0 10.806272-8.779776 19.586048-19.585024 19.586048L196.292608 930.564096c-10.795008 0-19.585024-8.779776-19.585024-19.586048L176.707584 440.96c0-10.795008 8.790016-19.582976 19.585024-19.582976l626.702336 0c10.805248 0 19.585024 8.787968 19.585024 19.582976L842.579968 910.978048z" p-id="2907" fill="#0099ee"></path><path d="M509.642752 578.05312c-32.454656 0-58.752 26.297344-58.752 58.750976 0 17.339392 7.648256 32.764928 19.584 43.510784l0 54.414336c0 21.629952 17.539072 39.168 39.168 39.168 21.630976 0 39.171072-17.538048 39.171072-39.168l0-54.414336c11.931648-10.745856 19.582976-26.172416 19.582976-43.510784C568.3968 604.350464 542.099456 578.05312 509.642752 578.05312z" p-id="2908" fill="#0099ee"></path></svg>
				<span style="padding: 5rpx;"></span>
				<span style="font-size: 28rpx;">账号密码登录</span>
				
			</button>
			<view style="text-align: center;">
				<span style="color: #CCCCCC; font-size: 22rpx;" @click="logon_fun">还没有账号？立即注册</span>
			</view>
		</view>
		<!-- 其他登录 -->
		<view class="other_login cuIcon" v-if="isHaveWx">
			<view class="login_icon">
				<view class="cuIcon-weixin" @tap="loginWeiXin()"></view>
			</view>
			
		<!-- 	<view class="login_icon">
				<view class="cuIcon-github" @tap="login_github"></view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			logon_fun:() => {
				uni.navigateTo({
				    url: '/pages/mine/children/login?loginMode=2'
				});
			}
		}
	}
</script>

<style>
	page,body {
		background: #FFFFFF;
	}
	.bg_arc {
		width: 1920px;
		/* height: 5300px; */
		height: 9600rpx;
		position: absolute;
		/* top: -5100px; */
		top: -9240rpx;
		left: 50%;
		margin-left: -960px;
		background: #0099ee;
		border-bottom-right-radius: 100%;
		border-bottom-left-radius: 100%;
		   
	}
	.zhanwei {
		height: 450rpx;
	}
	.logo_box {
		
		padding: 20rpx;
		position: absolute;
		bottom: -60rpx;
		left: 50%;
		margin-left: -70rpx;
		
		background: #FFFFFF;
		
		border-radius: 15px;
		box-shadow: 0 0px 5px rgba(0, 153, 238, 0.39);
	}
	.logo_box img {
		width: 100rpx;
		
	}
</style>
