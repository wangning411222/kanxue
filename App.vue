
<script>
	import { mapState, mapGetters} from 'vuex'
	var i,innerAudioContext;
	var islisten = 0;
	export default {
		globalData: {
			myForum:  [],
			isForumPage:0
		},
		data() {
			return {
				newmsgaudio: ''
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.$store.dispatch('setAppSidAsync');
		},
		onShow: function() {
			
			this.getMyForum();
			this.getPmNums();
			typeof i == "undefined" ? (this.getIntvalPm()) : '';
			
	
		},
		computed:{
			...mapState([
				'userInfo',
				'isLogin',
				'system_message_number',
				'pm_number'
			]),
			...mapGetters(['getNoticeNum'])
		},
		
		methods:{
			getMyForum() {
				let myForum;
				if(this.userInfo != '') {
					myForum = uni.getStorageSync('myForum'+this.userInfo.uid);
				} else {
					myForum = uni.getStorageSync('myForum');
				}
				let app = getApp()
				app.globalData.myForum = myForum;
				return myForum;
			},
			getIntvalPm() {
				let _this = this;
				i = setInterval(function() {_this.getPmNums();}, 1000*10);
			},
			getPmNums() {
				if(!this.isLogin) {
					clearInterval(i);
					return;
				}
				let _this = this;
				_this.$store.dispatch('getNoticeNum').then((res)=>{
					
					if(_this.getNoticeNum > 0) {
						//提示新消息。
						if(islisten == 0) {
						 //    innerAudioContext = uni.createInnerAudioContext();
							// innerAudioContext.autoplay = true;
							// innerAudioContext.src = '/static/newmsg.mp3';
							islisten = 1;
						}
						
						// uni.setTabBarBadge({
						// 	index: 2,
						// 	text: `${_this.getNoticeNum}`
						// })
						uni.showTabBarRedDot({
							index: 2
						})
					} else {
						if(typeof innerAudioContext == 'object') {
							innerAudioContext.destroy();
						}
						
						uni.removeTabBarBadge({
							index:2
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">

	@import "./style/fonts/iconfont.css";
	@import "./style/fonts/iconfont1.css";
	/* ColorUi */
	@import url("./components/colorui/main.css");
	@import url("./components/colorui/icon.css");
	@import url("./components/uParse/src/wxParse.css");
	
	/* 加载loding */
	.cu-load.load-modal {
		width: 0px;
		height: 0px;
		background-color: transparent;
	}
	.cu-load.load-modal::after {
		background-color: rgba(0, 0, 0, 0.3);
		width: 30px;
		height: 30px;
		border-left: 3px solid #FFF0F6;
	}
	body{
		background: #FFFFFF !important;
	}
	/* 阴影 */
	.bar-shadown{
		
		/* : 0 0 36px 0 rgba(43,86,112,.1) !important;*/
		box-shadow: 0 0 36px 0 rgba(43,86,112,.1) !important;
	}
	
	uni-tabbar .uni-tabbar__icon img {
	    width: auto;
	    height: 100%;
	}
	.hr {
		height: 0.3rem;
		background: #EEEEEE;
	}
	
	
	uni-slider .uni-slider-handle-wrapper {
	    position: relative;
	    height: 60px;
	    border-radius: 5px;
	    background-color: #e9e9e9;
	    cursor: pointer;
	    -webkit-tap-highlight-color: transparent;
	}
	
	
	
	
</style>