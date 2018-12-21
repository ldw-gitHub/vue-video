<template>
	<nav class="navbar navbar-default navbar-fixed-top col-xs-12 col-xs-offset-0 col-md-12 col-md-offset-0 titleClass" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#video-navbar-collapse">
					<span class="sr-only">切换导航</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="#" class="navbar-brand" v-on:click="relationClick(0)">
					<strong style="font-size: 25px;">沐<span style="font-size: 15px;">沐视频</span></strong>
				</a>
			</div>
			<div class="collapse navbar-collapse" id="video-navbar-collapse">
				<ul class="nav navbar-nav" id="menu_index">
					<li v-for="(relation,index) in relations" :meta="relation" :key="index" v-bind:id="relation.id" v-bind:class="{active:index==nowIndex}"
					    v-on:click="relationClick(index)">
						<a href="#" role="button" aria-haspopup="true" aria-expanded="false">
							{{relation.title}}
						</a>
						<!-- 	<ul class="nav navbar-nav">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
									{{relation.title}}
								</a>
								 <ul v-if="relation.id == 'index'" class="dropdown-menu" role="menu">
									<li v-for="(movie,indexs) in movieType" :meta="movie" :key="indexs"  v-bind:class="{active:indexs==movieIndex}">
										<a v-on:click="loginThisPage(movie,movieTitle[indexs])" style="cursor: pointer;">{{movieTitle[indexs]}}</a>
									</li>
								</ul> 
							</li>
						</ul> -->
					</li>
					<li v-if="username != '' && username != null" class="nav navbar-nav navbar-right" style="margin-left:15px;">
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
					<li v-else class="nav navbar-nav navbar-right" style="margin-left:15px;">
						<ul class="nav navbar-nav navbar-right">
							<li>
								<a href="#" v-on:click="register">
									<span class="glyphicon glyphicon-user"></span> 注册</a>
							</li>
							<li>
								<a href="#" v-on:click="changeTologin">
									<span class="glyphicon glyphicon-log-in"></span> 登录</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>

		</div>
		<div class="container"> 
		   	<form class="navbar-form" role="search">
		   		<div class="form-group col-md-offset-3 col-md-4 col-xs-offset-0 col-xs-8">
		   			<input type="text" class="form-control searchclass" style="width: 100%;" placeholder="输入关键字">
		   		</div>
		   		<button type="submit" class="btn btn-sm" style="background-color: #649ddc;">搜索</button>
		   	</form>
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
					}, {
						title: '我的文件',
						id: 'myfileresource'
					},
					{
						title: '我的视频',
						id: 'myresource'
					},
					{
						title: '上传',
						id: 'upload'
					},
				],
				nowIndex: -1,
				server: this.GLOBAL.server,
				username: "",
				userId: "",
				movieTitle: ['电影', '家庭', '电视剧', '动画片'],
				movieType: ["actionMovieTmps-1", "artMovieTmps-2", "funnyMovieTmps-3", "ThrillerMovieTmps-4"],
				movieIndex: -1,
			}
		},
		created() {
			this.initData();
		},
		/* props: {
			username: {
				type: String
			},
		}, */ //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做’ item‘ 的数据,
		methods: {
			loginThisPage: function (movie, title) {
				movie = movie.split("-")[1];
				console.log(movie, title);
				this.$router.push({
					name: "classifiedMovie",
					params: {
						movie: movie,
						title: title,
					},
				})
			},
			relationClick(id) {
				if (this.relations[id].id != "") {
					//限制需要登入的模块
					if ((this.relations[id].id == 'upload' || this.relations[id].id == 'myresource' || this.relations[id].id ==
							'myfileresource') &&
						(this.username == '' || this.username == null)
					) {
						this.$layer.msg("需要登入访问");
					} else {
						this.$router.push({
							name: this.relations[id].id,
						})
					}
				}
			},
			initData: function () {
			/* 	this.username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : localStorage.getItem(
					'username');
				this.userId = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : localStorage.getItem(
					'userId'); */
					this.username = this.getCookie("username");
					this.userId = this.getCookie("userId");
			},
			logout: function () {
				var routers = this.$router;
				var server = this.server;
				var userId = this.userId;
				var that = this;
				/* var sessionToken = sessionStorage.getItem('sessionToken');
				if (sessionToken == null || sessionToken == "") {
					sessionToken = localStorage.getItem('sessionToken');
				} */
				var sessionToken = this.getCookie("sessionToken");
				if (sessionToken == null || sessionToken == "") {
					routers.push({
						name: "login",
					})
				}
				$.ajax({
					type: 'post',
					url: server + '/video/logout',
					data: {
						'sessionToken': sessionToken,
						'userId': userId,
					},
					success: function (data) {
						that.username = "";
						that.expireLogin();
					}

				});
			},
			register: function () {
				this.$layer.msg("暂不提供注册!");
			},
			changeTologin: function () {
				this.$router.push({
					name: 'login',
				})
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

	.titleClass {
		/* background-color: #649ffb; */
		z-index: 1100;
		color: black;
		font-weight: bolder;
		font-family: "arial black";
		position: fixed;
		left: 0;
		right: 0;
	}

	.searchclass {
		height: 30px;
		font-size: 12px;
	}
</style>
