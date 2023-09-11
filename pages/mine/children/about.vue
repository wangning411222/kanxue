<template>
	<view>
		<view class="text-center padding-top-xl">
			<view class="padding">
				<image src="https://www.kanxue.com/view/img/newhome3/kanxuelogo.png" mode="aspectFit" style="width: 300rpx; height: 100rpx;" /></image>
			</view>
			<view>
				<text class="text-bold">看雪学院</text>
			</view>
			<view>
				<text>Version {{version}}</text>
			</view>
			
		</view>
		<view class="padding-top-xl">
			<view class="cu-list menu sm-border">
				<!-- <view class="cu-item arrow" @click="sign_in">
					<view class="content">
						<text class="color515151 font-13">《用户协议》</text>
					</view>
				</view> -->
				<view class="cu-item arrow" @click="bbs_standard">
					<view class="content">
						<text class="color515151 font-13">《社区规范》</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="bbs_privacy">
					<view class="content">
						<text class="color515151 font-13">《隐私条款》</text>
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
	export default {
		data(){
			return {
				year: 0,
				version:""
			}
		},
		mounted(){
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,function(inf){  
				_this.version=inf.version //赋值版本号
			});  
			//#endif
		},
		onLoad() {
			let d = new Date();
			this.year = d.getFullYear();
		},
		methods:{
			bbs_privacy() {
				uni.navigateTo({
					url:'../../bbs/children/thread?tid=255489'
				})
			},
			bbs_standard() {
				uni.navigateTo({
					url:'../../bbs/children/thread?tid=71978'
				})
			}
		}
	}
</script>

<style>
</style>
