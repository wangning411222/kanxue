<template>
	<view>
		<!-- padding-lr-lg padding-tb-lg -->
		<view class="padding-tb-lg">
			<view style="margin: 0 auto; width: 692rpx; position: relative;">
				<!-- <img src="../../../static/mine/signin_bg.png" style="width: 692rpx; height:  190rpx;" alt=""> -->
				<image src="../../../static/mine/signin_bg.png" mode="widthFix" style="width: 692rpx; height:  190rpx;"></image>
				<view class="text-white" style="position: absolute; top: 13px; left: 30rpx;">
					<view style="padding-bottom: 10rpx;">
						<span style="font-size: 60rpx;">+</span>
						<span style="padding: 0 10rpx; font-size: 60rpx; vertical-align: sub;">{{ add_golds }}</span>
						<span style="">雪币</span>
					</view>
					<view>累计签到<text style="color: #ffc107;"> {{ total_count }}</text> 次<text class="margin-lr-xs">|</text>连续签到<text style="color: #ffc107;">{{ continue_sum }}</text>天</view>
				</view>
			</view>
		</view>
		
		<fl-signin 
		    :date="date" 
		    :list="list" 
		    @signin_fun="signin_fun" 
		    :repair="repair" 
		    :rule="rule" 
		    @repair_fun="repair_fun" 
		    :choose_date="choose_date" 
		    @date_change="date_change"
		></fl-signin>
	</view>
</template>

<script>
	import flSignin from "@/components/fl-signin/fl-signin"
	export default {
		components: {
			flSignin
		},
		data() {
			return {
				// 是否可以选择日期
				choose_date: false,
				// 当前日期
				date: new Date().getFullYear()+"-"+(new Date().getMonth()+1),
				// 签到成功列表
				list: [],
				// 是否开启补签
				repair: false,
				// 是否开启补签规则
				rule: false,
				total_count: 0,
				golds:0,
				issignin:0,
				continue_sum:0,
				add_golds: 0
			}
		},
		onLoad() {
			this.signinread();
		},
		methods: {
			signinread() {
				let _this = this;
				_this.$http.get('bbs/app-signinread.htm').then(res=>{
					res = res.data;
					if(res.code == 0) {
						_this.golds = res.message.golds;
						_this.list = res.message.history || [];
						_this.total_count = Number(res.message.totalcount) || 0;
						_this.issignin = res.message.issignin;
						_this.continue_sum = res.message.continue || 0;
					}
				})
			},
			// 签到时触发
			signin_fun(resday) {
				let _this = this;
				
				_this.$http.post('bbs/app-is_signin.htm', {}).then(res=>{
					res = res.data;
					
					if(res.code == 0) {
						_this.$http.post('bbs/app-signin.htm', {}).then(res=>{
							res = res.data;
							if(res.code == 0) {
								_this.add_golds = res.message;
								return;
							} else {
								
								return;
							}
						}) 
					} else {
						_this.$http.post('bbs/app-signin.htm', {}).then(res=>{
							res = res.data;
							if(res.code == 0) {
								
								uni.showToast({
								    title: "签到成功,获取"+res.message+"雪币",
								    icon: "none",
								    success: function(){
									_this.add_golds = res.message;
									_this.list.push(resday.year_month_day);
									_this.total_count = _this.total_count + 1;
									_this.continue_sum = _this.continue_sum + 1;
								    }
								})
	
							} else {
								uni.showToast({
								    title: res.message,
								    icon: "none"
								})
							}
						})
					}
				})
			},
			// 补签成功时触发
			repair_fun(res) {
				this.list.push(res.day)
				uni.showToast({
				    title: "补签成功",
				    icon: "none"
				})
			},
			// 当月份改变时触发
			date_change(date) {
				// 更新当前日期
				this.date = date;
				// 更新签到列表
				this.list = ["01", "02"];
			},
		}
	}
</script>

<style lang="scss">
	
</style>
