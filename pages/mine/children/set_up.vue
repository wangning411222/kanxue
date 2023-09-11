<template>
	<view>
		<view class="hr"></view>
		<view class="cu-list menu sm-border">
			<!-- <view class="cu-item arrow"  @click="jump_setup">
				<view class="content">
					<text class="color515151 ">编辑资料</text>
				</view>
			</view> -->
			<view class="cu-item arrow"  @click="jump_privacy">
				<view class="content">
					<text class="color515151 ">账号和隐私设置</text>
				</view>
			</view>
			
		</view>
		<view class="hr"></view>
		<view class="cu-list menu sm-border">
			<view class="flex bg-white"  @tap="clearLocalStorage" style="min-height: 55px; padding: 0 16px; align-items: center;">
				<view class="flex-sub">
					<text class="color515151 " style="font-size: 30upx; color: #333333;">清除缓存</text>
				</view>
				<view class="flex-sub text-right">
					<text class=" text-gray">{{ cacheSize }}</text>
				</view>
			</view>
		</view>
		<view class="hr"></view>
		<view class="cu-list menu sm-border">
			<view class="flex bg-white custom_item"  @click="getVersionData" style="">
				<view class="flex-sub">
					<text class="color515151 " style="font-size: 30upx; color: #333333;">检查版本</text>
				</view>
				<view class="flex-sub text-right">
					<text class=" text-gray">{{ version }}</text>
				</view>
			</view>
			<view class="cu-item arrow"  @click="jump_about">
				<view class="content">
					<text class="color515151 ">关于看雪</text>
				</view>
			</view>
		</view>
		<view class="padding"></view>
		<view class="cu-item" v-if="isLogin">
			<view class="padding bg-white text-red text-center" @tap="loginOut">退出登录</view>
		</view>
		
		
		
		<!-- 退出登录 -->
		<view class="cu-modal" :class="loginOutShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">退出登录</view>
					<view class="action" @tap="loginOutHide">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定退出登录？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-black" @tap="loginOutHide">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="loginOut">确定</button>
		
					</view>
				</view>
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
		<!-- 是否清除缓存 -->
		<view class="cu-modal" :class="clearShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">清除缓存</view>
					<view class="action" @tap="clearOutHide">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					清除缓存后需要重新登录，是否确定？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-black" @tap="clearOutHide">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="clearOut">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getVersion } from '../../../service/api/version.js' //版本api
	import { mapState, mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				versionShow: false, //新版本下载弹出
				version: "",//版本号
				vDownUrl: "",//最新版下载地址
				loginOutShow: false,
				cacheSize: '0B',
				clearShow: false
			}
		},
		computed:{
			...mapState(['isLogin']),
		},
		mounted() {
			var _this = this;
			
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,function(inf){  
				_this.version=inf.version //赋值版本号
			});  
			//#endif
			
		},
		onShow(){
			this.getCacheSize();
		},
		methods:{
			getCacheSize() {
				let _this = this;
				uni.getStorageInfo({
				    success: function (res) {

				       _this.cacheSize = res.currentSize == 0 ? '0kb': res.currentSize+' kb';
				        
				    }
				});
			},
			loginOut() {
				//退出登录
				var _this=this
				if(_this.loginOutShow){
					
						_this.$store.dispatch("setUserDataAsync","").then(res=>{
							_this.loginOutShow=false;
							uni.removeTabBarBadge({
								index:2
							});
							
							let app =  getApp();
							app.globalData.isForumPage = 1;
							uni.switchTab({
							    url: '/pages/bbs/bbs'
							});
							
							
						}) //清空登录状态
				}else{
					_this.loginOutShow = true
				}
			},
			clearOut() {
				var _this = this;
				if(_this.clearShow) {
					//清空
					uni.clearStorageSync();
					uni.showToast({
						'icon':'none',
						'title':'清空成功'
					})
					_this.clearShow = false;
				} else {
					_this.clearShow = true;
				}
			},
			clearOutHide() {
				this.clearShow = false;
			},
			clearLocalStorage() {
				this.clearShow = true;
			},
			loginOutHide(){
				//退出登录取消
				this.loginOutShow=false
				//版本下载取消
				this.versionShow=false
			},


			getVersionData(){
				var _this =this
				//检查版本 用以升级
				uni.showLoading({
					title: '检测更新...'
				});
				getVersion()
				.then(res => {
					
					if(_this.version != '' && _this.version != res.data.message.version){
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
				var showLoading = plus.nativeUI.showWaiting("正在下载,时间较长请勿关闭...");   //创建一个showWaiting对象 
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
			jump_about(){
				uni.navigateTo({
					url: './about',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			jump_privacy(){
				if (!this.isLogin) {
					uni.showToast({
						'icon': 'none',
						'title': '请先登录'
					});
					return false;
				}
				uni.navigateTo({
					url: './privacy',
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
			
		}
	}
</script>

<style>
	page, body {
		background: #EEEEEE !important;
	}
	.custom_item {
		min-height: 55px; 
		padding: 0 16px; 
		align-items: center; 
		border-bottom: 0.5px solid  rgba(221, 221, 221, 0.88);
	}
</style>
