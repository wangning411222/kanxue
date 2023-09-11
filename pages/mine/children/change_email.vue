<template>
	<view class="padding padding-top-xl">
		<!-- 如果已经绑定 -->
		<view class="padding-bottom">验证码将发送到邮箱 6****@qq.com</view>
		<view class="flex padding-top padding-bottom-xs solid-bottom">
			<view class="flex-sub">
				<input type="number" value="" placeholder="请输入验证码" placeholder-style="color: #EEEEEE;"/>
			</view>
			<view style="color: #007AFF">
				发送验证码
			</view>
		</view>
		<view class="padding-top-xl">
			<button type="warn">解绑</button>
		</view>
		
		
		<!-- 如果没有绑定 -->
		
		<view class="padding-bottom">
			<input type="number" value="" placeholder="绑定邮箱" placeholder-style="color: #EEEEEE;"/>
		</view>
		<view class="flex padding-top padding-bottom-xs solid-bottom">
			<view class="flex-sub">
				<input type="number" value="" placeholder="请输入验证码" placeholder-style="color: #EEEEEE;"/>
			</view>
			<view style="color: #007AFF">
				发送验证码
			</view>
		</view>
		<view class="padding-top-xl">
			<button type="warn">绑定</button>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
