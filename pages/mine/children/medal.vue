<template>
	<view style="padding: 0 25rpx;">
		<view class="uni-flex uni-row" style="padding: 40rpx 0;">
			<view class="text" style="flex: 1 1 0%;">
				<text>已获勋章</text><text>{{ img_item.length }}</text>枚
			</view>
			<view class="text" style="flex: 1 1 0%; text-align: right;">
				<text class="color0099ee" @click="open_shuoming">勋章规则说明</text>
			</view>
		</view>
		<view class="bg-efefef" style="border-radius: 6rpx;">
	
			<view v-if="img_item.length > 0" class="uni-flex uni-row text-center" style="border-radius: 3px; background-color: #FAFAFA;">

				<view class="flex-item uni-bg-red" v-for="(item, index) in img_item">
					<image :src="item.imgs" style="width: 130rpx; height: 130rpx;" mode=""></image>
				</view>
				
				<!-- <view class="flex-item uni-bg-blue">
					<image src="../../../static/yinyong.png" style="width: 130rpx; height: 130rpx;" mode=""></image>
				</view> -->
			</view>
			<view v-else class="padding-lr-sm padding-tb-sm">
				暂未获得勋章
			</view>
		
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup-content">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="scroll-view-item">
							<view class="">尊敬的看雪会员，</view>
							<view class="indent_2">大家好，我们希望大家能保持探索未知、学习不止的心态，继续在看雪论坛交流、成长。所以特别设置勋章荣誉体系，以此激励大家。</view>
							<view class="indent_2"><text style="font-weight: bold;">看雪CTF勋章</text>：参与看雪CTF 比赛，并荣获一、二、三等奖的会员，均可获得相应的勋章。</view>
							<view class="indent_2"><text style="font-weight: bold;">优秀讲师</text>：通过看雪讲师报名审核，且在看雪课程中开设有课程，学生评价、课程数量、教学质量达到优的讲师，即可获得优秀讲师勋章。</view>
							<view class="indent_2"><text style="font-weight: bold;">优秀版主</text>：认真履行版主职责，为看雪论坛的建设作出卓越贡献的版主，即可获得“优秀版主”勋章。</view>
							<view class="indent_2"><text style="font-weight: bold;">看雪演讲嘉宾</text>：参加安全开发者峰会、走进企业看安全、线下沙龙等由看雪主办的线下活动，并担任演讲嘉宾的会员，可获得“看雪演讲嘉宾”勋章。</view>
					</view>
					
				</scroll-view>
				
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {

				img_item:[],
				
			}
		},
		components: {uniPopup},
		onShow() {
			//获取用户数据
			this.getMyData();
		},
		methods: {
			open_shuoming(){
				this.$refs.popup.open()
			},
			getMyData() {
				let _this = this;
				this.$http.get('bbs/app-ucenter.htm').then(res => {
					//获取数据
					res = res.data;
					if (res.code == 0) {
						let tmpdata = res.message;
						_this.img_item = tmpdata.img_item;
		
					}
					uni.hideLoading();
				}).catch(err=>{
					uni.showToast({
						'icon':'none',
						'title':'网络状况不佳'
					})
				})
			}
		}
	}
</script>
<style>
	.bg-efefef {
		background: #f6f6f6;
	}
	.scroll-Y {
		overflow-y: scroll;
		height: 100%;
	}
	.indent_2 {
		text-indent: 40rpx;
	}
	.popup-content {
		display: block;
		background-color: #fff;
		padding: 15px;
		font-size: 14px;
		width: 600rpx;
		height: 75vh;
		line-height: 46rpx;
		border-radius: 6rpx;
		
	}
	.color0099ee {
		color: #0099ee;
	}
	.uni-flex {
		flex-direction: row;
		flex-wrap: wrap 
	}
	.uni-row {
		width: 100%; 
		display: flex;
	}
	.flex-item {
		
		width: 33.3%;
		padding: 40rpx 0;
	}
</style>