<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
		</view>
		<!-- #endif -->
		<view class="text-center text-lg notice_tab_box">
			<text @tap="changeToPmMsg" class="margin-right-lg notice_tab " :class="selected == 0 ? 'active' : ''">
				<view class="cu-tag badge" v-if="pm_number!=0">
					<block v-if="pm_number!=0">{{pm_number>99?'99+':pm_number}}</block>
				</view>
				私信
			</text>
			<text @tap="changeToSystemMsg" class="notice_tab" :class="selected == 1 ? 'active' : ''">
				<view class="cu-tag badge" v-if="system_message_number!=0">
					<block v-if="system_message_number!=0">{{system_message_number>99?'99+':system_message_number}}</block>
				</view>
				通知
			</text>
			
			<text @tap="sendMsg" class="iconfont icon-cc-write send_btn" style=""></text>
		</view>
		<view class="page-section-spacing">
			
			<swiper class="swiper" @change="swiper_current" :current="current">
				<swiper-item>
					<view class="padding" v-if="!isLogin">
						你还没有登录哦
					</view>
					<scroll-view v-else scroll-y="true" class="scroll-view" @scrolltolower="pullUp">
							<view class=" menu-avatar" v-if="selected == 0">
								<view class="card-item" @tap="noticeRead(item.pmtid)" v-if="pmList.length > 0" v-for="(item,index) in pmList" :key="index">
									<view class="cu-avatar round lg" :style="[{backgroundImage:'url(http:'+item.avatar+')'}]"></view>
									<view class="card-flex">
										<view style="font-size: 30rpx; margin-bottom: 10rpx;">
											{{ item.fromusername }}
											<view class="card-action">
												<view class="text-gray text-sm"> {{ item.last_date }}</view>
												<view v-if="item.isread == 0" class="cu-tag round bg-red sm"></view>
											</view>
										</view>
										<view :class="item.isread == 0 ? 'text-red': 'text-gray'" style="margin-bottom: 20rpx;">
											<text class="text-red margin-right-xs"></text> {{ item.subject }}
										</view>
									</view>
									
					
								</view>
								<view class="bg-brown padding-tb-lg padding-left-lg" v-else>
									<text>暂无记录</text>
								</view>
							</view>
							
							
							<view v-if="isShowBottomText" class="cu-load bg-gray" :class="!isLoad ? 'loading' :'over'"></view>
					</scroll-view>
						
				</swiper-item>
				<swiper-item>
					<view class="padding" v-if="!isLogin">
						你还没有登录哦
					</view>
					<scroll-view v-else scroll-y="true" class="scroll-view" @scrolltolower="pullUp">
						<view class="cu-list menu-avatar" v-if="selected == 1">
							<view v-for="(item, index) in noticeList" :key="index" class="padding-sm system_item">
								 <!-- <u-parse :content="item.message" @preview="preview" @navigate="navigate" /> -->
								<view>
									<text>{{ item.from_username }}</text>
									<text>{{ item.type_fmt }}</text>
								</view>
							</view>
						</view>
						<view v-if="isShowBottomText" class="cu-load bg-gray" :class="!isLoad ? 'loading' :'over'"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Config from '../../config.js'
	import { mapState, mapMutations, mapAction, mapGetters } from 'vuex'
	import uParse from '../../components/uParse/src/wxParse.vue'
	const pagesize = 20;
	export default {
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				current: 0
			};
		},
		components:{
			uParse,
		},
		computed:{
			...mapState({
				isLogin: state => state.isLogin,
				pm_number: state => state.pm_number, 
				system_message_number: state => state.system_message_number,
				ispost: state => state.notice.ispost,
				selected: state => state.notice.selected,
				isLoad: state => state.notice.isLoad,
				page: state => state.notice.page,
				maxpage: state => state.notice.maxpage,
				pmList: state => state.notice.pmList,
				noticeList: state=> state.notice.noticeList,
				maxnpage: state=> state.notice.maxnpage,
				isShowBottomText: state => state.notice.isShowBottomText,
				navbar_height: state=> state.notice.navbar_height,
				screen_height: state=> state.notice.screen_height,
				isShowView: state=> state.notice.isShowView
			}),
			...mapGetters({
				scrollHeight: 'notice/scrollHeight'
			})
			
		},
		onLoad() {
			this.getPmList();
			
		},
		onShow() {
			this['notice/setisShowView'](false)
		},
		onReady() {
			let _this = this;
		},
		methods: {
			...mapMutations([
				'notice/setIsPost',
				'notice/setPage',
				'notice/setPageInc',
				'notice/resetPage', 
				'notice/setisLoad', 
				'notice/setSelected', 
				'notice/setPmList',
				'notice/setNoticeList',
				'notice/setNavbarHeight', 
				'notice/setScreenHeight',
				'notice/setShowBottomText',
				'notice/setisShowView'
			]),
			swiper_current(event) {
				var index = event.detail.current;
				if(index == 0) {
					this.changeToPmMsg();
				} else if(index == 1) {
					this.changeToSystemMsg()
				}
			},
			sendMsg() {
				if(this.isLogin) {
					uni.navigateTo({
						'url':'create'
					})
				} else {
					uni.showToast({
						'icon':'none',
						'title':'请先登录'
					})
				}
			},
			pullUp() {
				let _this = this;
				if(this.ispost) return;
				if(this.selected == 0) {
					//上拉加载。
					this['notice/setIsPost'](true);
					this['notice/setPageInc']();
					this.getPmList();
					
				} else if(this.selected == 1) {
					this['notice/setIsPost'](true);
					this['notice/setPageInc']();
					this.getNoticeList();
				}
				
			},
			changeToSystemMsg() {
				this.current = 1;
				this.resetData();
				this.getNoticeList(1);
				
			},
			changeToPmMsg() {
				this.current = 0;
				this.resetData();
				this.getPmList(1);
				
			},
			resetData() {
				this['notice/resetPage']();
				this['notice/setPmList']([]);
				this['notice/setNoticeList']([]);
			},
			getNoticeList() {
				let _this = this;
				_this['notice/setSelected'](1);
				this['notice/setisLoad'](false);
				this['notice/setShowBottomText'](true);
				this.$http.post('pm/pm-app_noticelist.htm', {page: _this.page}).then((res)=>{
					
					res = res.data;
					if(res.code == 0) {
						let msg = res.message;
						let tmp_noticelist = msg.notice_list;
						let currentpage = msg.currentpage;
						let maxpage = msg.maxpage;
						if(tmp_noticelist.length > 0) {
							_this.$store.dispatch('notice/noticeListAsync',{
								tmp_noticelist:tmp_noticelist,
								maxpage:maxpage,
								pagesize:pagesize
							}).then(res=>{
								if(!res) {
									_this['notice/setIsPost'](false);
								}
					
							});
						}
						
					} else if(res.code == 1){
						_this['notice/setShowBottomText'](false);
					} else {
	
						_this['notice/setShowBottomText'](false);
						uni.showToast({
							'title':res.message,
							'icon':'none'
						})
					}
				}).catch(err=> {
					_this['notice/setShowBottomText'](false);
					uni.showToast({
						'icon':'none',
						'title':'网络状况不佳！'
					})
					return;
				});
			},
			noticeRead(pmtid) {
				uni.navigateTo({
				    url: `read?pmtid=${pmtid}`
				});
			},
 			getPmList() {
				let _this = this;
				_this['notice/setSelected'](0);
				this['notice/setisLoad'](false);
				this['notice/setShowBottomText'](true);
				_this.$http.post('pm/pm-app_pmlist.htm', {page: _this.page}).then((res)=>{
					res = res.data;
					if(res.code == 0) {
						
						let msg = res.message;
						let tmp_pmlist = msg.pm_list;
						//let currentpage = msg.currentpage;
						let maxpage = msg.maxpage;

						//数据累加
						_this.$store.dispatch('notice/pmListAsync',{
							tmp_pmlist:tmp_pmlist,
							maxpage:maxpage,
							pagesize:pagesize
						}).then(res=>{
							if(!res) {
								_this['notice/setIsPost'](false);
							}
						});
						
					} else if(res.code == 1){
						
						_this['notice/setShowBottomText'](false);
					} else {

						_this['notice/setShowBottomText'](false);
						uni.showToast({
							'title':res.message,
							'icon':'none'
						})
					}
				}).catch(err=> {
					_this['notice/setShowBottomText'](false);
					uni.showToast({
						'icon':'none',
						'title':'网络状况不佳！'
					})
					return;
				});;
				
				
			},

			// showModal(pmtid, pm_subject) {
			
			// 	this.modalName = 'bottomModal'
			// 	this.pm_subject = pm_subject;
			// 	//获取回复内容
			// 	this.pmRead(pmtid);
			// },
			listTap() {
				/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
				if (this.modalName !== null) {
					return;
				}
				console.log("列表触摸事件触发")
			},
			pmRead(pmtid) {
				let _this = this;
				_this.$http.post('pm/pm-app_pmread.htm', {pmtid: pmtid}).then((res)=>{
					res = res.data;
					if(res.code == 0) {
						let resdata = res.message;
						
						// resdata.forEach((item, index)=> {
						// 	item.message = item.message.replace('<br>', /\n/g);
						// 	resdata[index] = item;
						// });
						let tmp_pm_thread = resdata.shift();
						let tmp_pm_reply_list = resdata;
						tmp_pm_thread.message = tmp_pm_thread.message.replace('<br>', '\n');
						tmp_pm_thread.message = tmp_pm_thread.message.replace(/\[em_([0-9]*)\]/g, '<img src="'+Config.WWW_DOMAIN+'view/img/arclist/$1.gif" border="0" />');
						
						let new_pm_reply_list = [];
						tmp_pm_reply_list.forEach((item, index)=> {
							new_pm_reply_list[index] = item;
							new_pm_reply_list[index].reply = item.reply.replace('<br>', '\n');
							
						});
						_this.pm_thread = tmp_pm_thread;
						_this.pm_reply_list = new_pm_reply_list;
					} else {
						
					}
				});
			},
			hideModal(e) {
				this.modalName = null
			},
		
		
		}
	}
