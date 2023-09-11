<template>
	<view class="load_more_box">
		<text></text>
		<text></text>
		<text></text>
		<text></text>
		<text></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
			}
		},
		methods:{
			showToggle(isshow) {
				this.isShow = isshow;
			}
		}
		
	}
</script>

<style>
	/* 上拉加载 */
	.load_more_box{
		height: 40px;
		line-height: 40px;
		position:relative;
		text-align: center;
	}
	.load_more_box text{
		width: 5px;
		height: 5px;
		margin: 0 1px;
		display: inline-block;
		vertical-align: middle;
		background: #9b59b6;
		animation: load_more_box 1.5s  infinite ease-in-out;
	}  
	.load_more_box text:nth-child(2){
		animation-delay: .2s;  
	}
	.load_more_box text:nth-child(3){
		animation-delay: .4s;
	}
	.load_more_box text:nth-child(4){
		animation-delay: .6s;
	}
	.load_more_box text:nth-child(5){
		animation-delay: .8s;
	}
	@keyframes load_more_box {
		0% {height:5px;background:#9b59b6;}
		25% {height:30px;background:#0081ff;}
		50% {height:5px;background:#9b59b6;}
		100% {height:5px;background:#9b59b6;}
	}
</style>
