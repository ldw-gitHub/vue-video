<template>
	<div class="container" style="width: 100%;">
		<div class="row col-md-10 col-md-offset-1" style="height: 80px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:username="username"></menus>
		</div>
		<div class="row col-md-10 col-md-offset-1" style="min-height: 800px;">
			<!-- content -->
			<div class="row col-md-12" style="padding: 0;">
				<div class="panel col-md-9" style="padding: 0;">
					<div class="panel-heading">
						<h4 class="panel-title">{{videoModel.title}}</h4>
					</div>
					<div id="pictruePath" class="panel-body">
						<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
					</div>
				</div>
				<div class="panel visible-md-block visible-lg-block col-md-2 col-md-offset-1" style="padding: 0;">
					<div class="panel-heading">
						<h4 class="panel-title">相关视频</h4>
					</div>
					<div class="panel-body" style="height: 640px;">

					</div>
				</div>
			</div>

			<div class="row col-md-9" style="margin-top: 10px;">
				<div class="form-group">
					<label for="name">留言：</label>
					<textarea class="form-control" id="commentvalue" rows="3" placeholder="<50"></textarea>
				</div>
				<div class="row col-md-offset-11 col-xs-offset-8">
					<button type="button" class="btn btn-default" @click="commentClick">comment</button>
				</div>
			</div>

			<div class="row col-md-9">
				<hr class="hr0" />
			</div>

			<!-- 留言框 -->
			<div v-for="(commentNumber,index) in commentList" :meta="commentNumber" :key="index" class="row col-md-9" style="padding: 10px;padding-bottom:5px;">
				<div class="row">
					<div class="col-md-1 col-xs-2">
						<figure style="width: 50px;height: 50px;">
							<img class="img-circle" src="../assets/img/toux.jpeg" style="width: 40px;" alt="头像" />
						</figure>
					</div>
					<div class="col-md-9 col-xs-10">
						<span class="comments">{{commentNumber.msg}}</span>
					</div>
					<div class="col-md-2">
						<span class="comment_name">{{commentNumber.commentusername}} | {{commentNumber.createtime}}</span>
					</div>
				</div>
				<div class="row">
					<hr class="hr1" />
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
				username: {},
				videoId: {},
				userId: {},
				videoModel: {},
				commentList: {},
				playerOptions: {
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度 
					autoplay: false, //如果true,浏览器准备好时开始回放。 
					muted: false, // 默认情况下将会消除任何音频。 
					loop: false, // 导致视频一结束就重新开始。 
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持） 
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。 
					sources: [{
						type: "",
						src: "", //url地址 
						withCredentials: false,
					}],
					poster: "", //你的封面地址 //
					width: document.documentElement.clientWidth,
					notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。 
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true //全屏按钮 ,
					}
				}
			}
		},
		created() {
			this.getRouterData();
			this.getVideoById();
			this.initComment(this);
		},
		methods: {
			commentClick: function () {
				let commentValues = $("#commentvalue").val();

				if (!sessionStorage.getItem('sessionToken') && !localStorage.getItem('sessionToken')) {
					this.$layer.msg("登入后评论");
					return;
				}
				if (commentValues.length <= 0 || commentValues == "") {
					return;
				}
				if (commentValues.length > 50) {
					this.$layer.msg("评论过长");
					return;
				}


				let videoId = this.videoId;
				let username = this.username;
				let userId = this.userId;
				let server = this.server;
				let that = this;

				$.ajax({
					type: "post",
					url: server + "/video/saveVideoComments",
					data: {
						"videoId": videoId,
						"comments": commentValues,
						"username": username,
						"userId": userId
					},
					success: function (result) {
						if (result.success) {
							that.$options.methods.initComment(that); //刷新评论
							$("#commentvalue").val("");
						}
					}
				})



			},
			initComment: function (that) {
				let videoId = that.videoId;
				let server = that.server;

				$.ajax({
					type: "get",
					url: server + "/video/getVideoCommentsByid",
					data: {
						"videoId": videoId
					},
					success: function (result) {
						result = JSON.parse(result);
						if (result.success) {
							var msgs = result.data;
							let size = msgs.length;
							for (let i = 0; i < size; i++) {
								msgs[i].createtime = that.$options.methods.timestamp2Time(msgs[i].createtime + '', '-');
							}
							that.commentList = msgs;
						}
					}
				})

			},
			getRouterData() {
				this.username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : localStorage.getItem(
					'username');
				this.userId = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : localStorage.getItem(
					'userId');
				this.videoId = this.$route.params.videoId;
			},
			getVideoById: function () {
				let videoid = this.videoId;
				let server = this.server;
				let ftpip = this.ftpIP;
				var that = this;

				$.ajax({
					type: "get",
					url: server + "/video/findVideosById",
					data: {
						"videoId": videoid
					},
					success: function (result) {
						result = JSON.parse(result);
						if (result.success) {
							var tmp = result.video;
							console.log(tmp);
							that.videoModel = tmp;
							that.playerOptions.poster = ftpip + tmp.imgpath;
							that.playerOptions.sources[0].src = ftpip + tmp.videopath;
							console.log(ftpip + tmp.videopath);
							console.log(that.playerOptions.sources[0].src);
						}
					}
				})
			},
			timestamp2Time: function (timestamp, separator) {
				var result = "";
				if (timestamp) {
					var reg = new RegExp(/\D/, "g"); //提取数字字符串
					var timestamp_str = timestamp.replace(reg, "");
					var d = new Date();
					d.setTime(timestamp_str);
					var year = d.getFullYear();
					var month = d.getMonth() + 1;
					var day = d.getDate();

					var hour = d.getHours();
					var miniter = d.getMinutes();
					if (miniter < 10) {
						miniter = "0" + miniter;
					}
					var seconds = d.getSeconds();
					if (seconds < 10) {
						seconds = "0" + seconds;
					}

					if (month < 10) {
						month = "0" + month;
					}
					if (day < 10) {
						day = "0" + day;
					}
					result = year + separator + month + separator + day + " " + hour + ":" + miniter + ":" + seconds;
				}
				return result;
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
	.video-js .vjs-big-play-button {}

	.panel-title {
		font-size: 18px;
		font-family: "arial black";
	}

	.hr0 {
		height: 1px;
		border: none;
		border-top: 1px solid #CCCCCC;
	}

	.hr1 {
		height: 1px;
		border: none;
		border-top: 1px dashed #CCCCCC;
	}

	.comments {
		height: 50px;
		line-height: 50px;
		text-overflow: inherit;
		font-family: "arial rounded mt bold";
	}

	.comment_name {
		height: 50px;
		line-height: 50px;
		text-overflow: inherit;
		font-family: "arial rounded mt bold";
		font-size: 12px;
		color: #B9BBBE;
	}
</style>
