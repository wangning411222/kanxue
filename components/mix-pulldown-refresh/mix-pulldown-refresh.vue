<template>
	<!-- #ifdef H5	 -->	
	<view 
		class="mix-refresh-content"
		:style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100% - ' + pageTop + 'px)',
				maxHeight: 'calc(100% - ' + pageTop + 'px)'
			}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->
	<!-- #ifndef H5	 -->	
	<view 
		class="mix-refresh-content"
		:style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100vh - ' + pageTop + 'px)',
				maxHeight: 'calc(100vh - ' + pageTop + 'px)'
			}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->

		<view :class="refreshresult ? '':'refreshresultHeight0'" class="refresh_result"><text class="refresh_text">{{ reftext }}</text></view>
		
		<!-- 下拉刷新 -->
		<view class="mix-loading-wrapper">
			<image 
				class="mix-loading-icon" 
				:class="{active: refreshing, ready: refreshReady}" 
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADB0lEQVRYR+WXS2gTURSGvxMtbgp2p/hqLaLQhXZRFAXro6AIggtBUAoqqBtX2qJgMTOTiIiautUqFKELwY0rxSJYUXBVBesDVLQg+FiIqNSFizlybyZpMpkkkwTJoneTcF/nP/85579nhCYPaci+qy5CK44M1ntPYwBS+tAaTsq2OQLAUG6GK9nfMAPh9Ri01BaCbMwdFM+CKAQQXoth3GypDiCloyjTOOJlvQ9AgAGz1c75PCoCZuY8dRA6SMrhSljiAtiBI0vzF82CmA7mOvKs5DZ5atYe4MiR+ABmL84wnwxD8gVXDyGMIvSSlMcRICgx7mo3wnNgH47cxtUlwADCyfDeYgZc7QKGEA4A0wgZfMYQfhjy82GY9fKj/evIyiIvPT0KjKAsRDhojUM7wjg+J3DldW5/dAg83Rsc2ogwgdKF8hJX+ooMldMBT28BvSjvLHPw1jqTlJFwOMrngKqQZgDFqNwim2pCN0mZyl8SBSCl61CeAQngL5ChhQxn5HtULpRjoA9lO4LxeEP+oDCDz2X+kOGi/A6VYZuNMZwtMiTcAe4BkyRlsjoDxisNygs+AeMINxEW4Fs2dgJTKMMkbHxNEo4FhtuBp9Zr4QM+exD2A6vtPhPOkGyXMuDqJhL04HMXV96X0ObqMcQmlbn0V0B1K/AZGMaRTMmZc7rcgvFtHk0UrlfXgajAuboe4TqwNlh+gc9xPHlSqebj5UBad6N0RjJwTVv4xmmUdEDpTxQF2mIxYKrCkfuVGSiXA8oK4AKwLCIHrtpqEXoaz4GsjpevAuUSMwyXVIFh5yuDKKcQy0h21FwFuYNGPoXzEGR6XB1I6xqUVyjzGtEBx0pvrnTqU8LNwBuwWhJTCT3dBdwAzONR/BbkeoDCDPK0+luQoB+1ZdtZ/S34f6/hYsSKmJH2bDOTT5FqhZttSKr3A+HXsq5+IApMSq/g8zOPurD1SrDFHsl1RIUgsvtW4Uh/JR9rU8Km9ISF8JveFYe5nHsfJmEG6vgQCV9RWxJWK9k61psO4B8gtIkwXQKWbwAAAABJRU5ErkJggg==">
			</image>
		</view>
		
		<slot></slot>
		
	</view>
</template>

<script>
	let startY, moveY, windowHeight = 500, platform;
	let timeDiff = 0;
	let touchending;
	export default {
		
		props: {
			top: {
				//距离顶部距离，单位upx
				type: Number,
				default: 0
			},
			reftext:{
				type:String,
				default:  '刷新成功'
			}
		},
		data() {
			return {
				pageDeviation: 0, //下偏移量
				pageTransition: 0, //回弹过渡时间
				refreshReady: false, //进入刷新准备状态
				refreshing: false, // 进入刷新状态
				
				refreshresult: false, // 刷新结果
			};
		},
		computed: {
			pageTop(){
				return uni.upx2px(this.top);
			}
		},
		created(){
			uni.getSystemInfo({
				success: function(e) {
					platform = e.platform;
					windowHeight = e.windowHeight;
				}
			})
		},
		methods: {
			pageTouchstart(e){
				touchending = false;
				this.pageTransition = 0;
				startY = e.touches[0].pageY;
			},
			pageTouchmove(e){
				if(touchending){
					return;
				}
				moveY = (e.touches[0].pageY - startY) * 0.4;
				if(moveY >= 0){
					this.pageDeviation = moveY;
					
					this.$emit('setEnableScroll', false);
				}
				if(moveY >= 50 && this.refreshReady === false){
					this.refreshReady = true;
				}else if(moveY < 50 && this.refreshReady === true){
					this.refreshReady = false;
				}
				if(platform === 'ios' && e.touches[0].pageY > windowHeight + 10){
					this.pageTouchend();
				}
			},
			pageTouchend(){
				touchending = true;
				if(moveY === 0){
					return;
				}
				this.pageTransition = 0.3;
				if(moveY >= 50){
					this.startPulldownRefresh();
				}else{
					this.pageDeviation = 0;
				}
				
				if(this.refreshReady === true){
					this.refreshReady = false;
				}
				//修复下拉一点回弹后页面无法滚动的bug
				this.$emit('setEnableScroll', true);
				startY = moveY = 0;
			},
			//开启下拉刷新
			startPulldownRefresh(){
				if(+new Date() - timeDiff < 100){
					return;
				}
				timeDiff = +new Date();
				this.refreshing = true;
				this.pageDeviation = uni.upx2px(90);
				this.$emit('refresh');
			},
			//结束下拉刷新
			endPulldownRefresh(){
				this.refreshing = false;
				this.pageDeviation = uni.upx2px(0);
				//this.$emit('setEnableScroll', true);
			},
			showrefreshresult(){
				
				let _this = this;
				this.refreshresult = true;
				setTimeout(function(){
					_this.refreshresult = false;
				}, 2000)
			}
		}
	}
</script>

<style>
	.mix-refresh-content{
		display: flex;
		flex-direction: column;
		position: relative;
	}
	/* 下拉刷新部分 */
	.mix-loading-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		transform: translateY(-100%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	
	.mix-loading-icon{
		width: 60upx;
		height: 60upx;
		transition: .3s;
	}
	.mix-loading-icon.ready{
		transform: scaleX(1.3);
	}
	.mix-loading-icon.active{
		animation: loading .5s ease-in infinite both alternate;
	}

	@keyframes loading {
		0% {
			transform: translateY(-20upx) scaleX(1);
		}
		100% {
			transform: translateY(4upx)  scaleX(1.3);
		}
	}
	.refresh_result {
		width: 750rpx;
		height: 30px;
		line-height: 30px;
		
		color: #007aff; 
		background: #c1d2e5; 
		text-align: center; 
		
		
	}
	.refreshresultHeight0 {
		transition: height 200ms ease; 
		height: 0;
		
	}
	.refreshresultHeight0 .refresh_text {
		opacity: 0;
	}
</style>
