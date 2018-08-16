<template>
		<div class="containerBody">
			<div class="panel panel-info moviepanel">
				<div class="panel-heading">
					<h4 class="panel-title">动作</h4>
				</div>
				<div class="panel-body" style="width: 100%; padding-top: 5px;">
					<div id="actionMovie" class="col-md-12 movie_container"></div>
				</div>
			</div>

			<div class="panel panel-primary moviepanel">
				<div class="panel-heading">
					<h4 class="panel-title">文艺</h4>
				</div>
				<div class="panel-body" style="width: 100%; padding-top: 5px;">
					<div id="artMovie" class="col-md-12 movie_container"></div>
				</div>
			</div>

			<div class="panel panel-success moviepanel">
				<div class="panel-heading">
					<h4 class="panel-title">搞笑</h4>
				</div>
				<div class="panel-body" style="width: 100%; padding-top: 5px;">
					<div id="funnyMovie" class="col-md-12 movie_container"></div>
				</div>
			</div>

			<div class="panel panel-warning moviepanel">
				<div class="panel-heading">
					<h4 class="panel-title">惊悚</h4>
				</div>
				<div class="panel-body" style="width: 100%; padding-top: 5px;">
					<div id="ThrillerMovie" class="col-md-12 movie_container"></div>
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
			}
		},
		props: {
			userid: {
				type: String
			},
		}, //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做’ item‘ 的数据
		created() {

			var movieType = ["actionMovie-1", "artMovie-2", "funnyMovie-3", "ThrillerMovie-4"];

			//获取所有视频，后续加排序等。。。。
			for (var i = 0; i < movieType.length; i++) {
				this.getVideoInfo(movieType[i].split("-")[0], movieType[i].split("-")[1]);
			}
		},
		methods: {
			getVideoInfo: function (target, type) {
				var ftpIP = this.ftpIP;
				var server = this.server;
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
							var info = "";
							var length = tmp.length > 7 ? 7 : tmp.length;
							for (var i = 0; i < length; i++) {
								if (i == 0) {
									info +=
										`<div id="videos_${i}" onclick="getVideos(${tmp[i].id})" style="float:left;width:35%;height:75%;">
											         <a>
															 <img src="http://${ftpIP}/${tmp[i].imgpath}" style="cursor: pointer;BORDER-TOP-WIDTH: 0px; BORDER-LEFT-WIDTH: 0px; 
													 FILTER: progid:DXImageTransform.Microsoft.RevealTrans (duration=2,transition=23); BORDER-BOTTOM-WIDTH: 0px; 
													 BORDER-RIGHT-WIDTH: 0px;width:95%;height:100%;">
													     </a>
											         <p style="cursor: pointer;height:18;width:115px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${tmp[i].title}</p>
											         <p style="height:18;width:70%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" 
													 title=${tmp[i].description}>${tmp[i].description}</p></div>`;
								} else {
									info +=
										`<div id="videos_${i}" onclick="getVideos(${tmp[i].id})" style="float:left;width:16%;height:45%">
													<a><img src="http://${ftpIP}/${tmp[i].imgpath}" style="cursor: pointer;BORDER-TOP-WIDTH: 0px; BORDER-LEFT-WIDTH: 0px; 
													FILTER: progid:DXImageTransform.Microsoft.RevealTrans (duration=2,transition=23); BORDER-BOTTOM-WIDTH: 0px; 
													BORDER-RIGHT-WIDTH: 0px;width:90%;height:70%;"></a>
													<p style="cursor: pointer;height:18;width:115px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${tmp[i].title}</p>
													<p style="height:18;width:115px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" 
													title=${tmp[i].description}>${tmp[i].description}</p></div>`;
								}
							}

							$("#" + target).html(info);
						}
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
		height: 345px;
	}

	.moviepanel {
		height: 365px;
		width: 96%;
		margin-left: 2%;
	}
</style>
