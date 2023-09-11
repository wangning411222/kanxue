<template>
	<view class='thumbsBox'>
		<text class="cuIcon-appreciatefill"></text>
		123{{ isTop }}
	</view>
	</view>
</template>

<script>
	export default {
		name: 'thumbs',
		props: {
			  isTop:{
				  type:Number,
				  default:1
			  }
		},
		data() {
			return {
				
			};
		},
		
		methods: {
			
		},
		computed: {
			
		}

	}
</script>

<style lang="scss">
	
</style>