</script>
<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	
	/*  #ifdef APP-PLUS */
	.swiper, .swiper-item, .page-section-spacing, .scroll-view {
		height: calc(100vh - 53px - var(--status-bar-height));
		height: calc(100vh - 53px - constant(safe-area-inset-bottom) - var(--status-bar-height));
		height: calc(100vh - 53px - env(safe-area-inset-bottom) - var(--status-bar-height))
	}
	/* #endif */
	
	/* #ifdef H5 */
	.swiper, .swiper-item, .page-section-spacing, .scroll-view {
		height: calc(100vh - 50px - 50px);
		height: calc(100vh - 50px - 50px - constant(safe-area-inset-bottom));
		height: calc(100vh - 50px - 50px - env(safe-area-inset-bottom))
	}
	/* #endif */
	.send_btn {
		float: right; 
		position: absolute; 
		right: 30rpx; 
		top: 0rpx; 
		font-size: 40rpx;
	}
	
	.notice_tab_box {
		position: relative;
		
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #EEEEEE;
		background: #FFFFFF;
	}
	.notice_tab_box .active {
		border-bottom: 1px solid #0099EE;
		color: #0099EE;
		animation: active 1s;
	}
	.notice_tab {
		display: inline-block;
		font-size: 36rpx;
	}
	@keyframes active
	{
	    0%   {border-bottom-color: #FFFFFF;}
	    100% {border-bottom-color: #0099EE;}
	}

	.switch-sex::after {
		content: "\e716";
	}
	.switch-sex::before {
		content: "\e7a9";
	}
	.switch-music::after {
		content: "\e66a";
	}
	.switch-music::before {
		content: "\e6db";
	}
	.system_item{
		border-bottom: 1px solid #EEEEEE;
	}

	
	.card-item {
		padding: 20rpx 20rpx 0;
		display: flex;
	}
	.card-flex {
		flex: 1;
		margin-left: 20rpx;
		border-bottom: 0.5px solid #EEEEEE;
	}
	.card-action {
		float: right;
	}
</style>
