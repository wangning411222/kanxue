<template>
	
		<page-loading v-if="!isShowView"></page-loading>
		
		<view v-else>
			
		<view class="card_list padding-tb-sm padding-lr-sm" v-if="item" v-for="(item, index) in goldslist" :key="index">
			
			<view class="card_list_body">
				<view class="card_title text-black flex-twice">
					<text :class="item.add_type == 1 ? 'cuIcon-triangleupfill text-red' : 'cuIcon-triangledownfill text-green'"></text>
					<text>{{ item.comment }}</text>
					<text style="float: right;padding-right: 24rpx;" :class="item.add_type == 1 ? 'text-red':'text-green'">{{item.add_type == 1 ?'+':'-'}} {{item.credit}} 雪币</text>
				</view>
				<view class="card_bottom padding-top-sm padding-left-sm">
					<view class="text-gray text-sm">{{ item.create_date_fmt }}</view>
					
				</view>
			</view>
		</view>
		<view v-if="isShowBottomText" class="cu-load bg-grey" :class="!isLoad ? 'loading' :'over'"></view>
		</view>
		
	
</template>

<script>
	import Config from '../../../config.js';
	import pageLoading from '../../../components/loadmore/loading.vue'
	export default {
		data(){
			return {
				isShowView:false,
				ispost:false,
				goldslist:[],
				isShowBottomText:false,
				isLoad:true,
				page:1
			}
		},
		onLoad() {
			this.getGoldsList();
		},
		components:{
			pageLoading
		},
		methods:{
			getGoldsList() {
				let _this = this;
				_this.isShowBottomText = true;
				_this.isLoad = false;
				_this.$http.post('bbs/app-goldlist.htm', {'page':this.page}).then((res)=>{
					res = res.data;
					if(res.code == 0) {
						_this.isShowView = true;
						let msg = res.message.goldlist;
						if(_this.page >= res.message.maxpage) {
							_this.isShowBottomText = true;
							_this.isLoad = true;
						} else {
							_this.isShowBottomText = false;
							_this.isLoad = true;
						}
						msg.forEach((item,index)=>{
							msg[index].create_date_fmt = item.create_date_fmt.substr(0, item.create_date_fmt.length-3);
						})
						_this.goldslist = _this.goldslist.concat(msg);
						
						_this.ispost = false;
					} else {
						uni.showToast({
							'icon':'none',
							'title':'出错啦！'
						});
						return;
					}
				}).catch(e=>{
					uni.showToast({
						'icon':'none',
						'title':'网络异常！'
					});
					return;
				});
			},
			onReachBottom(){
				let _this = this;
				if(this.ispost) return;
				//上拉加载。
				this.ispost = true;
				this.page ++;
				this.getGoldsList();
				
			},
		},
	}
</script>

<style>
</style>
