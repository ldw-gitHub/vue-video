<template>
	<nav class="navbar navbar-default navbar-fixed-top col-xs-12 col-xs-offset-0 col-md-10 col-md-offset-1" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#video-navbar-collapse">
					<span class="sr-only">切换导航</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="#" class="navbar-brand">
					<strong>VideoHome</strong>
				</a>
			</div>
			<div class="collapse navbar-collapse" id="video-navbar-collapse">
				<ul class="nav navbar-nav" id="menu_index">
					<li v-for="(relation,index) in relations" :meta="relation" :key="index" v-bind:id="relation.id" v-bind:class="{active:index==nowIndex}"
					    v-on:click="relationClick(index)">
						<a>{{relation.title}}</a>
					</li>
					<li class="nav navbar-nav navbar-right" style="margin-left:15px;">
						<ul class="nav navbar-nav">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
									{{username}}
									<i class="glyphicon glyphicon-user"></i>
								</a>
								<ul class="dropdown-menu" role="menu">
									<li>
										<a href="#">个人信息</a>
									</li>
									<li class="divider"></li>
									<li>
										<a v-on:click="logout" style="cursor: pointer;">退出</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>


		</div>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				relations: [{
						title: '首页',
						id: 'index'
					},
					{
						title: '我的资源',
						id: ''
					},
					{
						title: '上传',
						id: 'upload'
					},
				],
				nowIndex: -1,
				server: this.GLOBAL.server,
			}
		},
		created() {
			this.initData();
		},
		props: {
			username: {
				type: String
			},
		}, //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做’ item‘ 的数据,
		methods: {
			relationClick(id) {
				if (this.relations[id].id != "") {
					this.$router.push({
						name: this.relations[id].id,
					})
				}
			},
			initData: function () {

			},
			logout: function () {
				var routers = this.$router;
				var server = this.server;
				var sessionToken = sessionStorage.getItem('sessionToken');
				if(sessionToken == null || sessionToken == ""){
					sessionToken = localStorage.getItem('sessionToken');
				}
				if(sessionToken == null || sessionToken == ""){
					routers.push({
						name: "login",
					})
				}
				$.ajax({
					type: 'post',
					url: server + '/video/logout',
					data: {
						'sessionToken': sessionToken,
					},
					success: function (data) {
						sessionStorage.removeItem('sessionToken');
						localStorage.removeItem("sessionToken");
						routers.push({
							name: "login",
						})
					}

				});
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#menu_index {
		cursor: pointer;
		width: 80%;
	}
</style>
