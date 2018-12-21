<template>
	<div class="containerBody">
		<div class="panel moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title">
					<span>{{movieTitle[0]}}</span>
					<img alt="" src="../assets/img/more.png" class="showMore" v-on:click="showMoreMovies(movieType[1],movieTitle[0])"/>
				</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="actionMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in artMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<h3 class="titleClass">{{movie.title}}</h3>
						<p class="glyphicon glyphicon-eye-open seeImage"><span style="margin-left: 10px;">{{movie.click}}</span></p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
						<p class="glyphicon glyphicon-align-left seeImage"><span style="margin-left: 10px;">{{movie.commentsnumber}}</span></p>
					</div>
				</div>
			</div>
		</div>

		<div class="panel moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title">
					<span>{{movieTitle[1]}}</span>
					<img alt="" src="../assets/img/more.png" class="showMore" v-on:click="showMoreMovies(movieType[0],movieTitle[1])"/>
				</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="artMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in actionMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<p class="titleClass">{{movie.title}}</p>
						<p class="glyphicon glyphicon-eye-open seeImage"><span style="margin-left: 10px;">{{movie.click}}</span></p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
						<p class="glyphicon glyphicon-align-left seeImage"><span style="margin-left: 10px;">{{movie.commentsnumber}}</span></p>
					</div>
				</div>
			</div>
		</div>

		<div class="panel moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title">
					<span>{{movieTitle[2]}}</span>
					<img alt="" src="../assets/img/more.png" class="showMore" v-on:click="showMoreMovies(movieType[2],movieTitle[2])"/>
				</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="funnyMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in funnyMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<p class="titleClass">{{movie.title}}</p>
						<p class="glyphicon glyphicon-eye-open seeImage"><span style="margin-left: 10px;">{{movie.click}}</span></p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
						<p class="glyphicon glyphicon-align-left seeImage"><span style="margin-left: 10px;">{{movie.commentsnumber}}</span></p>
					</div>
				</div>
			</div>
		</div>

		<div class="panel moviepanel">
			<div class="panel-heading">
				<h4 class="panel-title">
					<span>{{movieTitle[3]}}</span>
					<img alt="" src="../assets/img/more.png" class="showMore" v-on:click="showMoreMovies(movieType[3],movieTitle[3])"/>
				</h4>
			</div>
			<div class="panel-body" style="width: 100%; padding-top: 5px;">
				<div id="ThrillerMovie" class="col-md-12 movie_container">
					<div v-for="(movie,index) in ThrillerMovieTmps" :meta="movie" :key="index" v-on:click="getVideos(movie.id)" class="col-md-2 col-xs-12 moviesClass">
						<a>
							<img :src="ftpIP + movie.imgpath" class="imgClass">
						</a>
						<p class="titleClass">{{movie.title}}</p>
						<p class="glyphicon glyphicon-eye-open seeImage"><span style="margin-left: 10px;">{{movie.click}}</span></p>
						<p class="discriptionClass" :title="movie.description">{{movie.description}}</p>
						<p class="glyphicon glyphicon-align-left seeImage"><span style="margin-left: 10px;">{{movie.commentsnumber}}</span></p>
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
				movieTitle:['电影','家庭','电视剧','动画片'],
				movieType:["actionMovieTmps-1", "artMovieTmps-2", "funnyMovieTmps-3", "ThrillerMovieTmps-4"],
			}
		},
		/* props: {
			username: {
				type: String
			},
		}, */ //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做’ item‘ 的数据
		created() {
			var movieType = this.movieType;
			//获取所有视频，后续加排序等。。。。
			for (var i = 0; i < movieType.length; i++) {
				this.getVideoInfo(movieType[i].split("-")[0], movieType[i].split("-")[1]);
			}
		},
		methods: {
			showMoreMovies: function(movieType,title){
				var movie = movieType.split("-")[1];
				console.log(movie, title);
				this.$router.push({
					name: "classifiedMovie",
					params: {
						movie: movie,
						title: title,
					},
				})
			},
			getVideoInfo: function (target, type) {
				var ftpIP = this.ftpIP;
				var server = this.server;
				var that = this;
				$.ajax({
					type: "post",
					url: server + "/video/indexFindVideosByType",
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
						//username: this.username,
						videoId: videoId,
					}
				})
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.panel-title {
		font-size: 18px;
		font-family: "arial black";
	}

	.containerBody {
		min-height: 900px;
		z-index: 1000;
	}

	.row {
		margin-top: 10px;
	}

	.movie_container {
		min-height: 410px;
		padding: 0;
		margin-right: 5px;
	}

	.moviepanel {
		min-height: 420px;
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

	.titleClass {
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
		float: left;
		height: 195px;
		margin-top: 5px;
		padding: 0;
		padding-left: 5px;
		float: left;
	}

	.seeImage {
		height: 20px;
		line-height: 18px;
		width: 25%;
		color: #5C5C5C;
		font-size: 10px;
	}
	
	.showMore{
		float: right;
		font-size: 13px;
		cursor: pointer;
		color: #649ffb;
		width: 18px;
	}
	
	
</style>
