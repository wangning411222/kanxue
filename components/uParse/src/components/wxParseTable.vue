<template>
	<rich-text :nodes="nodes" :class="node.classStr" ></rich-text>
</template>
<script>
export default {
	name: 'wxParseTable',
	props: {
		node: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			nodes:[]
		};
	},
	mounted() {
		this.nodes=this.loadNode([this.node]);
	},
	methods: {
		loadNode(node) {
			let obj = [];
			for (let children of node) {
				if (children.node=='element') {
					let t = {
						name:children.tag,
						attrs: {
							class: children.classStr,
							// style: children.styleStr,
						},
						children: children.nodes?this.loadNode(children.nodes):[]
					}
					
					obj.push(t)
				} else if(children.node=='text'){
					obj.push({
						type: 'text',
						text: children.text
					})
				}
			}
			return obj
		}
	}
};
</script>
<style>
	
</style>