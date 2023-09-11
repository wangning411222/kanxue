<template>

	<page-loading v-if="!isShowView"></page-loading>
	<view class="cu-card dynamic" v-else>
		<view v-if="pmThread != ''" style="padding-bottom: 104rpx;">
			<view class="padding-tb-sm text-center" style="color: #AAAAAA;">{{ pmThread.create_date }}</view>
			<view class="row padding-lr-sm msg_right" v-if="pmThread.senduid == uid">
				<view class="flex-1 padding-right-sm">
					<view class="message_box" style="width: 400rpx; border-radius: 10rpx; margin-right: 0; margin-left: auto;">
						<u-parse :content="pmThread.message"  />
					</view>
				</view>
				<view v-if="pmThread.senduid == uid" class="cu-avatar round lg" :style="'background-image:url(http:'+pmThread.avatar_url+');'"></view>
			</view>
			<view class="row padding-lr-sm msg_left" v-if="pmThread.senduid != uid">
				<view class="cu-avatar round lg" :style="'background-image:url(http:'+pmThread.avatar_url+');'"></view>
				<view class="flex-1 padding-left-sm">
					<view class="message_box" style="width: 400rpx; border-radius: 10rpx; margin-right: auto; margin-left: 0;">
						<u-parse :content="pmThread.message"  />
					</view>
				</view>
				
			</view>
			
			<view v-if="pmReplyList.length > 0">
				<view v-for="(item, index) in pmReplyList" :key="index">
					<view class="padding-tb-sm text-center" style="color: #AAAAAA;">{{ item.create_date }}</view>
					<view class="row padding-lr-sm msg_left" v-if="item.uid != uid">
						<view class="cu-avatar round lg" :style="'background-image:url(http:'+item.avatar_url+');'"></view>
						<view class="flex-1 padding-left-sm">
							<view class="message_box" style="width: 400rpx; border-radius: 10rpx; margin-right: auto; margin-left: 0;">
								<u-parse :content="item.reply"  />
							</view>
						</view>
						
					</view>
					<view class="row padding-lr-sm msg_right" v-if="item.uid == uid">
						<view class="flex-1 padding-right-sm">
							<view class="message_box" style="width: 400rpx; border-radius: 10rpx; margin-right: 0; margin-left: auto;">
								<u-parse :content="item.reply"  />
							</view>
						</view>
						<view class="cu-avatar round lg" :style="'background-image:url(http:'+item.avatar_url+');'"></view>
					</view>
				</view>
			</view>

			<!-- <view class="reply_item padding-tb-lg padding-left-lg" v-else> 
				<text>暂无记录</text>
			</view> -->
		</view>

		<view class="bg-white reply_box" style="position:fixed;z-index: 999;left:0;right:0; bottom:0; ">
			<view class="flex">
				<view class="flex-sub padding-left-sm">
					<input class="padding-tb-xs" style="align-self: center; background-color: #f7f7f7;" type="text" cursor-spacing="300" fixed @focus="InputFocus" @blur="InputBlur" v-model="inputValue" placeholder-style="font-size:24rpx;color:#aaaaaa;"  placeholder="每条短信扣除 20 kx币！" maxlength="300"></input>
				</view>
				
				<view class="text-center" style="width: 80rpx; font-size: 50rpx;">
					<text :class="emojiIcon" @tap="showEmj"></text>
				</view>
				<view class="text-center" style="width: 150rpx;">
					<button :disabled="rbIsDisabled" class="cu-btn text-white" style="background-color: #0099EE;" @click="reply()">{{ replybtn }}</button>
				</view>
			</view>
			<view>
				<emotion @emotion="handleEmotion" :height="200" v-if="showPannel"></emotion>	
			</view>
		</view>
		<!-- <input class="flex-sub" @focus="InputFocus" @blur="InputBlur" v-model="inputValue" :adjust-position="false" class="" :focus="false" maxlength="300" cursor-spacing="10"></input> -->
	</view>
			

</template>

