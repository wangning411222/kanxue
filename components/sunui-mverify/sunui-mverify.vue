<template name='sunui-mverify'>
	<view class="sunui-slider">
		<text style="color: #BBBBBB;">{{ hint }}</text>
		<view class='sunui-slider-bg' :style="{left:-(w + 2)+'px',transform:cssAnimation}">
			<text style="color: #FFFFFF;">{{ succeedMsg }}</text>
			<view class='sunui-slider-box' @touchmove='moveStart' @touchend='moveEnd'>
				<text :class="[isVerify?'cuIcon-safe':'cuIcon-roundright']"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hint: '右滑验证',
				sysW: uni.getSystemInfoSync().windowWidth,
				xAxial: 25,
				x: 0,
				w: (uni.getSystemInfoSync().windowWidth * 0.8) - 50,
				cssAnimation: 'translate3d(25px, 0, 0)',
				succeedMsg: '',
				pullStatus: true,
				isVerify: false
			}
		},
		name: 'sunui-mverify',
		methods: {
			moveStart(e) {
				if (this.pullStatus) {
					this.x = e.changedTouches[0].clientX - ((this.sysW * 0.1) + 25);
					this.x >= this.w ? this.xAxial = this.w : this.xAxial = this.x;
					if (this.x < 25) this.xAxial = 25;
					this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
					this.cssAnimation = this.cssAnimation
					this.succeedMsg = '验证中...';
				}
			},
			refresh() {
				this.hint = '右滑验证';
				this.sysW = uni.getSystemInfoSync().windowWidth;
				this.xAxial = 25;
				this.x = 0;
				this.w = (uni.getSystemInfoSync().windowWidth * 0.8) - 50;
				this.cssAnimation =  'translate3d(25px, 0, 0)';
				this.succeedMsg = '';
				this.pullStatus = true;
				this.isVerify = false;
				
			},
			moveEnd() {
				let tag;
				if (this.x >= this.w) {
					this.xAxial = this.w;
					this.succeedMsg = '验证成功';
					tag = true;
					this.pullStatus = false;
					this.isVerify = true;
				} else {
					this.xAxial = 25;
					this.succeedMsg = '';
					tag = false;
					this.isVerify = false;
				}
				this.$emit('change', {
					msg: tag
				});
				
				this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
				this.succeedMsg = this.succeedMsg;
				this.cssAnimation = this.cssAnimation;
			}
		}
	}
</script>

<style>
	/* @import url("iconfont"); */

	.sunui-slider {
		position: relative;
		overflow: hidden;
		
		margin: 0 auto;
		border: 1px solid #EEEEEE;
		font-size: 32upx;
		text-align: center;
		margin-bottom: 44upx;
		background: #EEEEEE;
		
		border-radius: 0;
		height: 40px;
		width: 100%;
		line-height: 40px;
	}

	.sunui-slider-bg {
		position: absolute;
		overflow: hidden;
		top: 0;
		width: 101%;
		height: 40px;
		line-height: 40px;
		background-color: #0099EE;
		/* border-radius: 5px; */
		color: #CCCCCC;
	}

	.sunui-slider-box {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 40px;
		background-color: #FFFFFF;
	}
</style>
