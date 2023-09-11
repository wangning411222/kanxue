<template>
	<page-loading v-if="!isShowView"></page-loading>
	<view v-else>
		<view class="view_top">
			
			<view class="title py-20 px-20">{{ thread.subject }}</view>
			<view class="flex px-20" style="padding-bottom: 20rpx; border-bottom: 1px solid #EEEEEE;">
				<image v-if="thread.user_avatar" class="avatar_img" :src="thread.user_avatar"></image>
				<image v-if="!thread.user_avatar" class="avatar_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1Njk4YjhlYi1kNzQyLTQzNWItYTQ3Zi0yYzNjMWUxOTM1NWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTQ5NUUzN0EwNDRGMTFFQUIzODlEREY4RDc5QzdCODMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTQ5NUUzNzkwNDRGMTFFQUIzODlEREY4RDc5QzdCODMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1Njk4YjhlYi1kNzQyLTQzNWItYTQ3Zi0yYzNjMWUxOTM1NWQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTY5OGI4ZWItZDc0Mi00MzViLWE0N2YtMmMzYzFlMTkzNTVkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+c/Iu1gAAABhQTFRF5+fszs3R2tndvr3BwL/D4+PqwcDF8vDxJl2PVwAAAWlJREFUeNrslN2ChSAIhBkUev833iFPm2n+nKu9WW6y4nMAETm+NvlH/g6R8WavP0ThNKjtIsgph6Xk2ELEc/bLkssaEbpVlnum+4AHETorRJPnhtEF0gIR2hzR5J21MtJlEtV9IpgiBJKZp6rOXWTSVLiEoV4ptXVuVa7ANVpgR8WquA2UighztjFiOT/fgSIkQwQK7c+aIIaIW4/ERjZGKII3ZKIi8JfG9YxZkcW7yBQ2b0vret1tdV9amT67DmllXNd3/1keYGfC1PvqzriIttF7aXtzzK7xhSTbAxaclJyY+GIm05u2j7BtEOcnfEB2kAhK1BmXxjjHalrKCYhJBMbHG/R81QLQ2NOIxQnpGGEKBeBcUvWy4hcf3hc6fQCqyOHXmoyOEFwE0z9uJDIbIKgQxAWWojFBThXcSNkBCxUpSZ8+H4THI5jlokUlfE5Rpr6hEo7RMOb2qzLJ5YNY3Cxxe1X5EWAA+Bo73gX4K+kAAAAASUVORK5CYII=" mode=""></image>
				<view class="flex-sub" style="align-self: center;">
					
					<view class="flex" style="align-self: center;">
						<view style="padding-left: 10rpx;" @tap="userCenter($event, thread)">
							<text style="font-weight: 600;">{{ thread.username || " " }}</text>
							<text class="level" :class="'level-'+ thread.gid" style=" margin-left: 10rpx;"></text>
						</view>
						<view class="flex-sub text-gray" style="text-align: right;">
							<text class="iconfont icon-liulan" style="font-size: 28rpx;"></text>{{ thread.views_fmt }}
							<text style="margin-left: 10px;">{{ thread.create_date_fmt }}</text> 
						</view>
					</view>
				</view>
			</view>
			<view class="message px-20">
				<u-parse :content="thread.message_fmt" @preview="preview" @navigate="navigate" />
				
			</view>
		</view>
		<view style="text-align: center;">
			
			<span style="border-top: 1px solid #EEEEEE; width: 60%; display: inline-block;">
				<span style="font-size: 40rpx; position: relative; top: -24rpx; padding: 0 15px; color: #DDDDDD; background: #FFFFFF;">END</span>
			</span>
		</view>
		<view>
			<view class="px-20">
				<view style="padding: 10px 0 20px; font-weight: bold;">评论</view>
				<view class="postlist_item" v-if="postList.length > 0 && item" v-bind:key="index" v-for="(item, index) in postList">
					<!-- <view class="padding-right-sm text-center">
						<image class="avatar_img" :src="item.user_avatar" @tap="userCenter($event, item)"></image>
						
					</view> -->
					<view>
						<view class="text-lg padding-bottom-sm margin-bottom-sm" style="border-bottom: 1px solid #efefef;">
							<view class="uni-flex">
								<view class="flex-item">
									<image class="avatar_img margin-right-sm" style="vertical-align: middle;" :src="item.user_avatar" @tap="userCenter($event, item)"></image>
									<text style="vertical-align: middle; margin-right: 10rpx;" @tap="userCenter($event, item)">{{ item.username }}</text>
									<text class="level" :class="'level-'+ item.gid"></text>
									<text v-if="item.uid == thread.uid" class="line-red cu-tag" style="margin-left: 10rpx; height: auto; display: inline-block;">楼主</text>
								</view>
								<view class="flex-item text-right">
									<text v-if="item.floor" class="text-sm text-gray padding-left-xs padding-top-xs">{{item.floor}} 楼</text>
								</view>
							</view>
						</view>
						<view>
							<u-parse :content="item.message_fmt" @preview="preview" @navigate="navigate" />
						</view>
						<view class="flex padding-top-xs text-gray">
							<view class="flex-sub text-df">{{ item.create_date_fmt }}</view>
							<view class="flex-sub text-right">
								<view class=" pop_item_2" @tap.stop.prevent="report(item.pid)"><text class="iconfont icon-jubao"></text></view>
								<view class=" pop_item_1" @tap.stop.prevent="goreply(item.pid, index, item.floor)"><text class="iconfont icon-xinxi"></text></view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="postList.length == 0" class="text-center padding-top-xl">
					<image src="../../../static/zanwu.png" mode="aspectFit" style="height: 150rpx;"></image>
					<view class="text-center">
						<text>暂无相关数据</text>
					</view>
				</view>
				<view style="height: 40px;">
					<view v-if="isShowBottomText" class="cu-load bg-grey" :class="!isLoad ? 'loading' :'over'"></view>
				</view>
				
			</view>
			<view style="height: 60px;"></view>
		</view>	
		<view class="bottom_textarea" v-if="showEditBox" @touchmove.stop.prevent @click.stop="bindTextAreaBlur">
			<view @click.stop.prevent style="width: 100%; height: auto; padding: 10px 15px; position: absolute; bottom: 0; z-index: 100; background: #FFFFFF; box-sizing: border-box;">
				<view style="padding: 10px;  background: #EEEEEE; border-radius: 3px;">
					<textarea maxlength="400" @focus="focEmj" v-model="postValue"  @input="postInput" focus auto-height :placeholder="placeText"  style="width: 100%; height: 50px; min-height: 50px;" />
				</view>
				
				<view class="flex" style="padding-top: 20rpx;">
					
					<view class="flex-sub padding-left-sm" style="align-self: center;">
						<text :class="emojiIcon" style="font-size: 48rpx;" @click="showEmj"></text>
					</view>
					<view class="flex-sub text-right padding-right-sm">
						<button :disabled="sendbtnIsDisabled" class="cu-btn bg-blue shadow-blur" @click="goSubmit">{{ sendbtn }}</button>
					</view>
				</view>
				<view class="emotion_box">
					<emotion @emotion="handleEmotion" :bottom="0" :height="200" v-if="showPannel" style="padding-top: 20rpx;"></emotion>
				</view>
			</view>
			
		</view>
		<view class="flex bottom_tabbar">
			<view class="text-center flex align-self-center padding-lr-sm" style="width: 300rpx;" >
				<text class="flex-sub comment_box" @click="changeEditBox"> 发 表 评 论 ...</text>
			</view>
			<view class="text-center align-self-center text-muted" style="width: 112.5rpx;" @click="scrollTop">
				
				<text class="iconfont icon-xinxi " style="font-size: 36rpx;"></text>
				<view >
					<text style="font-size: 20rpx;">{{ thread.posts }}</text>
				</view>
			</view>
			<view class="text-center align-self-center text-muted" style="width: 112.5rpx;" @tap="gothumb(thread.tid, thread.pid)">
				<text v-if ="thread.is_thumb == 1"  class="iconfont icon-zan text-red" style="font-size: 36rpx;"></text>
				<text v-else class="iconfont icon-zan" style="font-size: 36rpx;"></text>
				<view >
					<text style="font-size: 20rpx;">{{ thread.thumb_num > 0 ? thread.thumb_num : 0 }}</text>
				</view>

			</view>
			<view class="text-center align-self-center text-muted" style="width: 112.5rpx;" @tap="gofavorite(thread.tid)">
				<text  v-if ="thread.isfavorite == 1" class="iconfont icon-shoucang text-orange" style="font-size: 36rpx;"></text>
				<text  v-else class="iconfont icon-shoucang" style="font-size: 36rpx;"></text>
				<view >
					<text style="font-size: 20rpx;">收藏</text>
				</view>
			</view>
			<view class="text-center align-self-center text-muted" style="width: 112.5rpx;" @click="more_fun">
				<text class="cuIcon-more" style="font-size: 36rpx;"></text>
				<view >
					<text style="font-size: 20rpx;">更多</text>
				</view>
			</view>
			
			
		</view>

	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations, mapAction } from 'vuex'
	import uParse from '@/components/uParse/src/wxParse.vue'
	import Emotion from '@/components/Emotion/index.vue'
	import pageLoading from '@/components/loadmore/loading.vue'
	
	const pagesize = 10;
	let nvMask, nvImageMenu,keyboardheight;
	export default {
		data() {
			return {
				postValue: '',
				scroll_top: 0
			}
		},
		computed:{
			...mapState({
				isLogin: state => state.isLogin,
				showPannel: state=> state.thread.showPannel,
				focus: state=>state.thread.focus,
				tid: state=>state.thread.tid,
				quotepid: state=>state.thread.quotepid,
				page: state=> state.thread.page,
				showEditBox: state=> state.thread.showEditBox,
				maxpage: state=> state.thread.maxpage,
				isLoad: state=> state.thread.isLoad,
				isShowBottomText: state=> state.thread.isShowBottomText,
				thread: state=> state.thread.thread,
				postList: state=> state.thread.postList,
				isShowView: state=> state.thread.isShowView,
				emojiIcon: state=> state.thread.emojiIcon,
				sendbtnIsDisabled: state=> state.thread.sendbtnIsDisabled,
				sendbtn: state=> state.thread.sendbtn,
				placeText:state=>state.thread.placeText
				
			})
			
			
		},
		components:{
			uParse,
			Emotion,
			pageLoading
		},
		
		onLoad(option) {
			let tid = option.tid;
			let _this = this;
			if(tid > 0) {
				this['thread/setTid'](tid);
				this.$store.dispatch('thread/resetData').then(res=>{
					_this.getThread();
				})
				
			}
			
		},
		onReady() {
			
			this.initShare();
		},
		
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (nvImageMenu.isVisible()) {
				nvImageMenu.hide()
				nvMask.hide()
				return true
			}
		},
		onReachBottom(){
			this.pullUp();
		},
		methods: {
			...mapMutations([
				'thread/setisShowView',
				'thread/setTid',
				'thread/setShowEditBox',
				'thread/setshowPannel',
				'thread/setFocus',
				'thread/setemojiIcon',
				'thread/setThread',
				'thread/setQuotepid',
				'thread/setPostList',
				'thread/setPlaceText',
				'thread/setIsPost',
				'thread/setPageInc',
				'thread/setisLoad',
				'thread/setShowBottomText',
				'thread/setsendbtn',
				'thread/setsendbtnIsDisabled'
				
			]),
			preview() {
				
			},
			postInput(e) {
				this.postValue = e.detail.value
			},
			handleEmotion(i) {
				if(i == '[em_98]') {
					//匹配最后一个表情符号并删除。
					this.postValue = this.postValue.replace(/(\[[^\]]+\]|[\s\S])$/, '');
				} else {
					this.postValue += i;
				}
							

			
			},
			pullUp() {

				let _this = this;
				if(this.ispost) return;
				//上拉加载。
				this['thread/setIsPost'](true);
				this['thread/setPageInc']();
				this.getPostList();
					
			},
			getPostList(){
				
				this['thread/setisLoad'](false);
				this['thread/setShowBottomText'](true);
				let _this = this;
				_this.$http.post('bbs/app-thread.htm',{
					'page': _this.page,
					'tid': _this.tid,
				}).then(res=> {
					res = res.data;
					if(res.code == 0) {
						//数据累加
						if(res.message.postlist.length == 0) {
							
							_this['thread/setShowBottomText'](false);
							
						}
						_this.$store.dispatch('thread/getThreadAsync',{
							thread:res.message.thread,
							postList: res.message.postlist,
							maxpage: res.message.maxpage,
							pagesize: pagesize
						}).then(r=> {
							_this['thread/setisShowView'](true);
							if(!r) {
								_this['thread/setIsPost'](true);
							}
						});
					} else {
						
						_this['thread/setShowBottomText'](false);
						uni.showToast({
							'title':res.message,
							'icon':'none',
							
						});
						console.log(123);
						setTimeout(function(){
							console.log(234);
								uni.navigateBack({
									delta:1
								})
							
						},1000);
					}
				
				})
			},
			showEmj() {
				
				let bool = !this.showPannel;
				if(bool) {
					this['thread/setemojiIcon']('cuIcon-keyboard');
				} else {
					//this.focEmj();
					this['thread/setemojiIcon']('cuIcon-emoji');
				}
				this['thread/setshowPannel'](bool);
				this.$emit('show')
			},
			// 光标触发隐藏表情
			focEmj() {
				this['thread/setemojiIcon']('cuIcon-emoji');
				this['thread/setshowPannel'](false)
				this.$emit('foc')
			},
			gothumb(tid, pid) {
				let _this = this;
				this.$http.post('bbs/app-like.htm',{tid:tid, pid:pid, type:1}).then(res=>{
					res = res.data;
					if(res.code == 0) {
						let tmpthread = _this.thread;
						tmpthread.is_thumb = 1;
						tmpthread.thumb_num++;
						_this['thread/setThread'](tmpthread);
					} else {
						uni.showToast({
							'icon':'none',
							'title':res.message
						})
						
						return;
					}
				})
			},
			navigate() {
				
			},
			goreply(quotepid, index, floor) {
				
				let text = '回复 '+floor+' 楼：';
				this['thread/setPlaceText'](text);
				this['thread/setQuotepid'](quotepid);
				this['thread/setShowEditBox'](true);
				
			},
			gofavorite(tid) {
				let _this = this;
				this.$http.post('bbs/app-favorite.htm',{tid:tid}).then(res=>{
					res = res.data;
					if(res.code == 0) {
						let tmpthread = _this.thread;
						tmpthread.isfavorite = 1;
						_this['thread/setThread'](tmpthread);
					} else if(res.code == 1) {
						let tmpthread = _this.thread;
						tmpthread.isfavorite = 0;
						_this['thread/setThread'](tmpthread);
					} else {
						uni.showToast({
							'icon':'none',
							'title':res.message
						})
						
						return;
					}
				})
			},
			getThread() {
				if(this.tid < 1) return;
				let _this = this;
				_this.$http.post('bbs/app-thread.htm',{
					'page': _this.page,
					'tid': _this.tid,
				}).then(res=> {
					res = res.data;
					if(res.code == 0) {
						
						_this.$store.dispatch('thread/getThreadAsync',{
							thread:res.message.thread,
							postList: res.message.postlist,
							maxpage: res.message.maxpage,
							pagesize: pagesize
						}).then(r=> {
							//存入历史
							
							let historyList = uni.getStorageSync('historyList');
							if(historyList == '' || typeof historyList == 'undefined') {
								historyList = [];
								historyList.push(_this.thread);
								uni.setStorageSync('historyList', historyList);
							} else {
								if(historyList.length == 10) {
									historyList.pop();
								}
								let thread_arr = [_this.thread];
								let tidarr = [];
								historyList.forEach((item,index)=> {
									tidarr.push(item.tid);
								})
								let ctid = _this.thread.tid;
								if(tidarr.indexOf(ctid) === -1) {
									historyList = historyList.concat(thread_arr);
									uni.setStorageSync('historyList', historyList);
								}
 								
							}
							
							setTimeout(function(){
								_this['thread/setisShowView'](true);
							},0)
							
						});
					} else {
						_this['thread/setisShowView'](false);
						uni.showToast({
							'title':res.message,
							'icon':'none'
							
						});
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1500);
						return false;
					}
				})
			},

			initShare() {
				let _this = this;
				// #ifdef APP-PLUS
				// 如下为分享内容定义，可根据业务需求自行定义
				var strShareUrl = "https://bbs.kanxue.com/thread-"+_this.tid+".htm"
				var strShareTitle = "看雪学院，安全学院"
				var strShareSummary = "iOS、Android、编译"
				var strShareImageUrl = "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"
				
				//以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
				var screenWidth = plus.screen.resolutionWidth
				//以360px宽度屏幕为例，上下左右边距及2排按钮边距留25像素，图标宽度55像素，同行图标间的间距在360宽的屏幕是30px，但需要动态计算，以此原则计算4列图标分别的left位置
				//图标下的按钮文字距离图标5像素，文字大小12像素
				//底部取消按钮高度固定为44px
				//TODO 未处理横屏和pad，这些情况6个图标应该一排即可
				var margin = 25,
					iconWidth = 55,
					icontextSpace = 5,
					textHeight = 12
				var left1 = margin / 360 * screenWidth
				var iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
				if (iconSpace <= 5) { //屏幕过窄时，缩小边距和图标大小，再算一次
					margin = 15
					iconWidth = 40
					left1 = margin / 360 * screenWidth
					iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
				}
				var left2 = left1 + iconWidth + iconSpace
				var left3 = left1 + (iconWidth + iconSpace) * 2
				var left4 = left1 + (iconWidth + iconSpace) * 3
				var top1 = left1
				var top2 = top1 + iconWidth + icontextSpace + textHeight + left1
				// 	console.log("screenWidth: " + screenWidth + " ;height: " + plus.screen.resolutionHeight);
				// 	console.log("left1: " + left1);
				// 	console.log("iconSpace: " + iconSpace);
					nvMask = new plus.nativeObj.View("nvMask", { //先创建遮罩层
					top: '0px',
					left: '0px',
					height: '100%',
					width: '100%',
					backgroundColor: 'rgba(0,0,0,0.5)'
				});
				nvMask.addEventListener("click", function() { //处理遮罩层点击
					nvMask.hide();
					nvImageMenu.hide();
				})
					nvImageMenu = new plus.nativeObj.View("nvImageMenu", { //创建底部图标菜单
					bottom: '0px',
					left: '0px',
					height: '264px',
					width: '100%',
					backgroundColor: 'rgb(255,255,255)'
				});
				//绘制底部图标菜单的内容
				nvImageMenu.draw([
					{
						tag: 'rect',//菜单顶部的分割灰线
						color: '#e7e7e7',
						position: {
							top: '0px',
							height: '1px'
						}
					},
					{
						tag: 'font',
						id: 'sharecancel',//底部取消按钮的文字
						text: '取消',
						textStyles: {
							size: '14px'
						},
						position: {
							bottom: '0px',
							height: '44px'
						}
					},
					{
						tag: 'rect',//底部取消按钮的顶部边线
						color: '#e7e7e7',
						position: {
							bottom: '45px',
							height: '1px'
						}
					},
					{
						tag: 'img',
						id: 'imgwechatfriend',
						src: '/static/sharemenu/wechatfriend.png',
						position: {
							top: top1,
							left: left1,
							width: iconWidth,
							height: iconWidth
						}
					},
					{
						tag: 'font',
						id: 'fontwechatfriend',
						text: '微信好友',
						textStyles: {
							size: textHeight
						},
						position: {
							top: top1 + iconWidth + icontextSpace,
							left: left1,
							width: iconWidth,
							height: textHeight
						}
					},
					{
						tag: 'img',
						id: 'imgwechatmoments',
						src: '/static/sharemenu/wechatmoments.png',
						position: {
							top: top1,
							left: left2,
							width: iconWidth,
							height: iconWidth
						}
					},
					{
						tag: 'font',
						id: 'fontwechatmoments',
						text: '微信朋友圈',
						textStyles: {
							size: textHeight
						},
						position: {
							top: top1 + iconWidth + icontextSpace,
							left: left2 - 2.5,
							width: iconWidth + 5,
							height: textHeight
						}
					},
					{
						tag: 'img',
						id: 'imgweibo',
						src: '/static/sharemenu/weibo.png',
						position: {
							top: top1,
							left: left3,
							width: iconWidth,
							height: iconWidth
						}
					},
					{
						tag: 'font',
						id: 'fontweibo',
						text: '微博',
						textStyles: {
							size: textHeight
						},
						position: {
							top: top1 + iconWidth + icontextSpace,
							left: left3,
							width: iconWidth,
							height: textHeight
						}
					},
					{
						tag: 'img',
						id: 'imgqq',
						src: '/static/sharemenu/qq.png',
						position: {
							top: top1,
							left: left4,
							width: iconWidth,
							height: iconWidth
						}
					},
					{
						tag: 'font',
						id: 'fontqq',
						text: 'QQ',
						textStyles: {
							size: textHeight
						},
						position: {
							top: top1 + iconWidth + icontextSpace,
							left: left4,
							width: iconWidth,
							height: textHeight
						}
					},
					{
						tag: 'img',
						id: 'imgcopyurl',
						src: '/static/sharemenu/copyurl.png',
						position: {
							top: top2,
							left: left1,
							width: iconWidth,
							height: iconWidth
						}
					},
					{
						tag: 'font',
						id: 'fontcopyurl',
						text: '复制',
						textStyles: {
							size: textHeight
						},
						position: {
							top: top2 + iconWidth + icontextSpace,
							left: left1,
							width: iconWidth,
							height: textHeight
						}
					},
					
					{
						tag: 'img',
						id: 'imgmore1',
						src: '/static/sharemenu/jubao.png',
						position: {
							top: top2,
							left: left2,
							width: iconWidth,
							height: iconWidth
						}
					},
					{
						tag: 'font',
						id: 'fontreport',
						text: '举报',
						textStyles: {
							size: textHeight
						},
						position: {
							top: top2 + iconWidth + icontextSpace,
							left: left2,
							width: iconWidth,
							height: textHeight
						}
					},
					{
						tag: 'img',
						id: 'imgmore',
						src: '/static/sharemenu/more.png',
						position: {
							top: top2,
							left: left3,
							width: iconWidth,
							height: iconWidth
						}
					},
					{
						tag: 'font',
						id: 'fontmore',
						text: '更多',
						textStyles: {
							size: textHeight
						},
						position: {
							top: top2 + iconWidth + icontextSpace,
							left: left3,
							width: iconWidth,
							height: textHeight
						}
					},
					//如果想要增加更多按钮，请在这里继续添加，第二列还有2个空位
				])
				nvImageMenu.addEventListener("click", function(e) { //处理底部图标菜单的点击事件，根据点击位置触发不同的逻辑
					// console.log("click menu"+JSON.stringify(e));
					if (e.screenY > plus.screen.resolutionHeight - 44) { //点击了底部取消按钮
						nvMask.hide();
						nvImageMenu.hide();
					} else if (e.clientX < 5 || e.clientX > screenWidth - 5 || e.clientY < 5) {
						//屏幕左右边缘5像素及菜单顶部5像素不处理点击
					} else { //点击了图标按钮
						var iClickIndex = -1 //点击的图标按钮序号，第一个图标按钮的index为0
						var iRow = e.clientY < (top2 - (left1 / 2)) ? 0 : 1
						var iCol = -1
						if (e.clientX < (left2 - (iconSpace / 2))) {
							iCol = 0
						} else if (e.clientX < (left3 - (iconSpace / 2))) {
							iCol = 1
						} else if (e.clientX < (left4 - (iconSpace / 2))) {
							iCol = 2
						} else {
							iCol = 3
						}
						if (iRow == 0) {
							iClickIndex = iCol
						} else {
							iClickIndex = iCol + 4
						}
						console.log("点击按钮的序号: " + iClickIndex);
						if (iClickIndex >= 0 && iClickIndex <= 6) { //处理具体的点击逻辑，此处也可以自行定义逻辑。如果增减了按钮，此处也需要跟着修改
							var strProvider="",strScene=""
							switch (iClickIndex) {
								case 0:
									strProvider = "weixin"
									strScene = "WXSceneSession"
									break;
								case 1:
									strProvider = "weixin"
									strScene = "WXSenceTimeline"
									break;
								case 2:
									strProvider = "sinaweibo"
									break;
								case 3:
									strProvider = "qq"
									break;
								case 4:
									uni.setClipboardData({
										data: strShareUrl,
										complete() {
											uni.showToast({
												title: "已复制到剪贴板"
											})
										}
									})
									break;
								case 5:
									_this.report();
									
									break;
								case 6:
									plus.share.sendWithSystem({
										content: strShareUrl,
									})
									break;
							}
							if (strProvider!="") { //点击了0-3序号的这4个按钮
								console.log(strProvider);
								if (strProvider == 'qq') {
									uni.share({
										provider: strProvider,
										scene:strScene,
										type: 1,
										href: strShareUrl,
										title: strShareTitle,
										summary: strShareSummary,
										success: function(res) {
											console.log("success:" + JSON.stringify(res));
										},
										fail: function(err) {
											console.log("fail33:" + JSON.stringify(err));
										}
									})
									return false;
								}
								uni.share({
									provider: strProvider,
									scene:strScene,
									type: 0,
									href: strShareUrl,
									title: strShareTitle,
									summary: strShareSummary,
									imageUrl: strShareImageUrl,
									success: function(res) {
										console.log("success:" + JSON.stringify(res));
									},
									fail: function(err) {
										console.log("fail:" + JSON.stringify(err));
									}
								})
							}
						}
					}
				})
				// #endif
			},
			more_fun() {

				// #ifdef APP-PLUS
				nvMask.show()
				nvImageMenu.show() //5+应支持从底部向上弹出的动画
				// #endif
			},
			report(pid){
				let _this = this;
				pid = pid || _this.thread.pid;
				uni.showActionSheet({
					itemList: ['垃圾信息', ' 内容违规', '不友善内容','内容质量低'],
					success: function (res) {
						// #ifdef APP-PLUS
						nvMask.hide();
						nvImageMenu.hide();
						// #endif
						//调用举报接口
						let reportid = res.tapIndex;
						_this.$http.post('bbs/app-report.htm', {pid: pid, reportid: reportid}).then(res=>{
							res = res.data;
							if(res.code == 0) {
								uni.showToast({
									'icon':'none',
									'title':'举报成功'
								});
								return;
							} else {
								uni.showToast({
									'icon':'none',
									'title':res.message
								});
								return;
							}
						}).catch(err=>{
							uni.showToast({
								'icon':'none',
								'title':'哎呀~网络状况不佳！'
							});
							return;
						})
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			bindTextAreaBlur(e) {
				this['thread/setQuotepid'](0);
				this['thread/setPlaceText']('发表评论...');
				this['thread/setShowEditBox'](false);
				this['thread/setshowPannel'](false);
				this['thread/setemojiIcon']('cuIcon-emoji');
			},
			changeEditBox(){
				this['thread/setShowEditBox'](true);
			},
			goSubmit() {
				let _this = this;
				if(this.postValue.trim() == '') {
					uni.showToast({
						'icon':'none',
						'title':'请输入内容'
					})
					return
				}
				if(this.postValue.length > 400) {
					uni.showToast({
						'icon':'none',
						'title':'字数不得超过400字'
					});
					return;
				}
				//发送前
				_this['thread/setsendbtn']('发送中');
				_this['thread/setsendbtnIsDisabled'](true);
				_this.$http.post('bbs/app-post_create.htm',{message: this.postValue, tid:this.tid, quotepid: this.quotepid }).then(res=>{
					res = res.data;
					if(res.code == 0) {
						//回复成功
						_this.postValue = '';
						let tmpPostList = _this.postList;
						tmpPostList.unshift(res.message);
						console.log(tmpPostList);
						_this['thread/setPostList'](tmpPostList);
						uni.showToast({
							'icon':'none',
							'title':'回复成功'
						})
						_this.scrollTop();
						
					} else {
						uni.showToast({
							'icon':'none',
							'title': res.message
						})
						
					
					}
					_this['thread/setsendbtn']('发送');
					_this['thread/setsendbtnIsDisabled'](false);
					_this['thread/setShowEditBox'](false);
					return;
				})
				// 发送成功隐藏
			},
			emoji_fun(){
				this.KeyboardHeight = keyboardheight;
			},
			async scrollTop(){
				if(this.scroll_top == 0){
					const query = uni.createSelectorQuery().in(this);
					await query.select('.view_top').boundingClientRect(data => {
						
						this.scroll_top = data.height;
						
						this.scroll_fun();
					}).exec();
				} else {
					this.scroll_fun();
				}
			},
			scroll_fun(){
				uni.pageScrollTo({
				    scrollTop: this.scroll_top,
				    duration: 300
				});
			},
			userCenter(e,item) {
			
				let uid = item.uid;
				
				uni.navigateTo({
					'url': './ucenter?uid='+uid
				})
			}
		}
	}
</script>

<style>
	.text-muted {
		color: #AAAAAA;
	}
	.uni-flex {
		display: flex;
	}
	.flex-item {
		flex: 1;
	}
	.emotion-box {
		position: unset!important;
	}

	.replyactive {
		display: inline-block !important;
	}
	.pop_box {
		background: rgba(0, 0, 0, 0.8); 
		padding: 20rpx; 
		position: absolute; 
		bottom: -20rpx;
		left: -314rpx;
		width: 260rpx; 
		height: 30rpx; 
		line-height: 30rpx; 
		display: none; 
		border-radius: 3px;
		text-align: center;
	}
	.pop_box .top-end:after {
	    content: "";
	    position: absolute;
	    top: 22rpx;
	    right: -12rpx;
	    border-width: 7px 0px 7px 7px;
	    border-style: solid;
	    border-color: transparent transparent transparent rgba(0, 0, 0, 0.8);
	}
	.pop_item_1 {
		display: inline-block; 
		height: 30rpx; 
		/* border-right: 1px solid rgba(255, 255, 255, 0.8); */
		
	}
	.pop_item_2 {
		display: inline-block; 
		height: 30rpx; 
		padding-left: 20rpx;
		margin-right: 50rpx;
	}
	
	.py-20 {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.px-20 {
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.align-self-center {
		align-self: center;
	}
	.title {
		font-size: 40rpx;
		font-weight: 600;
	}
	.avatar_img {
		width: 70rpx;
		height: 70rpx;
		border-radius: 70rpx;
		/* border: 1px solid #ccc;
		box-sizing: border-box; */
	}
	/* 内容区域 */
	.message {
		font-size: 32rpx;
		line-height: 25px;
		padding-bottom: 40px;
		word-break: break-all;
	}
	/* 回复 */
	.postlist_item {
		padding: 20rpx 20rpx;
		border-bottom: 5px solid #EEEEEE;
	}
	/* 固定操作导航 */
	.bottom_tabbar {
		width: 100%;
		height: 50px;
		
		position: fixed;
		bottom: 0;
		z-index: 99;
		border-top: 1px solid #EEEEEE;
		background: #FFFFFF;
	}
	.comment_box {
		align-self: center;
		height: 20px;
		
		padding: 5px 6px;
		border-radius: 3px;
		white-space: nowrap;
		color: #AAAAAA;
		background: #DFDFDF;
	}
	/* 输入框 */
	.bottom_textarea {
		width: 100%;
		height: 100%;
		
		position: fixed;
		bottom: 0;
		z-index: 100;
		
		background: rgba(0, 0, 0, 0.32);
	}

</style>
