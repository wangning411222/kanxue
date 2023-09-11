<template>
	<view class="login">
		<view class="content">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!--  #endif -->
			<view class="bg_arc" style="height: 300rpx;">
				<view class="logo_box" style="bottom: -150rpx;">

					<image src="../../../static/mine/logo.png" mode="widthFix" style="width: 100rpx; height: 100rpx;"></image>
				</view>
				<view class="back_bbs" @click="back_bbs">
					<span  class="iconfont icon-guanbi" style="font-size: 40rpx; vertical-align: middle;"></span>
				</view>
			</view>
			<view>
				<image src="../../../static/mine/yuanhu.png" mode="scaleToFill" style="width: 100%; height: 100rpx;"></image>
				
			</view>
			
			<!-- 主体表单 -->
			
			<view class="main" v-if="loginMode == 0">
				<button type="primary" @click="logon_fun(2)" style="width: 100%; margin-bottom: 50rpx; background: #0099ee; border-radius: 3px;">
					<span  class="iconfont icon-shouji1" style="font-size: 40rpx; vertical-align: middle;"></span>
					<span style="font-size: 28rpx;">手机号登录</span>
				</button>
				
				<button type="primary" @click="logon_fun(1)" plain="true" style="width: 100%; margin-bottom: 50rpx; border-color: #0099EE; color: #0099EE; border-radius: 3px;">
					<span  class="iconfont icon-suo1" style="font-size: 40rpx; vertical-align: middle;"></span>
					<span style="font-size: 28rpx;">账号密码登录</span>
					
				</button>
				<view style="text-align: center;">
					<span style="color: #CCCCCC; font-size: 25rpx;" @click="logon_fun(3)">还没有账号？立即注册</span>
				</view>
				<view style="text-align: center; margin-top: 80rpx; margin-bottom: 40rpx;">
					<span class="division_line"> or </span>
				</view>
				<view class="cuIcon" v-if="isHaveWx">
					<view class="login_icon" style="text-align: center;">
						<span class="iconfont icon-wechat" style="font-size: 80rpx; color: #DDDDDD; vertical-align: middle;" @tap="loginWeiXin()"></span>
					</view>
				</view>
				<view style="text-align: center; margin-top: 40rpx;">
					<span style="color: #CCCCCC; font-size: 25rpx;" @click="getVersionData">检查版本</span>
				</view>
			</view>
			<view class="main" v-if="loginMode == 1">
				<view class="uni-flex uni-row">
					<view class="uni-bg-red" style="line-height: 40px; ">
						<span  class="iconfont icon-ren1" style="font-size: 45rpx; color: #0099ee; vertical-align: middle;"></span>
					</view>				
					<view class="flex-item uni-bg-green">
						<wInput
							v-model="account"
							type="text"
							maxlength="18"
							placeholder="手机号 / 用户名 / 邮箱"
						></wInput>
					</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="uni-bg-red" style="line-height: 40px; ">
						<span  class="iconfont icon-suo1" style="font-size: 50rpx; color: #0099ee; vertical-align: middle;"></span>
					</view>
					<view class="flex-item uni-bg-green">
						<wInput
							v-model="passData"
							type="password"
							maxlength="18"
							placeholder="密码"
						></wInput>
					</view>
				</view>
				
				<view class="sunui">
					<sunui-mverify @change="mverify" ref="sunuiMverify"></sunui-mverify>
				</view>
				
				
			</view>

			<view class="main" v-if="loginMode == 2">
				<view class="uni-flex uni-row">
					<view class="uni-bg-red" style="line-height: 40px; ">
						<span  class="iconfont icon-shouji1" style="font-size: 50rpx; color: #0099ee; vertical-align: middle;"></span>
					</view>
					<view class="flex-item uni-bg-green">
						<wInput
							v-model="phoneData"
							type="text"
							maxlength="11"
							placeholder="请输入手机号码"
						></wInput>
					</view>
				</view>
				
				<view class="sunui">
					<sunui-mverify @change="mverify" ref="sunuiMverify"></sunui-mverify>
				</view>
				<view class="uni-flex uni-row">
					<view class="uni-bg-red" style="line-height: 40px; ">
						<span  class="iconfont icon-suo1" style="font-size: 50rpx; color: #0099ee; vertical-align: middle;"></span>
					</view>
					<view class="flex-item uni-bg-green">
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
				</view>
				
			</view>
			<view class="main" v-if="loginMode == 3">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<view class="sunui">
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
			<view class="main2" v-if="loginMode != 0">
				<wButton
					:text="loginbtn_text"
					:rotate="isRotate" 
					@click.native="startLogin()"
					
				></wButton>

				
				<!-- <view @click="goModeTwo()" class="mode2_text text-gray text-shadow" v-bind:style="{display: loginMode == 1 ? 'block':'none'}">手机验证码登录</view> -->
				<!-- <view @click="goModeOne()" class="mode1_text text-gray text-shadow" v-bind:style="{display: loginMode == 2 ? 'block':'none'}">密码登录</view> -->
				<!-- 其他登录 -->
				<!-- <view class="other_login cuIcon" v-if="isHaveWx">
					<view class="login_icon">
						<view class="cuIcon-weixin" @tap="loginWeiXin()"></view>
					</view>
				</view>
				 -->
				<!-- 底部信息 -->
				<view v-if="loginMode != 3" style="margin-top: 15rpx;color: #AAAAAA;">
					
					<text style="font-size: 14px;" @click="goToForget('https://passport.kanxue.com/user-findpw.htm')">找回密码</text>
					<!-- <text>|</text> -->
					<!-- <text style="font-size: 14px;" @click="changeReglogText()">{{reglog}}</text> -->
				</view>
			</view>
			<view class="hint">
				<checkbox-group @change="checkboxChange">
				<label>
					<checkbox value="1" style="transform:scale(0.7)"/>
				</label>
				登录代表同意
				<navigator url="/pages/mine/children/about" style="display: inline-block;">
					<text class="link">用户协议、</text>
				</navigator>
				<navigator url="/pages/mine/children/about" style="display: inline-block;">
					<text class="link">隐私政策</text>
				</navigator>
					
					
				</checkbox-group>
				
			</view>
		</view>
		<!-- 检测版本 -->
		<view class="cu-modal" :class="versionShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">有新版本更新</view>
					<view class="action" @tap="loginOutHide">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定下载？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-black" @tap="loginOutHide">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="isDownload">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	var _this;
	import { getVersion } from '../../../service/api/version.js' //版本api
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
				NECaptchaValidate: '',
				versionShow: false,
				version: "",//版本号
				vDownUrl: "",
				wxCode:"",
				xieyi:''
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
			
			if(this.loginMode == 0) {
				this.reglog = '注册账号';
				this.loginbtn_text = '登 录';
				
			} else if(this.loginMode == 1) {
				this.reglog = '注册账号';
				this.loginbtn_text = '登 录';
				
			} else if(this.loginMode == 2) {
				this.reglog = '注册账号';
				this.loginbtn_text = '登 录';
				
			} else if(this.loginMode == 3) {
				this.reglog = '前往登录';
				this.loginbtn_text = '注 册';
				
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
		onBackPress(event){
			console.log(event);
			if (event.from === 'backbutton' || event.from === 'navigateBack') {
				uni.switchTab({
					url: '/pages/bbs/bbs'
				});
				
				return true;  
			}
			return true;  
		},
		
		methods: {
			checkboxChange: function (e) {
				console.log(e.detail.value);
				this.xieyi = e.detail.value
			},
			loginOutHide(){
				
				//版本下载取消
				this.versionShow=false
			},
			isDownload(){
				var _this=this
				_this.loginOutHide()
				//下载更新包 整包下载（浪费 不推荐）
				console.log(_this.vDownUrl)
				var wgtUrl=_this.vDownUrl;
				
				var downToak=plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){  
					if ( status == 200 ) {   
						console.log("下载App成功："+d.filename);  
						plus.nativeUI.showWaiting("安装中...");  
						plus.runtime.install(d.filename,{},function(){  
							plus.nativeUI.closeWaiting();  
							console.log("安装成功！");  
							plus.nativeUI.alert("应用资源更新完成！",function(){  
								plus.runtime.restart();  
							});  
						},function(e){  
							plus.nativeUI.closeWaiting();  
							console.log("安装失败["+e.code+"]："+e.message);  
							plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);  
						});  
					} else {  
						console.log("下载App失败！");  
						plus.nativeUI.alert("下载App失败！");  
					}  
					plus.nativeUI.closeWaiting();  
				})
				downToak.start(); // 开启下载的任务
				var prg = 0;
				var showLoading = plus.nativeUI.showWaiting("正在下载,由于是国外服务器,时间较长请勿关闭...");   //创建一个showWaiting对象 
				downToak.addEventListener("statechanged", function(task, status) {  //给下载任务设置一个监听 并根据状态  做操作
					switch(task.state) {
						case 1:
							showLoading.setTitle("正在下载");
						break;
						case 2:
							showLoading.setTitle("已连接到服务器");
						break;
						case 3:
							prg = parseInt(parseFloat(task.downloadedSize) / parseFloat(task.totalSize) * 100);
							if(prg % 1 == 0) {  // 让百分比 增长
								showLoading.setTitle("　　 已下载" + prg + "%　　 ");
							}
						break;
						case 4:
							plus.nativeUI.closeWaiting();
						break;
				
					}
				
				});
			
			},
			getVersionData(){
				var _this =this
				//检查版本 用以升级
				uni.showLoading({
					title: '检测更新...'
				});
				getVersion().then(res => {
					if(!_this.compare(_this.version, res.data.message.version)){
						_this.vDownUrl=res.data.message.url //赋值下载地址
						console.log(_this.vDownUrl);
						_this.versionShow=true //弹窗
						uni.showToast({
							position: 'bottom',
							title: "有新版本"
						});
						uni.hideLoading();
					}else{
						uni.hideLoading();
						uni.showToast({
							position: 'bottom',
							title: "无新版本可更新！"
						});
					}
					
				}).catch(err => {
					console.log(err)
					uni.hideLoading();
					uni.showToast({
						position: 'bottom',
						title: "检测失败！"
					});
				})
			},
			compare(curV, reqV) {
			  if (curV && reqV) {
			    //将两个版本号拆成数字
			    var arr1 = curV.split('.'),
			      arr2 = reqV.split('.');
			    var minLength = Math.min(arr1.length, arr2.length),
			      position = 0,
			      diff = 0;
			    //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
			    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
			      position++;
			    }
			    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
			    //若curV大于reqV，则返回true
			    return diff > 0;
			  } else {
			    //输入为空
			    console.log("版本号不能为空");
			    return false;
			  }
			},
			back_bbs(){
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
				if(this.loginMode != 3) {
					this.reglog = '前往登录';
					this.loginbtn_text = '注 册';
					this.loginMode = 3;
				} else {
					this.reglog = '注册账号';
					this.loginbtn_text = '登 录';
					this.loginMode = 1;
				}
				
			},
			logon_fun(index) {
				if(index == 3) {
					this.reglog = '前往登录';
					this.loginbtn_text = '注 册';
				}
				
				this.loginMode = index;
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
					console.log(res);
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
				if(this.xieyi == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先阅读用户协议和隐藏政策，并同意'
					});
					return;
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
					
				} else if(this.loginMode == 3) {
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
				if(this.xieyi == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先阅读用户协议和隐藏政策，并同意'
					});
					return;
				}
				
				// #ifdef APP-PLUS  
				let _self = this;  
				plus.oauth.getServices(function(services) {  
					console.log('开始微信授权');
					// let auths = services;  
					// let aweixin = auths[0]; 
					let aweixin = null;
					for (var i in services) {
						var service = services[i];
						// 获取微信登录对象 
						if (service.id == 'weixin') {
							aweixin = service;
							break;
						}
					}
					if (!aweixin.authResult) {  
						aweixin.authorize(function(e) {  
							console.log(e);
							console.log(e.code);//app端获取到的code
							
							_this.isRotate = true;
							getLogin({code: e.code}, 3).then(res => {
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
									} else {
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
							
								})
						}, function(e) {  
							
							uni.showToast({  
								title: e.message,  
								icon: 'none'  
							})  
						}, {  
							scope: 'snsapi_userinfo',  
						});  
					} else {  
						uni.showToast({  
							title: '已授权',  
							icon: 'none'  
						})  
					}  
				}, function(e) {  
					plus.nativeUI.alert("获取登录授权服务列表失败：" + JSON.stringify(e));  
				});  
				// #endif
			}

			
		}
	}
