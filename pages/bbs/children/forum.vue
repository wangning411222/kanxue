<template>
	<view class="">
		
		<view class="cu-bar bg-white solid-bottom" style="padding: 0 20upx; margin-bottom: 20upx;">
		    <view style="flex: 1;">
		      <span  class="iconfont icon-ren1" style="font-size: 30rpx; vertical-align: baseline; margin-right: 10rpx;"></span>我的版块
		    </view>
		    <text class="text-blue " v-if="isEditing == false" @click="edit_obj">编辑</text>
		    <text class="text-blue" v-if="isEditing == true" @click="complete_edit_obj">完成</text>
		</view>
		
		<view v-if="forumList.length > 0">
		    <view class="w-25 text-center padding-lr-sm forumItem"
			v-for="(item, index) in forumList" 
			v-if="item.status == true" 
			:key="index"
			@click="forum_operate($event,index, item.name)"
		    > 
			<text v-if="isEditing == true" :class="index < 2 ?'': 'cuIcon-close clearIcon icon'"></text>
			<text class="text-cut name block padding-lr-xs" style="padding-top: 15rpx; padding-bottom: 15rpx;" :class="index < 2 ?'text-gray': ''">{{ item.name }}</text>
		    </view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom" style="padding: 0 20upx; margin-bottom: 20upx;">
		    <view>
		      <span class="iconfont icon-gengduo" style="font-size: 30rpx; vertical-align: baseline; margin-right: 10rpx;"></span>更多版块
		    </view>
		    
		</view>
		
		<view class="" v-if="forumList.length > 0">
		    <view class="w-25 text-center padding-lr-sm forumItem" 
			v-for="(item, index) in forumList" 
			v-if="item.status == false" 
			:key="index"
			@click="forum_operate($event,index, item.name)"
		    > 
			<text v-if="isEditing == true" class="cuIcon-add clearIcon icon"></text>
			
			<text class="text-cut name block padding-lr-xs" style="padding-top: 15rpx; padding-bottom: 15rpx;">{{ item.name }}</text>
		    </view>
		</view>
	</view>
	
	
</template>

<script>
	
	import { mapState, mapGetter, mapMutations, mapAction } from 'vuex'
	export default {
		computed:{
			...mapState({
				'forumList': state=> state.forum.forumList,
				'isEditing': state=> state.forum.isEditing,
				'userInfo': state=> state.userInfo
			})
		},
		onLoad() {
			this.getForumList();
		},
		methods: {
			...mapMutations([
				'forum/setEditStatus',
				'forum/setForumLocalStorage'
			]),
			getForumList() {
				let _this = this;
				let tmpForumList = '';
				
				if(typeof this.userInfo != 'undefined' && this.userInfo != '') {
					tmpForumList = uni.getStorageSync('forumList'+ this.userInfo.uid);
				} else {
					tmpForumList = uni.getStorageSync('forumList0');
				}
				if(tmpForumList == '') {
					_this.$http.get('bbs/app-forum_list.htm').then(res=>{
						res = res.data;
						if(res.code == 0) {
							
							_this.$store.dispatch('forum/forumListAsync', {forumList: res.message, type:1, uid: _this.userInfo.uid});
						} else {
							uni.showToast({
								'icon':'none',
								'title':  res.message
							})
						}
					}).catch(err=>{
						uni.showToast({
							'icon':'none',
							'title': '网络故障'
						})
					});
				} else {
					_this.$store.dispatch('forum/forumListAsync', {forumList: tmpForumList, type:2, uid: 0});
				}
			},
			edit_obj(){
				this['forum/setEditStatus'](true);
			},
			complete_edit_obj(){
				
				if(this.userInfo != '') {
					
					this['forum/setForumLocalStorage']({uid:this.userInfo.uid});
				} else {
					
					this['forum/setForumLocalStorage']({uid: 0});
				}
				this['forum/setEditStatus'](false);
				let app =  getApp();
				app.globalData.isForumPage = 1;
				
				
				uni.showToast({
					'icon':'success',
					'title':'保存成功'
				})
			},
			forum_operate(e, index, name) {
				let _this = this;
				if(index < 2) {
					return;
				}
				if (this.isEditing) {
					this.$store.dispatch('forum/forumListReset', { i:index,uid: _this.userInfo.uid }); 
				}
			}
		}
	}
</script>

<style lang="scss">

	.w-25 {
		display: inline-block;
		width: 250rpx;
	}
	.cu-item {
		
		text-align: center;
	}
	.image {
		margin: 0 auto;
		width: 80rpx;
		height: 80rpx;
	}
	.clearIcon {
		line-height: 20rpx;
		position: absolute !important;
		right: 20upx;
		top: 0upx;
		margin-top: 0!important;
		font-size: 28upx!important;
		width: auto !important;
		
		display: inline-block !important;
		background: #FFFFFF;
	}
	.cuIcon-close {
		color: orange !important;
	}
	.cuIcon-add {
		color: #0099ee !important;
	}
	.forumItem {
		position: relative;
		margin-bottom: 30rpx;
		box-sizing: border-box;
	}
	
	.forumItem .name {
		border: 1px solid rgba(0,0,0,.1);
		border-radius: 3px;
	}
</style>
