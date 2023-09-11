<template>
	<view class="padding-top-sm">
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="change_phone_number">
				<view class="content flex">
					<text class="font-13">修改手机号</text>
					<text class="text-sm text-gray text-right flex-sub">暂未开放</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="change_password">
				<view class="content">
					<text class="font-13">修改密码</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="change_email">
				<view class="content flex">
					<text class="font-13">邮箱</text>
					<text class="text-sm text-gray text-right flex-sub">暂未开放</text>
				</view>
			</view>
	
		</view>
		<!-- <view class="hr"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="change_wechat">
				<view class="content flex">
					<text class="font-13">微信</text>
					<text class="text-sm text-gray text-right flex-sub">com</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data(){
			return {
				year: 0
			}
		},
		onLoad() {
			let d = new Date();
			this.year = d.getFullYear();
		
		},
		methods:{

			change_phone_number(){
				uni.showToast({
					'icon':'none',
					'title':'暂未开放'
				});
				return;
				// uni.navigateTo({
				// 	url: './change_phone_number',
				// 	animationType: 'pop-in',
				// 	animationDuration: 200
				// });
			},
			change_password(){
				uni.navigateTo({
					url: './change_password',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			change_email(){
				uni.showToast({
					'icon':'none',
					'title':'暂未开放'
				});
				return;
				uni.navigateTo({
					url: './change_email',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			change_wechat(){
				uni.navigateTo({
					url: './change_wechat',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
		}
	}
</script>

<style>
</style>
