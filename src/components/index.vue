<template>
	<div class="container" style="width: 100%;">
		<div class="row" style="height: 80px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:loginUser="loginUser"></menus>
		</div>
		<div class="row" style="min-height: 800px;">
			<!-- content -->
			<ibody v-bind:loginUser="loginUser"></ibody>
		</div>
		<div class="row">
			<!-- 底部 -->
			<footers></footers>
		</div>
	</div>
</template>

<script>
	import menus from './header'; // * 导入刚才我们创建的 menus组件
	import footers from './footer'; // * 导入刚才我们创建的 footer组件
	import ibody from './ibody'; // * 导入刚才我们创建的 ibody组件
	export default {
		data() {
			return {
				loginUser: {}
			}
		},
		created() {
			this.getRouterData();
		},
		methods: {
			getRouterData() {
				this.loginUser = this.$route.params.user;
			}
		},
		components: { // * 注册menus组件，让其可以在template调用
			menus,
			footers,
			ibody
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
