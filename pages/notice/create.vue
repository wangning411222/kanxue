<template>
	<view class="box">
		
		<form>


			<view class="cu-form-group">
				<!-- <view class="title">收件人：</view> -->
				
				<input placeholder="输入收件人" v-model="tousername" @input="search_uname"></input>
				<text v-if="selectUid == 0" class='cuIcon-people'></text>
				<text v-else class='cuIcon-roundcheckfill text-green'></text>
				<view class="user_list" :class="{search_active: searchListIsShow, search_hide: !searchListIsShow}">
				    <view class="padding flex" @tap="selecteUser(item.uid, item.username)" v-for="(item,index) in userSearchList" v-bind:key="index">
				      <text class="flex-treble">{{item.username}}</text>
				      <text class='cuIcon-forward'></text>
				    </view>
				</view>
			</view>
			<view class="cu-form-group">
				<!-- <view class="title"><text decode="true" space="emsp">标&emsp;题：</text></view> -->
				<input placeholder="输入标题" type="text" maxlength="25" v-model="title" @input="inTitle"></input>

			</view>
			
			<view class="cu-form-group align-start">
				<!-- <view class="title"><text decode="true" space="emsp">内&emsp;容：</text></view> -->
				<textarea maxlength="400" auto-height="true" v-model="textareaBValue"  @input="textareaBInput" placeholder="请输入内容"></textarea>
				<!-- <text class="cuIcon-emoji" :class="emojiColor"  style="margin-top: 30upx;" @tap="showEmj"></text> -->
			</view>
			<view class="padding-top-sm tabar_bottom">
				<view class="padding-bottom-sm flex padding-lr-sm" style="border-bottom: 1px solid #EEEEEE;">
					<view class="flex-sub">
						<text class="cuIcon-emoji flex-sub" :class="emojiColor"  style="font-size: 24px;" @tap="showEmj"></text>
					</view>
					<view class="text-right flex-sub">
						<button :disabled="sendbtnIsDisabled" class="cu-btn bg-gradual-blue shadow-blur" @click="pmSend">{{ sendbtn }}</button>
					</view>
				</view>
			
				<view style="position: relative;">
					<emotion @emotion="handleEmotion" :bottom="0" :height="200" v-if="showPannel"></emotion>
				</view>
			</view>
			
		</form>
			
	</view>
</template>

