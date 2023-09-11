<template>
	<view class="container" style="position: relative;">
		<view class="send_box">
			<view class="flex pickerTopicBox">
				<view class="flex-sub padding-sm margin-lr-xs" style="line-height: 80upx;">
					<picker @change="bindPickerTopic" :value="pickerTopicIndex" :range="pickerTopicArray" range-key="name">
						<view class="uni-input" style="border-right:1px solid #dad5d5">{{pickerTopicArray[pickerTopicIndex].name}}</view>
					</picker>
				</view>
				<view class="flex-treble padding-sm margin-lr-xs">
					<input placeholder-style="color: #cccccc;" v-model="title"  @input="titleInput" placeholder="添加标题" />
				</view>
			
			</view>
			<view>
				<!-- <textarea :style="{height: screen_box_height - pickerTopicBox_height - forum_choose_box_height +'px'}" style="width: 100%; line-height: 1rem;" @input="messageInput" v-model="message" placeholder-style="color: #cccccc;" placeholder="添加内容" maxlength= "-1"/> -->
				<textarea style="width: 100%; line-height: 1rem; padding: 20rpx;" auto-height @input="messageInput" v-model="message" placeholder-style="color: #cccccc;" placeholder="添加内容" maxlength= "-1"/>

			</view>
		</view>
		<view class="forum_choose_box bg-white" style="position: fixed; bottom: 0; z-index: 999;">
			<view class="flex" style="font-size: 30rpx; padding: 30rpx 40rpx;">
				<view>
				    选择板块：
				</view>
				<view class="flex-sub">
				    <picker @change="bindPickerChange" :value="pickerindex"  :range="pickerarray">
					<view class="uni-input">{{pickerarray[pickerindex]}}</view>
				    </picker>
				</view>
				<view style="">
				    <text class="cuIcon-pic" style="font-size: 50rpx;" @tap="chooseImage"></text>
				</view>
			</view>
			 <scroll-view scroll-x="true">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file text-right">
							<text class="cuIcon-close" @click="deleteImg(index)"></text>
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import Config from '@/config.js';
	import permision from "@/common/permission.js"
	
	export default {
		data() {
			return {
				screen_box_height:0,
				pickerTopicBox_height:0,
				forum_choose_box_height: 0,
				pickerTopicArray: [
					{name:'选择话题'},
					{name:'[求助]'},
					{name: '[原创]'}, 
					{name:'[推荐]'}, 
					{name:'[转帖]'}, 
					{name:'[讨论]'}, 
					{name:'[下载]'}, 
					{name:'[分享]'}, 
					{name:'[注意]'}, 
					{name:'[翻译]'}, 
					{name:'[调查]'}, 
					{name:'[建议]'}
				],
				pickerTopicIndex: 0,
				forumList:[],
				pickerarray: [],
				pickerindex: 0,
				imageList: [],
				aidArr: [],
				fidArr:[],
				countIndex: 6,
				count: [1, 2, 3, 4, 5, 6],
				title:'',
				message:''
			}
		},
		computed:{
			...mapState({
				'userInfo':state=>state.userInfo,
				'tabBars': state=>state.bbs.tabBars
			})
		},
		onLoad() {
			let _this = this;
		},
		onShow() {
			this.getForumList();
		},
		onReady() {
			let _this = this;
			const query = uni.createSelectorQuery().in(this);
			query.select('.container').boundingClientRect(data => {
				_this.screen_box_height = data.height;
			}).exec();
			query.select('.pickerTopicBox').boundingClientRect(data => {
				_this.pickerTopicBox_height = data.height;
				
			}).exec();
			query.select('.forum_choose_box').boundingClientRect(data => {
				_this.forum_choose_box_height = data.height;
				
			}).exec();
		},
		
		onNavigationBarButtonTap(e){
			
			let _this = this;
			if(e.index == 0){
				if(this.verfiyFormData()) {
					console.log('发送');
					_this.$http.post('bbs/app-thread_create.htm', {
						'fid':_this.fidArr[_this.pickerindex],
						'subject':_this.title,
						'message':_this.message,
						'subject_prefix': _this.pickerTopicArray[_this.pickerTopicIndex].name
					}).then(res=> {
						res = res.data;
						console.log(res);
						if(res.code == 0) {
							uni.showToast({
								'icon': 'success',
								'title':'发帖成功'
							});
							let tid = parseInt(res.message);
							setTimeout(function(){
								uni.navigateBack({
								    delta: 1
								});
							},1000);
						} else {
							console.log(res.message);
							uni.showToast({
								'icon': 'none',
								'title':res.message
							});
							return;
						}
					}).catch(err=>{
						uni.showToast({
							'icon': 'icon',
							'title':'网络不稳定'
						});
						return;
					});
				}
			}
		},
		methods: {
			titleInput() {
				
			},
			messageInput() {
				
			},
			verfiyFormData() {

				if(this.pickerTopicIndex == 0) {
					uni.showToast({
						'icon':'none',
						'title':'请选择话题'
					});
					return false;
				}
				if(this.title.length == 0) {
					uni.showToast({
						'icon':'none',
						'title':'请输入标题'
					});
					return false;
				}
				if(this.title.length > 128) {
					uni.showToast({
						'icon':'none',
						'title':'标题长度不得超过128个字符'
					});
					return false;
				}
				if(this.message.length == 0) {
					uni.showToast({
						'icon':'none',
						'title':'请输入帖子内容'
					});
					return false;
				}
				if(this.message.length > 2028000) {
					uni.showToast({
						'icon':'none',
						'title':'帖子内容过长'
					});
					return false;
				}
				return true;
			},
			bindPickerTopic(e){
				this.pickerTopicIndex = e.target.value
			},
			bindPickerChange(e) {
				this.pickerindex = e.target.value
			},
			getForumList() {
	
				let _this = this;
				_this.$http.get('bbs/app-forum_list.htm').then(res=>{
					res = res.data;
					if(res.code == 0) {
						_this.forumList = res.message;
						let namearr = [];
						let fidarr = [];
						let _pickerindex = 0;
						res.message.forEach((item,index)=> {
							if(index > 2){
								namearr.push(item.name);
								fidarr.push(item.fid);
							}
							
						})
						_this.pickerarray = namearr;
						_this.fidArr = fidarr;
						_this.fidArr.forEach((item,index)=> {
							if(item == 45) {
								this.pickerindex = index;
							}
						})
					} else {
						uni.showToast({
							'icon':'none',
							'title': '出错了'
						})
					}
				}).catch(err=>{
					uni.showToast({
						'icon':'none',
						'title': '网络故障'
					})
				});
				
			},
			//删除图片
			deleteImg(index) {
				let _this = this;
				
				let aid = this.aidArr[index];
				uni.showModal({
				    title: '提示',
				    content: '确定要删除该图片吗？',
				    success: function (res) {
				        if (res.confirm) {
				            _this.$http.post(Config.BBS_DOMAIN+'app-delimg.htm', {
								aid:aid
							}).then(r=> {
								r = r.data;
								if(r.code == 0) {
									//删除成功
									let tmpImageList = _this.imageList;
									//删除指定下标index
									tmpImageList.splice(index, 1);
									_this.imageList = tmpImageList;
								} else {
									//删除失败
									uni.showToast({
										'icon':'none',
										'title':r.message
									});
									return;
								}
							})
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// 选择图片
			chooseImage: async function() {
				if(this.userInfo == '' || typeof this.userInfo == 'undefined') {
					uni.showToast({
						'icon':'none',
						'title':'请先登录'
					});
					return false;
				}
				let uid = this.userInfo.uid;
				let _this = this;
				if (this.imageList.length === 6) {
					let isContinue = await this.isFullImg();

					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['original', 'compressed'],
					count: 1,
					success: (res) => {
				

						uni.uploadFile({
							url: Config.BBS_DOMAIN+'app-uploadimg.htm', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							
							name: 'file',
							formData: {
								'user_token': uni.getStorageSync('accessToken')
							},
							success: (uploadFileRes) => {
								uploadFileRes = JSON.parse(uploadFileRes.data);
								let tmparr = [uploadFileRes.message.url];
								let tmparr2 = [uploadFileRes.message.aid];
								_this.imageList = _this.imageList.concat(tmparr);
								_this.aidArr = _this.aidArr.concat(tmparr2);
							}
						});
						
						
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						// if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
						// 	this.checkPermission(err.code);
						// }
						// #endif
						
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList,
					indicator: "default"
				})
			},
			
		}
	}
</script>

<style lang='scss'>
	page, .container {
		height: 100%;
	}
	.send_box {
		padding: 0 30rpx;
		input {
			padding: 20rpx 0;
			font-size: 36rpx;
			margin-bottom: 12rpx;
		}
	}
	.forum_choose_box {
		width: 100%;
		
		border-top: 1px solid #eee;
		box-sizing: border-box;
	}
	
	/*  */
	.uni-uploader__files {
		width: 100%;
		display: block;
		white-space: nowrap;
		
	}
	.uni-uploader__file {
		margin: 10upx;
		width: 210upx;
		height: 210upx;
		display: inline-block;
		padding-bottom: 30rpx;
	}
	.uni-uploader__img {
		display: block;
		width: 210upx;
		height: 210upx;
	}
</style>
