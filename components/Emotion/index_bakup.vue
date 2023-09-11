<template>
	<view class="emotion-box" :style="'height:' + height + 'px;bottom:'+bottom+'px;'">
		<view class="emotion-box-line" v-for="(line, i) in list" :key="i">
			<view class="emotion-item" v-for="(item, index) in line" :key="index" @click="clickHandler(item)">
		<rich-text :nodes="item.toString().replace(/^([1-9]\d?|97)$/g, emotion(item))"></rich-text> 
			</view>
		</view>
		<view class="empty_seat">
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: Number,
				default: 200
			},
			bottom: {
				type: Number,
				default: 48
			}
		},

		data() {
			return {
				list: [
					[1,2,3,4,5,6,7],
					[8,9,10,11,12,13,14],
					[15,16,17,18,19,20,21],
					[22,23,24,25,26,27,28],
					[29,30,31,32,33,34,35],
					[36,37,38,39,40,41,42],
					[43,44,45,46,47,48,49],
					[50,51,52,53,54,55,56],
					[57,58,59,60,61,62,63],
					[64,65,66,67,68,69,70],
					[71,72,73,74,75,76,77],
					[78,79,80,81,82,83,84],
					[85,86,87,88,89,90,91],
					[92,93,94,95,96,97]
				],
				item: []
			}
		},

		methods: {
			
			clickHandler(i) {
				
				let emotion = `[em_${i}]`
				
				this.$emit('emotion', emotion)
			},
			emotion(res) {
				const list = Array.from({length:100}, (v,k) => k)
				let index = list.indexOf(res)
				return `<img src="http://bbs.kanxue.cn/view/img/face/${index}.gif" align="middle">`
			}
		}
	}
</script>

<style scoped>
	.emotion-box {
		
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		padding-top: 38upx;
		padding-left:10upx;
		padding-right: 10upx;
		overflow: hidden;
		overflow-y: auto;
		position:fixed;
		background: white;
	}
	
						
	.emotion-box-line {
		display: flex;
	}

	.emotion-item {
		flex: 1;
		text-align: center;
		cursor: pointer;
	}
</style>
