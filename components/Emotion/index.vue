<template>
	<view class="emotion-box">
	<swiper class="swiper" disable-programmatic-animation="true" :style="'height:'+height+'px;'" indicator-dots="true">
		<swiper-item class="">
			<view v-for="(line, i) in list1" :key="i" class="flex">
				<view v-for="(im, ix) in line" :key="ix" class="swiper-item flex-sub text-center" style="display: inline-block; box-sizing: border-box; padding-bottom: 20rpx;" @click="clickHandler(im)">
					<image :src="'/static/face/'+im+'.jpg'" style="width: 55rpx; height: 55rpx;">
				</view>
			</view>
		</swiper-item>
		<swiper-item class="">
			<view v-for="(line, i) in list2" :key="i" class="flex">
				<view v-for="(im, ix) in line" :key="ix" class="swiper-item flex-sub text-center" style="display: inline-block; box-sizing: border-box; padding-bottom: 20rpx;" @click="clickHandler(im)">
					<image :src="'/static/face/'+im+'.jpg'" style="width: 55rpx; height: 55rpx;">
				</view>
			</view>
		</swiper-item>
		<swiper-item class="">
			<view v-for="(line, i) in list3" :key="i" class="flex">
				<view v-for="(im, ix) in line" :key="ix" class="swiper-item flex-sub text-center" style="display: inline-block; box-sizing: border-box; padding-bottom: 20rpx;" @click="clickHandler(im)">
					<image :src="'/static/face/'+im+'.jpg'" style="width: 55rpx; height: 55rpx;">
				</view>
			</view>
		</swiper-item>
		<swiper-item class="">
			<view v-for="(line, i) in list4" :key="i" class="flex">
				<view v-for="(im, ix) in line" :key="ix" class="swiper-item flex-sub text-center" style="display: inline-block; box-sizing: border-box; padding-bottom: 20rpx;" @click="clickHandler(im)">
					<image :src="'/static/face/'+im+'.jpg'" style="width: 55rpx; height: 55rpx;">
				</view>
			</view>
		</swiper-item>
		<swiper-item class="">
			<view v-for="(line, i) in list5" :key="i" class="flex">
				<view v-for="(im, ix) in line" :key="ix" class="swiper-item flex-sub text-center" style="display: inline-block; box-sizing: border-box; padding-bottom: 20rpx;" @click="clickHandler(im)">
					<image :src="'/static/face/'+im+'.jpg'" style="width: 55rpx; height: 55rpx;">
				</view>
			</view>
		</swiper-item>
	</swiper>
	</view>
</template>

<script>
	import Config from '@/config.js'
	export default {
		props: {
			height:0
		},

		data() {
			return {
				list1: [
					[1,2,3,4,5,6],
					[7,8,9,10,11,12],
					[13,14,15,16,17,18],
					[19,20,21,22,23,98]
				],
				list2:[
					[25,26,27,28,29,30],
					[31,32,33,34,35,36],
					[37,38,39,40,41,42],
					[43,44,45,46,47,98]
				],
				list3:[
					[49,50,51,52,53,54],
					[55,56,57,58,59,60],
					[61,62,63,64,65,66],
					[67,68,69,70,71,98]
				],
				list4:[
					[73,74,75,76,77,78],
					[79,80,81,82,83,84],
					[85,86,87,88,89,90],
					[91,92,93,94,95,98]
				],
				list5:[
					[24,48,72,96,97,98]
					
				],
				item: [],
				img_width:0
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.emotion-box').boundingClientRect(data => {
				console.log(data.width / 10);
				this.img_width = data.width / 10;
			}).exec();
		},
		methods: {
			
			clickHandler(i) {

				let emotion = `[em_${i}]`
				
				this.$emit('emotion', emotion);
				
				
			},
			emotion(res) {
				
				const list = Array.from({length:100}, (v,k) => k)
				let index = list.indexOf(res)
				return `<image src="${Config.WWW_DOMAIN}view/img/face/${index}.gif" align="middle">`
				//return `<img src="/static/face/${index}.gif" align="middle">`
				//return `<img src="/static/mine/history.png" align="middle">`
				
			}
		}
	}
</script>

<style scoped>
	.emotion-box {
		
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		padding-top: 8upx;
		overflow: hidden;
		background: white;
	}
					
	.emotion-box-line {
		display: flex;
	}

	.emotion-item {
		flex: 1;
		text-align: center;
		cursor: pointer;
		padding:10upx;
	}
</style>
