<template>
	<div class="container" style="width: 100%;">
		<div class="row col-md-12 col-md-offset-0" style="height: 150px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:username="username"></menus>
			<div class="col-xs-12 col-xs-offset-0 col-md-12 col-md-offset-0 titleImage"></div>
		</div>
		<div class="row col-md-10 col-md-offset-1" style="min-height: 800px;">
			<!-- content -->
			<ibody v-bind:username="username"></ibody>
		</div>
		<div class="row">
			<!-- 底部 -->
			<footers></footers>
		</div>
	</div>
</template>

<script>
	import menus from './header'; // * 导入menus组件
	import footers from './footer'; // * 导入 footer组件
	import ibody from './ibody'; // * 导入 ibody组件
	export default {
		data() {
			return {
				username: {}
			}
		},
		created() {
			this.getRouterData();
		},
		methods: {
			getRouterData() {
				this.username = this.$route.params.username;
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
	.titleImage {
		margin-top: 51px;
		height: 45px;
		background-image: url(../assets/img/titleImg.jpg);
		background-size: 100% 100%;
		width: 100%;
		position: fixed;
		z-index: 11;
		right: 0;
		left: 0;
	}

</style>
