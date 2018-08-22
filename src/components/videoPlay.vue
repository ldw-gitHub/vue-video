<template>
	<div class="container" style="width: 100%;">
		<div class="row col-md-10 col-md-offset-1" style="height: 80px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:username="username"></menus>
		</div>
		<div class="row col-md-10 col-md-offset-1" style="min-height: 800px;">
			<!-- content -->
			<div class="panel panel-success col-md-9" style="padding: 0;">
				<div class="panel-heading">
					<h4 class="panel-title">{{videoModel.title}}</h4>
				</div>
				<div id="pictruePath" class="panel-body" style="padding-top: 5px;">
					<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
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
				videoModel: {},
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
		},
		methods: {
			getRouterData() {
				this.username = this.$route.params.username;
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
		},
		components: { // * 注册menus组件，让其可以在template调用
			menus,
			footers,
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-js .vjs-big-play-button{
	
}
</style>
