<template>
	<view>
		<view style="border-bottom: 1px solid #EEEEEE;"></view>
		<!-- <view class="carousel_view">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" style="height: 200px;">
						<swiper-item v-for="(img,key) in imgUrls" :key="key">
							<image class="img-view" :src="img" mode="aspectFill"  style="height: 100%;" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view> -->
		
		<!-- <view style="padding: 20upx 20upx; font-size: 40upx;">
			<text  style="border-left: 3px solid #0081FF; padding: 0 20upx;">热门活动</text>
			
		</view> -->
		
		<view class="card_list" v-if="item" v-for="(item, index) in list2" :key="index" @tap="jump_active_read(index)">
			<!-- <img class="avatar_img" :src="item.img"> -->
			<image class="avatar_img" :src="item.img" mode="widthFix"></image>
			<view class="card_list_body">
				<view class="card_title text-black margin-bottom-sm">{{ item.title }}</view>
				<view class="card_bottom flex">
					<view class="text-gray margin-right-lg">
						<text class="cuIcon-time margin-right-xs"></text>
						<text>{{ item.desc }}</text>
					</view>
					
					<view class="text-gray text-sm flex-sub" style="text-align: right;">
						<text class="cuIcon-location margin-right-xs"></text>
						<text>{{ item.area }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		components: {},
		data() {
			return {
				imgUrls: [
				
					"../../static/active/20zhou.jpg",
					"../../static/active/ctf_finish.jpg"
				],
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 1000,
				
				active: 0,
				list2: [{
					img:'../../static/active/ctf_finish.jpg',
					title: '2019 KCTF 总决赛',
					desc: '2019年12月1日',
					area: '上海'
				}, {
					img:'../../static/active/20zhou.jpg',
					title: '看雪20周年',
					desc: '2019年12月28日',
					area: '上海'
				}]
			}
		},
		mounted() {
			
			
		},
		methods: {
			verifyResult(e){
				console.log(e);
			},
			jump_active_read(index){
				uni.navigateTo({
					url: '/pages/activity/children/read?id='+index,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang='scss'>

	.card_list {
		width: 100%;
	
		display: flex;
	
		flex-direction: row;
		padding: 20rpx;
		border-bottom: 1px solid #f6f6f6;
		box-sizing: border-box;
	}
	
	.avatar_img {
		width: 260rpx;
		height: 173rpx;
		
		border-radius: 6rpx;
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