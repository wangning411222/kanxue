<template>
	<view class="login" style="line-height: auto;">
		<view class="content">
			
			<!-- 头部logo -->
			<view class="header">
				<text class="cuIcon-close text-grey close" @click="close_login_page()"></text>
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->

			<view class="main" v-bind:style="{display: loginMode == 1 ? 'flex':'none'}">
				
				<wInput
					v-model="account"
					type="text"
					maxlength="18"
					placeholder="手机号 / 用户名 / 邮箱"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="18"
					placeholder="密码"
				></wInput>
				<view class="sunui"  v-if="loginMode == 1">
					<sunui-mverify @change="mverify" ref="sunuiMverify"></sunui-mverify>
				</view>
				
				
			</view>

			<view class="main" v-bind:style="{display: loginMode == 2 ? 'flex':'none'}">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<view class="sunui" v-if="loginMode == 2">
					<sunui-mverify @change="mverify" ref="sunuiMverify"></sunui-mverify>
				</view>
				<wInput
					v-model="verCode"
					type="text"
					maxlength="6"
					placeholder="验证码"
					isShowCode
					codeText="获取验证码"
					ref="runCode"
					@setCode="startVerCode()"
				></wInput>
				
			</view>

			
			<wButton
				:text="loginbtn_text"
				:rotate="isRotate" 
				@click.native="startLogin()"
				
			></wButton>

			
			<view @click="goModeTwo()" class="mode2_text text-grey text-shadow" v-bind:style="{display: loginMode == 1 ? 'block':'none'}">手机验证码登录</view>
			<view @click="goModeOne()" class="mode1_text text-grey text-shadow" v-bind:style="{display: loginMode == 2 ? 'block':'none'}">密码登录</view>
			<!-- 其他登录 -->
			<view class="other_login cuIcon" v-if="isHaveWx">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="loginWeiXin()"></view>
				</view>
				
			<!-- 	<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view> -->
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				
				<text style="font-size: 14px;" @click="goToForget()">找回密码</text>
				<text>|</text>
				<text style="font-size: 14px;" @click="changeReglogText()">{{reglog}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	
	import wInput from '@/components/watch-login/watch-input.vue'; //输入框
	import wButton from '@/components/watch-login/watch-button.vue'; //按钮
	import sunuiMverify from '@/components/sunui-mverify/sunui-mverify.vue';//滑动验证
	import { mapState, mapMutations, mapGetters, mapAction } from 'vuex';
	import {
		getLogin,
		wexinLogin,
		getVerCode,
		getHkCode,
		getAppSid
		
	} from '../../../service/api/login.js' //登录api
	
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage:'data:image/png;base64,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',
				account:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否启动加载
				loginMode: 1,
				verCode:'',
				phoneData: "",
				main_isout: 0,
				loginbtn_text: '登 录',
				reglog: '注册账号',
				isHaveWx: true,
				NECaptchaValidate: ''
				
			};
		},
		computed:{
			...mapState(['appSid', 'isLogin'])
		},
		components:{
			wInput,
			wButton,
			sunuiMverify
		},
		mounted() {
			_this= this;
			if(this.isLogin) {
				uni.reLaunch({
					url: '../../../pages/bbs/bbs',
				})
			}
			_this.$store.dispatch('setAppSidAsync');
			
		},
		onLoad(option) {
			let _this = this;
			// 初始判断登录loginMode
			this.loginMode = option.loginMode;
			if(this.loginMode == 2) {
				this.reglog = '前往登录';
				this.loginbtn_text = '注 册';
				
			} else if(this.loginMode == 1) {
				this.reglog = '注册账号';
				this.loginbtn_text = '登 录';
				
			}
			uni.getProvider({
				service: 'oauth',
				success: (result)=> {
					console.log(result);
					if(~result.provider.indexOf('weixin')) {
						_this.isHaveWx = true;
					}
				},
				fail: (err)=> {
					console.log('获取登录通道失败', error);
				}
			});
			if(typeof this.appSid == 'undefined' || this.appSid == '') {
				getAppSid().then(res=>{
					res = res.data;
					if(res.code == 0) {
						uni.setStorageSync('appSid', res.message);
						_this.$store.dispatch("setAppSidAsync",res.message);
							console.log(this.appSid);
					} else {
						console.log(res.message);
					}
				}).catch(e=>{
					console.log(e);
				});
			}
		},

		
		methods: {
			close_login_page(){
				uni.navigateBack();
			},
			mverify(e){
				
				if(e.msg) {
					//获取校验码。
					
					getHkCode({appsid:this.appSid})
					.then(res=>{
						
						res = res.data;
						let resid = false;
						if(res.code == 0) {
							_this.NECaptchaValidate = res.message;
						} else {
							
							uni.setStorageSync('appSid', '');
							_this.$refs.sunuiMverify.refresh();

							
							_this.$refs.sunuiMverify.refresh();
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.message
							});
						}
						return;
					})
				}
			},
			changeReglogText() {
				
				if(this.reglog == '注册账号') {
					this.reglog = '前往登录';
					this.loginbtn_text = '注 册';
					this.loginMode = 2;
				} else if(this.reglog == '前往登录') {
					this.reglog = '注册账号';
					this.loginbtn_text = '登 录';
					this.loginMode = 1;
				}
			},
			goToForget() {
				uni.showToast({
					'icon':'none',
					'title':'暂未开放'
				})
				return;
				// uni.navigateTo({
				//     url: './forget'
				// });
			},
			goModeOne() {
				this.loginMode = 1;
			},
			goModeTwo() {
				this.reglog = '注册账号';
				this.loginbtn_text = '登 录';
				this.loginMode = 2;
			},
			startVerCode(){
				//开始验证
				if (this.phoneData.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				if(this.NECaptchaValidate == '' || this.appSid == '') {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请先向右拖动滑块'
					});
					return false;
				}
				this.toverCode();
			},
			toverCode() {
				//获取验证码接口
				let postData = {
					'NECaptchaValidate': this.NECaptchaValidate,
					'mobile': this.phoneData,
					'appsid': this.appSid
				};
				console.log(this.appSid);
				getVerCode(postData).then(res=> {
					res = res.data;
					if(res.code == 0) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '发送成功'
						});
						this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
						
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.message
						});
						return;
					}
				}).catch(err=> {
					
				});
				
			},
		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if(this.loginMode == 1) {
					if (this.account.length == "") {
						 uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '用户名不能为空'
						});
						return;
					}
					if (this.passData.length < 1) {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '请输入密码'
						});
						return;
					}
					this.isRotate = true;
					setTimeout(function() {_this.loginPsw();},800);
					
					
				} else if(this.loginMode == 2) {
					if (this.phoneData.length == "") {
						 uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '手机号不能为空'
						});
						return;
					}
					if (this.verCode.length == "") {
						 uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '验证码不能为空'
						});
						return;
					}
					//去登录
					this.loginPho();
					
				}
				
			},
			loginPho() {
				let postData = {
					'mobile': this.phoneData,
					'verifycode': this.verCode
				};
				getLogin(postData, 2)
				.then(res => {
					res = res.data;
					//简单验证下登录（不安全）
					if(res.code == 0){
						let userdata= res.message;
						_this.$store.dispatch("setUserDataAsync",userdata).then(res=> {
							//请求短消息接口
							console.log(uni.getStorageSync('accessToken'));
							_this.isRotate=false
							_this.loginbtn_text = '登 录 成 功';
							setTimeout(function() {
								uni.reLaunch({
									url: '../../../pages/bbs/bbs',
								})
							}, 800);
						}); //存入状态
						
						return;
					}else{
						_this.$refs.sunuiMverify.refresh();
						_this.isRotate=false
						_this.passData=""
						console.log(res);
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '123'
						});
						return;
					}
					//uni.hideLoading();
				}).catch(err => {
					console.log(err)
					let msg = err.errMsg; //错误信息
					uni.showToast({
					    icon: 'none',
						position: 'center',
					    title: '出错啦！'
					});
					_this.isRotate=false
					//uni.hideLoading();
				});
			},
			loginPsw() {
				getLogin({account: _this.account, password: _this.$md5(_this.passData), appsid: this.appSid, NECaptchaValidate:_this.NECaptchaValidate}, 1)
				.then(res => {
					res = res.data;
					//简单验证下登录（不安全）
					if(res.code == 0){
						let userdata= res.message;
						_this.$store.dispatch("setUserDataAsync",userdata).then(res=> {
							//请求短消息接口
							_this.isRotate=false
							_this.loginbtn_text = '登 录 成 功';
							setTimeout(function() {
								uni.reLaunch({
									url: '../../../pages/bbs/bbs',
								})
							}, 800);
						}); //存入状态
								
							
					
						
					}else{
						_this.$refs.sunuiMverify.refresh();
						_this.isRotate=false
						_this.passData=""
						
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.message
						});
						return;
					}
					//uni.hideLoading();
				}).catch(err => {
					console.log(err)
					let msg = err.errMsg; //错误信息
					uni.showToast({
					    icon: 'none',
						position: 'center',
					    title: '出错啦！'
					});
					_this.isRotate=false
					//uni.hideLoading();
				});
				
			},
			loginWeiXin() {
				//微信登录
				this.isRotate = true;
				if(this.isHaveWx) {
					uni.login({
						provider: 'weixin',
						
						success: (res) => {
							console.log('login success:', res);
							
							//微信授权登录
							res = res.authResult;
							getLogin({openid:res.openid, unionid:res.unionid, access_token:res.access_token}, 3)
							.then(res => {
								res = res.data;
								console.log('ok:', res);
								//简单验证下登录（不安全）
								if(res.code == 0){
									let userdata= res.message;
									_this.$store.dispatch("setUserDataAsync",userdata).then(res=> {
										//请求短消息接口
										console.log(uni.getStorageSync('accessToken'));
										_this.isRotate=false
										_this.loginbtn_text = '登 录 成 功';
										setTimeout(function() {
											uni.reLaunch({
												url: '../../../pages/bbs/bbs',
											})
										}, 800);
									}); //存入状态
											
										
								
									
								}else{
									_this.$refs.sunuiMverify.refresh();
									_this.isRotate=false
									_this.passData=""
									
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: res.message
									});
									return;
								}
							// 更新保存在 store 中的登录状态
							//this.login();
							})
							fail: (err) => {
								console.log('login fail:', err);
							}

						},
					})
				}
			}
			
		}
	}
</script>

<style>
	@import url("./css/main.css");
	
</style>
