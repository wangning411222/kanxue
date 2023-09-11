<template>
	<view class="padding padding-top-xl">
		<view class="padding-bottom-xs">旧密码</view>
		<view class="solid-bottom padding-bottom-xs" style="margin-bottom: 30rpx;">
			<input type="password" v-model="password" placeholder="请输入旧密码" placeholder-style="color: #EEEEEE;"/>
		</view>
		<view class="padding-bottom-xs">新密码</view>
		<view class="solid-bottom padding-bottom-xs" style="margin-bottom: 30rpx;">
			<input type="password" v-model="newpassword" placeholder="请输入新密码" placeholder-style="color: #EEEEEE;"/>
		</view>
		<view class="padding-bottom-xs">确认密码</view>
		<view class="solid-bottom padding-bottom-xs" style="margin-bottom: 30rpx;">
			<input type="password" v-model="newpassword2" placeholder="再次输入密码" placeholder-style="color: #EEEEEE;"/>
		</view>
		<view class="padding-top-xl">
			<button type="warn" :disabled="isdisabled" @click="updatePsw">{{ btn_text }}</button>
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
				isdisabled:false,
				btn_text:'确定',
				password:'',
				newpassword:'',
				newpassword2:''
			}
		},
		methods: {
			updatePsw() {
				//修改密码
				//判断
				if(this.password == '') {
					uni.showToast({
						'icon':'none',
						'title':'请输入旧密码'
					});
					return;
				}
				if(this.newpassword == '') {
					uni.showToast({
						'icon':'none',
						'title':'请输入新密码'
					});
					return;
				}
				if(this.newpassword != this.newpassword2) {
					uni.showToast({
						'icon':'none',
						'title':'两次密码不一致'
					});
					return;
				}
				this.isdisabled = true;
				this.btn_text = '正在修改中';
				let _this = this;
				this.$http.post('ucenter/app-password.htm',{
					password:_this.password,
					newpassword:_this.newpassword,
					newpassword2:_this.newpassword2
				}).then(res=> {
					res = res.data;
					if(res.code == 0) {
						_this.btn_text = '确定';
						_this.isdisabled = false;
						uni.showToast({
							'icon':'success',
							'title':'修改成功'
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1000);
					} else {
						uni.showToast({
							'icon':'none',
							'title':res.message
						});
						_this.btn_text = '确定';
						_this.isdisabled = false;
					}
				});
			}
		}
	}
</script>

<style>
</style>
