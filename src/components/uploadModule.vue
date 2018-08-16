<template>
	<div class="container" style="width: 100%;height: 100%;">
		<div class="row col-md-10 col-md-offset-1" style="height: 75px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:username="username"></menus>
		</div>
		<div class="row col-md-10 col-md-offset-1" style="min-height: 818px;">
			<!-- content -->
			<div class="containerBody">
				<div class="container">
					<form id="uploadFileForm" name="uploadFileForm" method="post">
						<div class="form-group row">
							<label for="videoType" class="col-lg-2 control-label">视频类型：</label>
							<div class="col-lg-6">
								<select id="videoType" name="videoType" class="selectpicker" data-live-search="false">
									<option value="1">动作</option>
									<option value="2">文艺</option>
									<option value="3">搞笑</option>
									<option value="4">惊悚</option>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-lg-2 control-label" for="inputImgfile">图片：</label>
							<div class="col-lg-6">
								<input id="uploadImgPath" type="hidden" name="uploadImgPath" />
								<input type="file" id="inputImgfile" name="imagefile" />
								<div>
									<img alt="" src="" class="imgs">
								</div>
								<div id="uploadFile" style="float:left;margin-left:10px;"></div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-lg-2 control-label" for="inputVideofile">视频：</label>
							<div class="col-lg-6">
								<input id="uploadVideoPath" type="hidden" name="uploadVideoPath" />
								<input type="file" id="inputVideofile" name="videofile" />
								<div id="uploadVideoFile" style="float:left;margin-left:10px;"></div>
							</div>
						</div>
						<div class="form-group row">
							<label for="description" class="col-lg-2 control-label">内容说明：</label>
							<div class="col-lg-6">
								<textarea type="text" class="form-control" id="description" name="description" placeholder="介绍..."></textarea>
							</div>
						</div>
						<div class="form-group row">
							<label for="filename" class="col-lg-2 control-label">文件名称：</label>
							<div class="col-lg-6">
								<input type="text" class="form-control" id="filename" name="filename" placeholder="请输入名字">
							</div>
						</div>
						<div class="form-group row">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="button" id="submitUploadFile" v-on:click="submitUploadFile" class="btn btn-default">提交</button>
							</div>
						</div>
					</form>
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
	import menus from './header'; // * 导入 menus组件
	import footers from './footer'; // * 导入 footer组件
	export default {
		data() {
			return {
				username: {},
				ftpIP: this.GLOBAL.ftpIP,
				server: this.GLOBAL.server,
			}
		},
		created() {
			this.getRouterData();
			this.init_upload();
		},
		methods: {
			getRouterData() {
				this.username = this.$route.params.username;
			},
			init_upload: function () {
				var server = this.server;
				var layer = this.$layer;
				console.log(server);
				new AjaxUpload("#inputImgfile", {
					action: server + "/uploadFile",
					name: "uploadfile",
					onSubmit: function (file, extension) {
						attachNameImage = file.substring(file.lastIndexOf("\\") + 1, file.length);
						console.log(attachNameImage);
						var re = new RegExp(".(gif|jpg|png|bmp|jpeg)$", "i");
						if (!re.test(attachNameImage)) {
							layer.alert("文件类型不正确,请选择图片");
							return false;
						} else {
							this.setData({
								'attachName': attachNameImage,
								'tag': 'img'
							});
						}
					},
					onComplete: function (file, response) {
						var k = "";
						if (response != "") {
							var i = response.indexOf("{");
							var e = response.indexOf("}");
							k = response.substring(i, e + 1);
						}
						var result = eval("(" + k + ")");
						if (result.success) {
							$("#uploadFile").html(
								`<span style="font-size:12px;color:#000000">${attachNameImage} 
								<a href="javascript:void(-1);" v-on:click="deleteAttach(${img});" style="margin-left:5px;">删除</a></span>`
							);
							$("#uploadImgPath").val(result.uploadFileName);
						} else {
							layer.alert("上传缩略图失败！");
						}
					}
				})

				new AjaxUpload("#inputVideofile", {
					action: server + "/uploadFile",
					name: "uploadfile",
					onSubmit: function (file, extension) {
						attachName = file.substring(file.lastIndexOf("\\") + 1, file.length);
						var re = new RegExp(".(avi|mp4|wmv|flv|rm|rmvb|asf|mov|mpg|dvr|divx|ts)$", "i");
						if (!re.test(attachName)) {
							layer.alert("文件类型不正确,请选择视频");
							return false;
						} else {
							this.setData({
								'attachName': attachName,
								'tag': 'video'
							});
						}
					},
					onComplete: function (file, response) {
						var k = "";
						if (response != "") {
							var i = response.indexOf("{");
							var e = response.indexOf("}");
							k = response.substring(i, e + 1);
						}
						var result = eval("(" + k + ")");
						if (result.success) {
							$("#uploadVideoFile").html(
								`<span style="font-size:12px;color:#000000">${attachName} 
								<a href="javascript:void(-1);" v-on:click="deleteAttach(${video});" style="margin-left:5px;">删除</a></span>`
							);
							$("#uploadVideoPath").val(result.uploadFileName);
						} else {
							layer.alert("上传视频失败!");
						}
					}
				})

				console.log(server);

			},
			deleteAttach: function (type) {
				var server = this.server;
				var layer = this.$layer;
				console.log(server);
				var attachName = type == "img" ? $("#uploadImgPath").val() : $("#uploadVideoPath").val();
				var tag = type;
				$.ajax({
					type: 'post',
					url: server + '/deleteFile',
					data: {
						'attachName': attachName,
						'tag': tag
					},
					success: function (data) {
						data = JSON.parse(data);
						if (data.success) {
							if (type == "img") {
								$("#uploadFile").empty();
								$("#uploadImgPath").val('');
							} else {
								$("#uploadVideoFile").empty();
								$("#uploadVideoPath").val('');
							}

						} else {
							layer.msg(data.msg);
						}
					}

				});

			},
			submitUploadFile: function () {
				var server = this.server;
				var data = $("#uploadFileForm").serializeArray();
				var fromData = {};
				$.each(data, function () {
					fromData[this.name] = this.value;
				});
				console.log(fromData);
				if (fromData.uploadImgPath == "") {
					this.$layer.alert("图片不能为空");
					return;
				} else if (fromData.uploadVideoPath == "") {
					this.$layer.alert("视频不能为空");
					return;
				}
				//fromData.videoType = $("#videoType").find("option:selected").val();

				var datas = JSON.parse(JSON.stringify(fromData));
				console.log(datas);
				var layer = this.$layer;
				$.ajax({
					type: "post",
					url: server + "/saveMedia",
					data: datas,
					contentType: "application/x-www-form-urlencoded",
					//contentType: "application/json;charset=utf-8",
					success: function (data) {
						if (data.success) {
							parent.location.reload();
							$("#description").val("");
							$("#filename").val("");
						} else {
							layer.msg(data.msg);
						}
					}
				})


			}
		},
		components: { // * 注册menus组件，让其可以在template调用
			menus,
			footers
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.containerBody {
		min-height: 800px;
		background: rgba(255, 255, 255, 0.9);
		z-index: 1000;
	}
</style>