<script>
	import Config from '../../config.js';
	import { mapState, mapGetters, mapMutations, mapAction } from 'vuex'
	import uParse from '../../components/uParse/src/wxParse.vue'
	import Emotion from '../../components/Emotion/index.vue'
	import pageLoading from '../../components/loadmore/loading.vue'
	export default {
		data() {
			return {
				inputValue:'',
				pmtid: 0
			}
		},
		components:{
			uParse,
			Emotion,
			pageLoading
		},
		computed:{
			...mapState({
				uid:  state =>state.userInfo.uid,
				pmThread: state =>state.notice.pmThread,
				pmReplyList: state=>state.notice.pmReplyList,
				showPannel: state=> state.notice.showPannel,
				focus: state=>state.notice.focus,
				replybtn: state=>state.notice.replybtn,
				rbIsDisabled:state=>state.notice.rbIsDisabled,
				isShowView: state=>state.notice.isShowView,
				emojiIcon: state=>state.notice.emojiIcon
			}),
			
		},
		onLoad(option) {
			let pmtid = option.pmtid;
			if(pmtid > 0) {
				this.pmtid = pmtid;
				this.pmRead(pmtid);
			}
			
		},
		
		methods: {
			...mapMutations([
				'notice/setshowPannel',
				'notice/setFocus',
				'notice/setinputValue',
				'notice/setReplyBtn',
				'notice/setrbIsDisabled',
				'notice/setisShowView',
				'notice/setemojiIcon'
			]),
			InputBlur(e){
				
			},
			InputFocus(e){
				this['notice/setshowPannel'](false);
				this.$emit('foc')
			},
			pmRead(pmtid) {
				let _this = this;
				_this.$http.post('pm/pm-app_pmread.htm', {pmtid: pmtid}).then((res)=>{
					res = res.data;
					if(res.code == 0) {
						let resdata = res.message;
						let tmp_pm_thread = resdata.shift();
						let tmp_pm_reply_list = resdata;
						tmp_pm_thread.message = tmp_pm_thread.message.replace('<br>', '\n');
						tmp_pm_thread.message = tmp_pm_thread.message.replace(/\[em_([0-9]*)\]/g, '<img class="expression" src='+Config.BBS_DOMAIN+'view/img/face/$1.gif border="0" />');
						
						let new_pm_reply_list = [];
						tmp_pm_reply_list.forEach((item, index)=> {
							new_pm_reply_list[index] = item;
							new_pm_reply_list[index].reply = item.reply.replace('<br>', '\n');
							new_pm_reply_list[index].reply = item.reply.replace(/\[em_([0-9]*)\]/g, '<img  class="expression" src='+Config.BBS_DOMAIN+'view/img/face/$1.gif border="0" />');
						});
						
						_this.$store.dispatch('notice/noticeReadAsync',{
							pmtid: _this.pmtid,
							pmthread:tmp_pm_thread,
							pmReplyList:new_pm_reply_list
						}).then(res=>{
							setTimeout(()=>{
								_this['notice/setisShowView'](true);
							},100)

							if(_this.pmThread.senduid != _this.uid){
								uni.setNavigationBarTitle({
								    title: _this.pmThread.username
								});
							} else {
								uni.setNavigationBarTitle({
								    title: _this.pmThread._username
								});
							}
						});
					} else {
						
					}
				});
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

			handleEmotion(i) {
				
				if(i == '[em_98]') {
					//匹配最后一个表情符号并删除。
					this.inputValue = this.inputValue.replace(/(\[[^\]]+\]|[\s\S])$/, '');
				} else {
					this.inputValue += i;
				}
			},
			reply() {
				let _this = this;
				let message = this.inputValue;
				if(this.inputValue == '') {
					uni.showToast({
						'title':'回复不得超过140个字符',
						'icon':'none'
					})
					return;
				}
				if(this.inputValue.length > 140) {
					uni.showToast({
						'title':'回复不得超过140个字符',
						'icon':'none'
					})
					return;
				} 
				this['notice/setReplyBtn']('发送中');
				this['notice/setrbIsDisabled'](true);
				this['notice/setemojiIcon']('cuIcon-keyboard');
				_this.$http.post('pm/pm-app_reply.htm', {pmtid:this.pmtid, message:this.inputValue }).then((res)=>{
					res = res.data;
					//清空
					_this.inputValue = '';
					if(res.code == 0) {
						_this.pmRead(_this.pmtid);
						uni.showToast({
							'icon':'success',
							'title':'发送成功'
						});
						this['notice/setReplyBtn']('发送');
						this['notice/setrbIsDisabled'](false);
					}
				})
			}
		}
	}
	
</script>

<style>
	page, body, html {
		height: 100%;
		background-color: #EEEEEE !important;
		overflow: auto;
	}
	.row {
		display: flex;
	}
	.flex-1 {
		flex: 1;
	}
	.reply_box {
		padding: 15rpx 0; 
		
		width:100%; 
		margin:0 auto; 
		
		border-top: 1px solid #EEEEEE;
	}
	.expression {
		width: 60rpx;
		height: 60rpx;
	}
	.empty_seat{
		height: 30px;
	}
	.reply_item{
	    margin-bottom: 16upx;
	    padding: 24rpx 32rpx;
	    background: #fff;
	    box-shadow: 0 8rpx 16rpx 0 #e8eef5;
	    border-radius: 24rpx;
	}
	
	
	.message_box {
		position: relative;
	}
	.msg_right .message_box .wxParse {
		color: #FFFFFF !important;
	}
	
	.msg_right, .msg_left {
		margin-bottom: 20rpx;
	}
	.msg_right .message_box {
		 background-color: #0099EE;
	}
	.msg_left .message_box {
		 background-color: #FFFFFF;
	}
	.msg_right .message_box:before {
		position: absolute;
		content: '';
		width: 0;
		height: 0;
		border: 9px solid transparent;
		border-left-color: #0099ee;
		right: -32rpx;
		top: 24rpx;
	}
	.msg_left .message_box:before {
		position: absolute;
		content: '';
		width: 0;
		height: 0;
		border: 9px solid transparent;
		border-right-color: #FFFFFF;
		left: -32rpx;
		top: 24rpx;
	}
	.wxParse {
		padding: 20rpx;
	}
</style>