<script>
	import { mapState, mapMutations, mapAction, mapGetters } from 'vuex'
	import Emotion from '../../components/Emotion/index.vue'
	export default {
		data() {
			return {
				textareaBValue: '',
				tousername: '',
				title: ''
			}
		},
		onLoad(options) {
			let tousername = options.username || '';
			if(tousername != ''){
				this.tousername = tousername;
				this.param_uname();
			} 
			
		},
		computed:{
			...mapState({
				showPannel: state=> state.notice.showPannel,
				focus: state=>state.notice.focus,
				isShowView: state=>state.notice.isShowView,
				searchListIsShow: state =>state.notice.searchListIsShow,
				userSearchList: state => state.notice.userSearchList,
				selectUid: state => state.notice.selectUid,
				emojiColor: state=>state.notice.emojiColor,
				sendbtn: state=>state.notice.sendbtn,
				sendbtnIsDisabled: state=>state.notice.sendbtnIsDisabled
			}),
		},
		components:{
			Emotion
		},
		methods: {
			...mapMutations([
				'notice/setshowPannel',
				'notice/setFocus',
				'notice/setinputValue',
				'notice/setReplyBtn',
				'notice/setrbIsDisabled',
				'notice/setisShowView',
				'notice/setuserSearchList',
				'notice/setsearchListIsShow',
				'notice/setselectUid',
				'notice/setemojiIcon'
			]),
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			// 展示表情
			showEmj() {
				let bool = !this.showPannel;
				if(bool) {
					this['notice/setemojiIcon']('cuIcon-keyboard');
				} else {
					this['notice/setemojiIcon']('cuIcon-emoji');
				}
				this['notice/setshowPannel'](bool);
				this.$emit('show')
			},
			// 光标触发隐藏表情
			focEmj() {
				this['notice/setshowPannel'](false)
				this.$emit('foc')
			},
			inTitle(e) {
				setTimeout(() => {
					this.inputTitle = e.detail.value;
				}, 0);
			},
			selecteUser(uid, username) {
				this.tousername = username;
				this['notice/setselectUid'](uid);
				this['notice/setuserSearchList']([]);
				this['notice/setsearchListIsShow'](false);
			},
			handleEmotion(i) {
				if(i == '[em_98]') {
					//匹配最后一个表情符号并删除。
					this.textareaBValue = this.textareaBValue.replace(/(\[[^\]]+\]|[\s\S])$/, '');
				} else {
					this.textareaBValue += i;
				}
			
			},
			pmSend() {
				//发送
				let _this = this;
				if(this.selectUid < 1) {
					uni.showToast({
						'icon':'none',
						'title': '无该收件人'
					})
					return false;
				}
				//标题
					
				if(this.inputTitle == '' || this.inputTitle.length > 25) {
					uni.showToast({
						'icon':'none',
						'title': '标题长度应介于1~25个字符之间'
					})
					return false;
				}
				//内容
			
				if(this.textareaBValue == '' || this.textareaBValue.length > 200) {
					uni.showToast({
						'icon':'none',
						'title': '内容长度应介于1~200个字符之间'
					})
					return false;
				}
				let postData = {
					touid: this.selectUid,
					subject: this.inputTitle,
					message: this.textareaBValue
				};
				//
				_this.$store.dispatch('notice/pmSendBefore', postData).then(res=> {
					return res;
				}).then(res=> {
					_this.$http.post('pm/pm-app_pmsend.htm', postData).then(res=> {
						res = res.data;
						_this.$store.dispatch('notice/pmSendAfter').then(r=> {
							if(res.code == 0) {
								//发送成功返回列表页
								
									uni.showToast({
										'icon':'success',
										'title':'发送成功'
									});
									setTimeout(function(){
										uni.navigateTo({
											'url': 'notice'
										})
									}, 1000);
								
								
							} else {
								//重置输入框
								_this.textareaBValue = '';
								_this.tousername = '';
								_this.title = '';
								uni.showToast({
									'title':res.message,
									'icon':'none'
								});
								return;
							}
						});
					});
				}).catch(err=>{
					uni.showToast({
						'icon':'none',
						'title':'哎呀~ 网络状况不佳哦！'
					});
					_this.textareaBValue = '';
					_this.tousername = '';
					_this.title = '';
				})
			},
			param_uname() {
				let _this = this;
				_this.$http.post('pm/pm-app_user_search.htm', {username: this.tousername}).then(res=>{
					res = res.data;
					if(res.code == 0) {
						if(res.message.length > 0) {
							_this['notice/setuserSearchList'](res.message);
							_this['notice/setsearchListIsShow'](true);
							_this.selecteUser(res.message[0].uid, res.message[0].username);
						} else {
							_this['notice/setsearchListIsShow'](false);
						}
					} else {
						_this['notice/setuserSearchList']([]);
						_this['notice/setsearchListIsShow'](false);
					}
				});
			},
			search_uname(e) {
				let _this = this;
				let uname = e.detail.value;
				_this['notice/setselectUid'](0);
				if(uname == '') {
					_this['notice/setuserSearchList']([]);
					_this['notice/setsearchListIsShow'](false);
					return;
				}
	
				_this.$http.post('pm/pm-app_user_search.htm', {username: uname}).then(res=>{
					res = res.data;
					if(res.code == 0) {
						if(res.message.length > 0) {
							_this['notice/setuserSearchList'](res.message);
							_this['notice/setsearchListIsShow'](true);
						} else {
							_this['notice/setsearchListIsShow'](false);
						}
					} else {
						_this['notice/setuserSearchList']([]);
						_this['notice/setsearchListIsShow'](false);
					}
				});
			},
			
		}
	}
</script>

<style>
	.tabar_bottom {
		position: fixed; 
		bottom: 0; 
		z-index: 999;
		width: 100%; 
		border-top: 1px solid #EEEEEE; 
		box-sizing: border-box;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.user_list {
		width: 100%;
		background: #e8eef5;
		position: absolute;
		top: 102rpx;
		left: 0;
		z-index: 10;
	}
	.search_active {
		display: block;
	}
	.search_hide {
		display: none;
	}
</style>

