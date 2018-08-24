<template>
	<div class="containerBody">
		<div class="panel panel-info moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title glyphicon glyphicon-flash">
					<span> 动作</span>
				</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="actionMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in actionMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<p class="titleClass">{{movie.title}}</p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="panel panel-primary moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title">文艺</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="artMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in artMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<p class="titleClass">{{movie.title}}</p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="panel panel-success moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title">搞笑</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="funnyMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in funnyMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<p class="titleClass">{{movie.title}}</p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="panel panel-warning moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title">惊悚</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="ThrillerMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in ThrillerMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<p class="titleClass">{{movie.title}}</p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				ftpIP: this.GLOBAL.ftpIP,
				server: this.GLOBAL.server,
				actionMovieTmps: [],
				artMovieTmps: {},
				funnyMovieTmps: {},
				ThrillerMovieTmps: {},
			}
		},
		props: {
			username: {
				type: String
			},
		}, //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做’ item‘ 的数据
		created() {
			var movieType = ["actionMovieTmps-1", "artMovieTmps-2", "funnyMovieTmps-3", "ThrillerMovieTmps-4"];
			//获取所有视频，后续加排序等。。。。
			for (var i = 0; i < movieType.length; i++) {
				this.getVideoInfo(movieType[i].split("-")[0], movieType[i].split("-")[1]);
			}
		},
		methods: {
			getVideoInfo: function (target, type) {
				var ftpIP = this.ftpIP;
				var server = this.server;
				var that = this;
				$.ajax({
					type: "post",
					url: server + "/video/findVideosByType",
					data: {
						"videoType": type
					},
					success: function (result) {
						result = JSON.parse(result);
						if (result.success) {
							var tmp = result.data;
							if (target == "actionMovieTmps") {
								that.actionMovieTmps = tmp;
							} else if (target == "artMovieTmps") {
								that.artMovieTmps = tmp;
							} else if (target == "funnyMovieTmps") {
								that.funnyMovieTmps = tmp;
							} else if (target == "ThrillerMovieTmps") {
								that.ThrillerMovieTmps = tmp;
							}
						}
					}
				})


			},
			getVideos: function (videoId) {
				this.$router.push({
					name: 'videoPlay',
					params: {
						username: this.username,
						videoId: videoId,
					}
				})
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.containerBody {
		min-height: 800px;
		z-index: 1000;
	}

	.row {
		margin-top: 10px;
	}

	.movie_container {
		min-height: 350px;
		margin-top: 5px;
	}

	.moviepanel {
		min-height: 370px;
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
		height: 72%;
	}

	.titleClass {
		cursor: pointer;
		height: 18px;
		width: 95%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 18px;
		text-align: left;
		margin-top: 5px;
	}

	.discriptionClass {
		height: 18px;
		width: 95%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 18px;
		text-align: left;
	}

	.moviesClass {
		float: left;
		height: 170px;
		margin-top: 10px;
	}
</style>