</script>

<style>
	@import url("./css/main.css");
	.status_bar {
	        height: var(--status-bar-height);
	        width: 100%;
		background: #0099ee;
	    }
	.main {
		padding-top: 120rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
	}
	.main2 {
		padding-top: 20rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
	}
	.bg_arc {
		width: 100%;
		position: relative;
		background: #0099ee;
		
		   
	}
	.back_bbs {
		position: absolute;
		top: 0;
		left: 0;
		margin: 20px;
		color: #FFFFFF;
		font-size: 20px;
	}
	.logo_box {
		
		padding: 20rpx;
		position: absolute;
		left: 50%;
		z-index: 9;
		margin-left: -70rpx;
		
		background: #FFFFFF;
		
		border-radius: 15px;
		box-shadow: 0 0px 5px rgba(0, 153, 238, 0.39);
	}
	.logo_box img {
		width: 100rpx;
		height: 100rpx;
		
	}
	.division_line {
		padding: 0 30rpx;
		color: #CCCCCC;
	}
	.division_line::before {
		content: '━━━';
		position: relative;
		left: -10px;
		font-size: 10px;
	}
	.division_line::after {
		content: '━━━';
		position: relative;
		right: -10px;
		font-size: 10px;
	}
	
	.uni-row {
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	}
	.uni-flex {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	}
	.flex-item {
		flex: 1;
	}
	
	


	
	
	.uni-input-placeholder {
	        color: #CCCCCC;
	}
	.mode1_text, .mode2_text {
		padding: 0;
		text-shadow: none;
	}
	.hint {
		text-align: center;
		padding: 40rpx 80rpx;
		font-size: 25rpx;
		color: #bbb;
	}
	.hint .link {
		color: #0099EE;
	}
</style>
