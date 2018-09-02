<template>
	<div class="container" style="width: 100%;">
		<div class="row col-md-10 col-md-offset-1" style="height: 80px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:username="username"></menus>
		</div>
		<div class="row col-md-10 col-md-offset-1" style="min-height: 800px;">
			<!-- content -->
			<div class="panel moviepanel">
				<div class="panel-heading">
					<h4 class="panel-title">
						<span>{{title}}</span>
					</h4>
				</div>
				<div class="panel-body" style="width: 100%; padding-top: 5px;">
					<div id="artMovie" class="col-md-12 movie_container">
						<div v-for="(movie,index) in myMoviesTmp" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
							<a>
								<img :src="ftpIP + movie.imgpath" class="imgClass">
							</a>
							<p class="movetitleClass">{{movie.title}}</p>
							<p class="glyphicon glyphicon-eye-open seeImage">
								<span style="margin-left: 10px;">{{movie.click}}</span>
							</p>
							<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
							<p class="glyphicon glyphicon-align-left seeImage">
								<span style="margin-left: 10px;">{{movie.commentsnumber}}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
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

	export default {
		data() {
			return {
				ftpIP: this.GLOBAL.ftpIP,
				server: this.GLOBAL.server,
				username: "",
				myMoviesTmp: {},
				movie: "",
				title: "",
			}
		},
		created() {
			this.initData();
			this.getMyownVideos();
		},
		methods: {
			initData() {
				this.username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : localStorage.getItem(
					'username');
				this.movie = $route.params.movie;
				this.title = $route.params.title;
			},
			getMyownVideos: function () {
				let userId = this.userId;
				let server = this.server;
				var that = this;
				let movieType = this.movie;

				$.ajax({
					type: "post",
					url: server + "/video/findVideosByType",
					data: {
						"videoType": movieType
					},
					success: function (result) {
						result = JSON.parse(result);
						if (result.success) {
							that.myMoviesTmp = result.data;
						}
					}
				})
			},
			getVideos: function (videoId) {
				this.$router.push({
					name: 'videoPlay',
					params: {
						//username: this.username,
						videoId: videoId,
					}
				})
			},
		},
		components: { // * 注册menus组件，让其可以在template调用
			menus,
			footers,
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.panel-title {
		font-size: 18px;
		font-family: "arial black";
	}

	.movie_container {
		min-height: 800px;
		padding: 0;
		margin-right: 5px;
	}

	.moviepanel {
		min-height: 810px;
		width: 100%;
	}

	.imgClass {
		cursor: pointer;
		BORDER-TOP-WIDTH: 0px;
		BORDER-LEFT-WIDTH: 0px;
		FILTER: progid:DXImageTransform.Microsoft.RevealTrans (duration=2, transition=23);
		BORDER-BOTTOM-WIDTH: 0px;
		BORDER-RIGHT-WIDTH: 0px;
		width: 100%;
		height: 76%;
	}

	.movetitleClass {
		cursor: pointer;
		height: 18px;
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 18px;
		text-align: left;
		margin-top: 5px;
		font-size: 13px;
		font-weight: bold;
		float: left;
	}

	.discriptionClass {
		height: 18px;
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 18px;
		text-align: left;
		color: #5C5C5C;
		float: left;
	}

	.moviesClass {
		height: 195px;
		margin-top: 5px;
	}

	.seeImage {
		height: 20px;
		line-height: 18px;
		width: 25%;
		color: #5C5C5C;
		font-size: 10px;
	}
</style>
